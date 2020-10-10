const express = require('express');
const app = express();
const dotenv = require('dotenv');
const opencage = require('opencage-api-client');
dotenv.config();
const port = process.env.PORT || 3001;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/geocode', (req, res) => {
    opencage.geocode({q: `${req.query.lat}, ${req.query.long}`, language: 'native'}).then(data => {
        res.send(data)
      }).catch(error => {
        res.send(error)
        console.log('error', error.message);
      });
});