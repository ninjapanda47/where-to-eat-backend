const express = require('express')
const app = express()
const yelp = require('yelp-fusion');
const port = process.env.PORT || 3000
require('dotenv').config();

const client = yelp.client(process.env.API_KEY);

const getRandom = max => {
  return Math.floor(Math.random() * Math.floor(max));
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/getResults/:restaurant/:location/:limit/:radius/:price/:open_now', (req,res) => client.search(req.params).then(response => {
    let x = getRandom(50)
    const result = response.jsonBody.businesses[x];
    const prettyJson = JSON.stringify(result, null, 4);
    res.send(prettyJson)
  }).catch(e => {
    console.log(e);
  }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))