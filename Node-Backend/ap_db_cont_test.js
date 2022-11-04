const mongoose = require('mongoose');
const dbConfig = require('./config/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(
    dbConfig.getDBConnectionUrl(),
    { useNewUrlParser: true },
    function (error, database) {
      if (error) {
        console.log('Oops.. Ashish! You could not connected to the database.', error);
      } else {
        console.log('Voila... Ashish! You are connected to the database successfully.');
      }
    }
);



