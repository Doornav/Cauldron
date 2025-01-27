const express = require('express');
const router = express.Router();

const {
    verifyToken
} = require('../controllers/authController');

const {
handleCreateLinkToken,
handleExchangePublicToken,
getAccounts,

} = require('../controllers/plaidController');

router.post('/create_link_token', handleCreateLinkToken);

router.post('/exchange_public_token', handleExchangePublicToken);

router.get('/accounts', verifyToken, getAccounts);
module.exports = router;