var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
router.get("/",function(req,res){
    if(req.param("withdraw")!=null){
          var amountr = req.param("amount");
          var phone = req.param("phone");
        
        r.db("Zinga").table("main").get(phone).run().then(function(data){
            var balance = data.amount-amountr;
            console.log(balance);
            //updating de dabase
            r.db("Zinga").table("main").get(phone).update({amount: balance}).run().then(function(tsup){
                
            }).error(function(error){
                
            });
            //end
            //inserting data into logs table
            r.db("Zinga").table("logs").insert({amount : amountr , key : phone, date : "2016/08/22", type : "withdraw"}).run().then(function (cool){
                
            }).error(function (error){
                
            });
            //end
        }).error(function(error){
            console.log(error.first_error+" from error");
        });
       //
    }
    res.render("withdraw",{message : "test"});
 
 
});
module.exports=router;