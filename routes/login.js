var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
var databaseName = "Zinga";
var tableName = "main";

router.get("/",function(req,res){
    
if(req.param("login")!=null){
     var userpass = req.param("password");
     var usernamer = req.param("username");
    
    r.db(databaseName).table(tableName).filter({username : usernamer, password : userpass}).run().then(function(succ){
                console.log(succ.id);
                console.log(succ);
               if(succ.length!=0){
                   console.log("you are now logged in");
               }
                else{
                    console.log("You are not logged in");
                }
    });
}
     res.render("login",{message : "test"});
    
  
});
module.exports=router;  

