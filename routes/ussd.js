var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();


router.get("/",function(req,res){
   // res..setRequestHeader(applica);
   r.db("Zinga").table("main").run().then(function(data){
       console.log(data);
       res.jsonp(data);
   }).error(function(error){
       console.log(error);
   });
  
 //res.jsonp(data);
    
});
module.exports=router;