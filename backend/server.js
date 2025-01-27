// server.js
require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;



mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
    console.log('connected to mongodb successfully!');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.log(error)
  })








