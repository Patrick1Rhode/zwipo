var express = require("express");
var router = express.Router();
var r = require("rethinkdbdash")();
router.get("/",function(req,res){
    if(req.param("register")!=null){
          var Fname = req.param("Fname");
          var Sname = req.param("Sname");
          var phone = req.param("phone");
        //dbwork
       // {fname : "Mwiza",sname : "Simbeye", phone : "260965175641", id : "260965175641"}
        var jsondata = {fname : 'test',lname : 'test' , key : '290'};
        //jsondata = JSON.parse(jsondata);
        jsondata.fname=Fname;
        //console.log(jsondata);
        
        
        
        r.db("Zinga").table("users").insert(jsondata).run().then(function(data){
            console.log(jsondata);
            console.log(data.first_error+" from success");
        }).error(function(error){
            console.log(error.first_error+" from error");
        });
       //
    }
    res.render("register",{message : "test"});
 
 
});
module.exports=router;