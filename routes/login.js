var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
var databaseName = "Zinga";
var tableName = "main";

router.post("/login",function(req,res){

    
if(req.body.login!=null || req.body.login != "undefined"){
     var upassword = req.body.password;
     console.log(upassword);
     var uphoneNumber = req.body.phonenumber;
    
    r.db(databaseName).table(tableName).filter({id : uphoneNumber, password : upassword}).run().then(function(succ){
                
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
    else{
        
        console.log("login not pressed");
    }
     res.render("login",{message : "test"});

  
});


module.exports=router;  

