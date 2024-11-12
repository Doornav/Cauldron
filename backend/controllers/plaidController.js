const jwt = require('jsonwebtoken');
const plaidClient = require('../config/plaidClient');
const User = require('../models/userModel');

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

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newAccessToken = {
      accessToken: accessToken,
      accounts: [], // This will hold individual accounts from accountsGet if you add them later
      linkedAt: new Date(),
    };

    user.accessTokens.push(newAccessToken);


    await user.save();


  } catch (error) {
    console.error('Error exchanging public token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to exchange public token' });
  }
};


const getAccountDetails = async (req, res) => {
  try {
      // Step 1: Decode JWT from the Authorization header
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      if (!token || token.trim() === '' || token === 'null') {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }
    

      // Decode the JWT to get the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      // Step 2: Find the user in the database using the userId
      const user = await User.findById(userId);
      if (!user || !user.accessTokens || user.accessTokens.length === 0) {
          return res.status(404).json({ error: 'No linked accounts found for this user' });
      }

      // Step 3: Retrieve account details for each access token
      const accountDetails = [];
      for (const linkedAccount of user.accessTokens) {
          const accessToken = linkedAccount.accessToken;
         

          // Use Plaid's accountsGet to get account details for each access token
          const response = await plaidClient.accountsGet({ access_token: accessToken });
          const accounts = response.data.accounts.map(account => ({
            accountId: account.account_id,
            institutionName: account.name,
            accountType: account.subtype,
            balance: account.balances.current,
          }));

        accountDetails.push(...accounts);
      }

      // Step 4: Send the aggregated account details as the response
      res.status(200).json({ accounts: accountDetails });
  } catch (error) {
      console.error('Error fetching account details:', error);
      res.status(500).json({ error: 'Failed to retrieve account details' });
  }
};





module.exports = {
    handleCreateLinkToken,
    handleExchangePublicToken,
    getAccountDetails
};
