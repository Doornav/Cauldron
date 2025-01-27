const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    changeName,
    changePassword
} = require('../controllers/authController');
const {
    updateBalancesOnLogin
} = require('../controllers/plaidController');
const { getAccounts } = require("../controllers/plaidController");
const { verifyToken } = require("../controllers/authController");


router.post('/register', createUser);

router.post('/login', loginUser, getAccounts, updateBalancesOnLogin);

router.post('/update-name', verifyToken, changeName);

router.post('/update-pass', verifyToken, changePassword);

module.exports = router;