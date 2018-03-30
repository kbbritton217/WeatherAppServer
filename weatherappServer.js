// =========================================================================
//      SETUP
// =========================================================================
require('dotenv').config();
var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var request        = require('request');
var http = require('http').Server(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


//this is a comment

// =========================================================================
//      ROUTES
// =========================================================================

app.post("/weather", function(req, res){
console.log('req.body is:')
console.log(req.body)

    var lat = req.body.lat;
    var long = req.body.lon;
    
    darkUrl = 'https://api.darksky.net/' + 'forecast/' + '3895576db6a13a93ab8cf16f4c5c540e' + '/' + lat + ',' + long + '?exclude=currently,minutely,flags,alerts';


    // First get the authorization token
    // var myJSONLoginInfo = {
    //   'user': process.env.USER,
    //   'password': process.env.PASSWORD,
    //   'layout': process.env.LAYOUT
    // };
    request({
      url: darkUrl,
      method: "GET",
      json: true,
      // body: myJSONLoginInfo
    }, function (error, response, responseBody) {
      if (error) {
        console.log('Error received while trying to obtain token:');
        console.log(error);
        res.send(false);
      } else {

        console.log('responseBody is:')
        console.log(responseBody)

        res.send(responseBody)




      }
      // End of else (there is no tokenError)
    });



});





// =========================================================================
//      START SERVER
// =========================================================================

http.listen(process.env.PORT || 3000, function(){
    console.log(`The nodeSignatures server has started on port 3000!`);
});