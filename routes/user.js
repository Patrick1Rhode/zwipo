var express = require("express");
var router = express.Router();
var curl = require('curlrequest');

router.get("/",function(req,res){

 
 
    res.render("user",{name : "h"});
});
module.exports=router;