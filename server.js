//  require express
const express = require('express');
// require connection
const db = require('./config/connection');
// require routes
const routes = require('./routes');

// adding port
const PORT = process.env.PORT || 3001;
const app = express();

//  adding use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// listening
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});