var express = require('express')
var app = express()
const redditApi = `https://reddit.com/r/`
const axios = require('axios')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/*
 * @api [get] /
 * description: Greeting from server
 * responses:
 *   200:
 *     description: Greeting message.
 */
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.json({ "message": "Hello GET / route" });
})

/*
 * @api [get] /reddit/:subreddit
 * description: Call specific subreddit and return data from it
 * responses:
 *   200:
 *     description: Data from subreddit.
 */
app.get('/reddit/:subreddit', async function (req, res) {
  let response
  try {
    response = await axios.get(`${redditApi}${req.params.subreddit}.json`)
  } catch (e) {
    res.json(e)
  }
  console.log(response.data.data.children.length)
  res.status(200).send(response.data.data.children)
})

app.get("/api/docs", (req, res) => {

})

app.listen(8080, function () {
  console.log("Example app listening at port 8080")
})
