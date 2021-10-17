//jshiunt esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/signup.html");
 })

 app.post("/", function(req,res) {
    // console.log(req.body.num1);
    const firstName =req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members : [
            {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/c173ff4eee";

    const options = {
        method: "POST",
        auth: "lissa:1285d8dc985d5d6ce553dfedafa7d023-us5"
    }

    const request = https.request(url, options, function(response) {
       
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        }
        if (response.statusCode == 404) {
            res.sendFile(__dirname + "/failure.html");
        }

    response.on("data", function(data){
        //console.log(JSON.parse(data));
    })
    })

    

    request.write(jsonData);
    request.end();

     //console.log(firstName +"," +lastName+ ","+email);
 });

app.post("/failure", function(req,res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000.");
})

//Api Key
//1285d8dc985d5d6ce553dfedafa7d023-us5

//List id
//c173ff4eee.