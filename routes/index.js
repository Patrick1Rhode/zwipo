var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    if(req.param("amount")!=null){
          var amount = req.param("amount");
          console.log(amount); 
    }
  
 
    res.render("index",{name : "Mwiza"});
});
module.exports=router;