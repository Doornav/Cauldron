export const linkTokenRequest = async (token: string) => {
    try {
        const response = await fetch('http://localhost:4000/plaid/create_link_token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: 'dummyuid'}),
        });
        const data = await response.json();
        const linkToken = data.linkTokenResponse;
        return linkToken;
      } catch (error) {
        console.error('Error creating link token:', error);
      }

};


export const exchangeLinkTokenRequest = async (data: any, token: string) => {
    try {
        const response = await fetch('http://localhost:4000/plaid/exchange_public_token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const access_token = await response.json();
        
        return access_token;
    } catch (error) {
        console.error('Error exchanging public token:', error);
    }
};


export const getAccounts = async (token: string) => {
  try {
      const response = await fetch('http://localhost:4000/plaid/get_account_details', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      const accountDetils = await response.json();
    
      
      return accountDetils;
  } catch (error) {
      console.error('Error getting account details:', error);
  }
};