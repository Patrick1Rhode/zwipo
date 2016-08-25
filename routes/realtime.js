var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();

router.get("/",function(req,res){
 r.db("Zinga").table("logs").changes().run().then(function(cursor){
	cursor.each(console.log);
}).error(function(err){
	console.log(err);
});
  
 
    res.render("realtime",{name : "Mwiza"});
});
module.exports=router;