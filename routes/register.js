var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
router.get("/",function(req,res){
    if(req.param("register")!=null){
          var firstName = req.param("Fname");
          var lastName = req.param("Sname");
          var phone = req.param("phone");
       
       
        
        
        
        r.db("Zinga").table("users").insert({fname : firstName,lname : lastName , key : phone}).run().then(function(data){
        
            
        }).error(function(error){
            console.log(error.first_error+" from error");
        });
       //
    }
    res.render("register",{message : "test"});
 
 
});
module.exports=router;