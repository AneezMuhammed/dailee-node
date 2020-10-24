
var mysql = require("mysql2");
const bcrypt = require("bcrypt");
const { v4: uuidV4 } = require("uuid");

const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

var connection = mysql.createConnection({
    host: "localhost",
    port:3308,
    user: "root",
    password: "",
    database: "dailee",
  });
 
  connection.connect(function (err) {
    if (!err) {
      console.log("Database is connected ... nn");
    } else {
      console.log(err);
    }
  });
  exports.getcustomerdetails=async function(req,res){
    var temp=req.params.value;
    console.log(temp);
    connection.query('SELECT * FROM customer WHERE customer_id= ?',[temp],async function (error, results, fields) {
      if (error) {
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if(results.length>0){
        console.log(results);
      res.json({list:results})}
      
      }
    })
  }
  exports.getdeliverdetails=async function(req,res){
    var temp=req.params.value;
    console.log(temp);
    connection.query('SELECT * FROM delivers WHERE deliver_id= ?',[temp],async function (error, results, fields) {
      if (error) {
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if(results.length>0){
        console.log(results);
      res.json({list:results})}
      
      }
    })
  }
  exports.getpublicationdetails=async function(req,res){
    var temp=req.params.value;
    console.log(temp);
    connection.query('SELECT * FROM publications WHERE publication_id= ?',[temp],async function (error, results, fields) {
      if (error) {
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if(results.length>0){
        console.log(results);
      res.json({list:results})}
      
      }
    })
  }
  exports.customersearch=async function(req,res){ //search starting
    var temp=req.params.value;
    connection.query('SELECT * FROM customer WHERE lower(customer_name) LIKE "%'+temp+'%"',async function (error, results, fields) {
      if (error) {
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
    if(results.length>0)
      res.json({list:results})
      }
    })
  }
  exports.deliversearch=async function(req,res){ //search starting
    var temp=req.params.value;
    connection.query('SELECT * FROM delivers WHERE lower(name) LIKE "%'+temp+'%"',async function (error, results, fields) {
      if (error) {
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
    if(results.length>0)
      res.json({list:results})
      }
    })
  }
  exports.publicationsearch=async function(req,res){ //search starting
    var temp=req.params.value;
    connection.query('SELECT * FROM publications WHERE lower(publication_name) LIKE "%'+temp+'%"',async function (error, results, fields) {
      if (error) {
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
    if(results.length>0)
      res.json({list:results})
      }
    })
  }

  exports.defaultcustomer=async function(req,res){
    // var temp=req.params.value;
    console.log("hihi")
    connection.query('SELECT * FROM customer order by customer_name asc  ',async function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if(results.length>0){
          console.log(results);
          res.json({list:results})
         
        }
      
      }
    })
  }
  exports.defaultdeliver=async function(req,res){
    // var temp=req.params.value;
    console.log("hihi")
    connection.query('SELECT * FROM delivers order by name asc  ',async function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if(results.length>0){
          console.log(results);
          res.json({list:results});
         
        }
      
      }
    })
  }

  exports.defaultpublication=async function(req,res){
    // var temp=req.params.value;
    console.log("hihi")
    connection.query('SELECT * FROM publications order by publication_name asc  ',async function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if(results.length>0){
          console.log(results);
          res.json({list:results})
         
        }
      
      }
    })
  }



  exports.login = async function (req, res) {
    
    var password = req.body.password;
   
    console.log("welcome");
    connection.query(
      "SELECT * FROM login WHERE email = ?",
      [req.body.email],
      async function (error, results, fields) {
        if (error) {
          res.json({
            code: 400,
            failed: "error ocurred",
          });
        } else {
         
         
          if (results.length > 0 ) {
            const comparison = await bcrypt.compare(
              password,
              results[0].password
            );
            if (comparison) {
         
          
              res.json({
                code: 200,
                
               role:results[0].role
              });
            } else {
              res.json({
                code: 204,
                success: "Email and password does not match",
              });
            }
          } else {
            res.json({
              code: 206,
              success: "Email does not exits",
            });
          }
        }
      }
    );
   
  
  };

 

  exports.registerdelivery = async function (req, res) {
      const password = req.body.password;
      
   
      
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      var uuidgiven=uuidV4();
      var users = {
        login_id: uuidgiven,
        email: req.body.email,
        password: encryptedPassword,
        role:req.body.role,
        
        
       
      };
    
      var var1;
      var zone;
  
    if(req.body.zoneid!=null){
zone=req.body.zoneid;
    }
    
    
        connection.query("INSERT INTO login SET ?", users, function (
          error,
          results,
          fields
        ) {
          if (error) {
            console.log(error);
            res.json({
              code: 400,
              failed: "error ocurred",
            });
          } else {
           var1={
               deliver_id:uuidgiven,
               name:req.body.name,
              
        reg_mobile:req.body.phonenumber,
        email:req.body.email,
        deliver_type:req.body.role,
        
        Agency_Name:req.body.agencyname
           };
           detailupdate();
          }
        });
     var detailupdate=async function(){
      connection.query("INSERT INTO delivers SET ?", [var1], function (
          error,
          results,
          fields
        ) {
          if (error) {
            console.log(error);
            res.json({
              code: 400,
              failed: "error ocurred",
            });
          } else {
              res.json({
                  code:200,

              })
          }
        });
     }
    };

    exports.registercustomer = async function (req, res) {
      const password = req.body.password;
      
   
      
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      var uuidgiven=uuidV4();
      var users = {
        login_id: uuidgiven,
        email: req.body.email,
        password: encryptedPassword,
        role:req.body.role,
        
        
       
      };
    
      var var1;
//       var zone;
  
//     if(req.body.zoneid!=null){
// zone=req.body.zoneid;
//     }
    console.log("how funny")
    
        connection.query("INSERT INTO login SET ?", users, function (
          error,
          results,
          fields
        ) {
          if (error) {
            console.log(error);
            res.json({
              code: 400,
              failed: "error ocurred",
            });
          } else {
           var1={
               customer_id:uuidgiven,
               customer_name:req.body.name,
              
        reg_mobile:req.body.phonenumber,
        email:req.body.email,
        address:req.body.address,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        // deliver_type:req.body.role,
        
        // Agency_Name:req.body.agencyname
           };
           detailupdate();
          }
        });
     var detailupdate=async function(){
      connection.query("INSERT INTO customer SET ?", [var1], function (
          error,
          results,
          fields
        ) {
          if (error) {
            console.log(error);
            res.json({
              code: 400,
              failed: "error ocurred",
            });
          } else {
              res.json({
                  code:200,

              })
          }
        });
     }
    };