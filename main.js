var express = require("express");
var ejs = require("ejs");
var r = require("rethinkdbdash")();
var app = express();
app.set("view engine","ejs");
var indexp = require(__dirname+"/routes/index.js");
var realtimep = require(__dirname+"/routes/realtime.js");
var registerp = require(__dirname+"/routes/register.js");
var checkbalancep = require(__dirname+"/routes/check.js");
var withdrawp = require(__dirname+"/routes/withdraw.js");


app.use("/index",indexp);
app.use("/withdraw",withdrawp);
app.use("/checkbalance",checkbalancep);
app.use("/register",registerp);
app.use("/realtime",realtimep);
app.listen(3000,function(erro,su){
    if(erro){
        console.log("error server not started");
    }
    else{
        console.log("server started");
    }
});