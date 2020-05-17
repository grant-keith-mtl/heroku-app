const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;

    var data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: fName,
                LNAME: lName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    console.log(jsonData);

    const url = "https://us18.api.mailchimp.com/3.0/lists/de4df286a6";

    const options = {
        method:"POST",
        auth: "keithggk23:6f1e11732578437a17150d47224cc74f-us18"
    }
    
    const request = https.request(url, options, function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    console.log(request);

    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res){
    res.redirect(__dirname)
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

//API key
//6f1e11732578437a17150d47224cc74f-us18

//List ID
//de4df286a6