const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const plaidRoutes = require('./routes/plaidRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/plaid', plaidRoutes);


module.exports = app;