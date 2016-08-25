var express = require("express");
var ejs = require("ejs");
var r = require("rethinkdbdash")();
var app = express();
app.set("view engine","ejs");
var indexp = require(__dirname+"/routes/index.js");
var realtimep = require(__dirname+"/routes/realtime.js");
var registerp = require(__dirname+"/routes/register.js");
var ussdp = require(__dirname+"/routes/ussd.js");


app.use("/index",indexp);
app.use("/ussd",ussdp);
app.use("/register",registerp);
app.use("/realtime",realtimep);
app.listen(3000,'0.0.0.0',function(erro,su){
    if(erro){
        console.log("error server not started");
    }
    else{
        console.log("server started");
    }
});