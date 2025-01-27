const jwt = require('jsonwebtoken');
const plaidClient = require('../config/plaidClient');
const User = require('../models/userModel');

const Account = require('../models/accountModel');

const handleCreateLinkToken = async (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || token.trim() === '' || token === 'null') {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    _id = decoded.userId;
    
    if (!_id) {
      res.status(400).json({ error: 'UID is required' });
    }

    const linkTokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: _id,
      },
      client_name: 'Cauldron',
      language: 'en',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      redirect_uri: 'https://cdn-testing.plaid.com/link/v2/stable/sandbox-oauth-a2a-react-native-redirect.html',
    });

    res.json({
      linkTokenResponse: linkTokenResponse.data.link_token,
      _id: _id
    })
    
  } catch (error) {
    console.error('Error creating Link token:', error);
    res.status(500).send('Error creating Link token');
  }
};

const handleExchangePublicToken = async (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const { public_token } = req.body;

  if (!token || token.trim() === '' || token === 'null') {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  if (!public_token) {
    return res.status(400).json({ error: 'Missing required field: public_token' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    _id = decoded.userId;
    
    if (!_id) {
      res.status(400).json({ error: 'UID is required' });
    }

    // Exchange the public token for an access token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = response.data.access_token;
    console.log('Exchange Token Added:', accessToken);

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accounts = accountsResponse.data.accounts;
    const institution_id = accountsResponse.data.item.institution_id;

    

      // Fetch institution details from Plaid
      const institutionResponse = await plaidClient.institutionsGetById({
        institution_id: institution_id,
        country_codes: ["US"],
        options: {
          include_optional_metadata: true,
        },
      });

      const institutionData = institutionResponse.data.institution;



        // Step 3: Fetch transactions and holdings for each account
        const accountsWithDetails = await Promise.all(
          accounts.map(async (account) => {
            // Fetch transactions
            const transactionsResponse = await plaidClient.transactionsGet({
              access_token: accessToken,
              start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
              end_date: new Date().toISOString().split('T')[0],
              options: { account_ids: [account.account_id] },
            });
    
            const transactions = transactionsResponse.data.transactions.map((transaction) => ({
              transactionId: transaction.transaction_id,
              name: transaction.name,
              amount: transaction.amount,
              date: transaction.date,
              category: transaction.category,
            }));
    
            // Fetch holdings (only for investment accounts)
            let holdings = [];
            if (account.type === 'investment') {
              const holdingsResponse = await plaidClient.investmentsHoldingsGet({
                access_token: accessToken,
              });
    
              holdings = holdingsResponse.data.holdings.map((holding) => {
                const security = holdingsResponse.data.securities.find(
                  (sec) => sec.security_id === holding.security_id
                );
    
                return {
                  securityId: holding.security_id,
                  symbol: security?.ticker_symbol,
                  name: security?.name,
                  quantity: holding.quantity,
                  currentPrice: security?.close_price,
                  marketValue: holding.quantity * (security?.close_price || 0),
                  isoCurrencyCode: security?.iso_currency_code,
                };
              });
            }

            // Return the account details with transactions and holdings
        return {
          accountId: account.account_id,
          accountName: account.name,
          accountType: account.subtype,
          balance: account.balances.current,
          transactions,
          holdings,
        };
      })
    );

     // Step 4: Save the access token and accounts with details to the user's document
     await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          accessTokens: {
            token: accessToken,
            institution: {
              institution_id: institutionData.institution_id,
              name: institutionData.name,
              logo: institutionData.logo,
              url: institutionData.url,
              primary_color: institutionData.primary_color,
            },
            accounts: accountsWithDetails,
          },
        },
      },
      { new: true } // Return the updated document
    );

  } catch (error) {
    console.error('Error exchanging public token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to exchange public token' });
  }
};


// Controller to handle fetching account data
const getAccounts = async (req, res, next) => {
  try {

    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if(!user.accessTokens){
      res.status(200).message("no tokens associated with this account");
    }

    // Map accessTokens to include institution and its accounts
    const accountsData = user.accessTokens.map((token) => {
      return {
        institution: token.institution || null, // Institution info from the access token
        accounts: token.accounts || [], // All accounts under this access token
      };
    });

    req.accountsData = accountsData;
    next();
  } catch (error) {
    console.error('Error fetching account information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

};


const updateBalancesOnLogin = async (req, res, next) => {
  try {
    const { user, token, accountsData } = req;

    if (!user || !user.accessTokens || user.accessTokens.length === 0) {
      return next(); // Skip if no access tokens
    }

    let isModified = false; // Track if any updates were made

    for (const accessToken of user.accessTokens) {
      // Fetch updated balances from Plaid
      const balances = await fetchUpdatedBalances(accessToken.token);

      // Iterate over the balances and update the corresponding accounts
      balances.forEach(({ accountId, currentBalance }) => {
        const accountToUpdate = accessToken.accounts.find(
          (account) => account.accountId === accountId
        );

        if (accountToUpdate) {
          // Append the previous balance to the balance history
          const now = new Date();
          const lastEntry = accountToUpdate.balanceHistory?.[accountToUpdate.balanceHistory.length - 1];
        
          if (!lastEntry || lastEntry.balance !== accountToUpdate.balance) {
            accountToUpdate.balanceHistory.push({
              balance: accountToUpdate.balance, // Previous balance
              timestamp: now, // Current timestamp
            });
          }
        
          // Update the account's balance
          if (accountToUpdate.balance !== currentBalance) {
            accountToUpdate.balance = currentBalance;
            isModified = true; // Mark document as modified
          }
        } else {
          console.warn(`Account with ID ${accountId} not found for user.`);
        }
        
      });
    }

    // Save changes to the database only if modifications were made
    if (isModified) {
      await user.save();
    }



     // Pass updated user data to the next middleware or response
     res.json({
      message: 'Login successful',
      token,
      accountsData,
      user: { id: user._id, name: user.name, email: user.email, lastNameChange: user.lastNameChange },
    });
  } catch (error) {
    console.error('Error in updateBalancesOnLogin middleware:', error.message);
    res.status(500).json({ error: 'Failed to update balances during login' });
  }
};


const fetchUpdatedBalances = async (accessToken) => {
  try {
    const response = await plaidClient.accountsBalanceGet({
      access_token: accessToken,
    });

    // Map the Plaid accounts response to the desired format
    const balances = response.data.accounts.map((account) => ({
      accountId: account.account_id,
      availableBalance: account.balances.available || null, // Default to null if unavailable
      currentBalance: account.balances.current || 0, // Default to 0 if unavailable
    }));

    return balances;
  } catch (error) {
    console.error('Error fetching balances:', error.response?.data || error.message);
    throw new Error('Failed to fetch balances');
  }
};


// Append balance history to an account
const addBalanceHistory = async (account, newBalance) => {
  const lastEntry = account.balanceHistory[account.balanceHistory.length - 1];

  // Avoid duplicates: Add only if balance changes or a day has passed
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const now = new Date();

  if (
    !lastEntry || // No previous entry
    lastEntry.balance !== newBalance || // Balance has changed
    now - new Date(lastEntry.timestamp) > oneDayInMs // More than a day since the last entry
  ) {
    account.balanceHistory.push({
      balance: newBalance,
      timestamp: now,
    });
    await account.save();
  }
};

module.exports = updateBalancesOnLogin;









module.exports = {
    handleCreateLinkToken,
    handleExchangePublicToken,
    getAccounts,
    updateBalancesOnLogin
};
