var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
  
 
    res.render("user",{name : "Mwiza"});
});
module.exports=router;