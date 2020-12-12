var express = require('express')
var app = express()
let nodeServiceString = `${process.env.NODE_3RD_PARTY_APP_SERVICE_HOST}:${process.env.NODE_3RD_PARTY_APP_SERVICE_PORT}`
const axios = require('axios')

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.json({"message" : "Hello GET / route"});
})

// This responds a POST request for the homepage
app.get('/service', function (req, res) {
   console.log("Got a POST request for the homepage");
   axios.get(nodeServiceString).then((res) => {
     res.json(res);
   }).catch(err => {
     res.json(err)
   })
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8080, function () {
   console.log("Example app listening at port 8080")
})
