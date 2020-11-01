
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
  exports.requestdetails=async function (req,res){
    connection.query('SELECT * FROM new_publications where admin_view=  ?',[0],async function (error, results, fields) {
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
              console.log("gfff");
              console.log(results[0].role);  console.log(results[0].login_id); 
              if(results[0].role=="Delivery to home"){
                connection.query(
                  "SELECT * FROM delivers WHERE deliver_id = ?", [results[0].login_id],async function (error, result, fields) {
                    if (error) {
                      res.json({
                        code: 400,
                        failed: "error ocurred",
                      });
                    }else{
                      console.log()
                      res.json({
                        code: 200,
                        zone_id:result[0].zone_id,
                       role:results[0].role,
                       id:results[0].login_id
                      });
                    }
                
              });}
              else{
                res.json({
                  code: 200,
                  
                 role:results[0].role,
                 id:results[0].login_id
                });
              }
             
            } else {                            //upto
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
            connection.query("SELECT * from delivers where deliver_id= ?",[var1.deliver_id],function(error,results,field){
              if (error) {
                console.log(error);
                res.json({
                  code: 400,
                  failed: "Inside error ocurred",
                });
              }
              else{
                res.json({
                  code:200,
                  role:results[0].deliver_type,
                  id:results[0].deliver_id,
              })
              }
            });
          }
        });
     }
    };
    exports.registerdeliveryhome = async function (req, res) {
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
        
        // Agency_Name:req.body.agencyname
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
            connection.query("SELECT * from delivers where deliver_id= ?",[var1.deliver_id],function(error,results,field){
              if (error) {
                console.log(error);
                res.json({
                  code: 400,
                  failed: "Inside error ocurred",
                });
              }
              else{
                res.json({
                  code:200,
                  role:results[0].deliver_type,
                  id:results[0].deliver_id,
                  zone_id:results[0].zone_id,
              })
              }
            });
             
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
    //UP TO THIS BACKEND OF REQUEST FROM CUSTOMERS to admin
    exports.customerinrequestdetails=async function (req,res){
      var temp=req.params.value;
      console.log(temp);
      connection.query('SELECT * FROM customer WHERE customer_id= ?',[temp],async function (error, results, fields) {
        if (error) {
          console.log(err)
          res.json({
            code: 400,
            failed: "error ocurred",
          });
        } else {
          if(results.length>0){
          console.log(results);
        res.json({list:results,code:200})}
        else{
          res.json({code:206})
        }
        }
      })
    }

    exports.request=async function (req,res){                     //this is for checking the correct request in viewing each request
      var temp=req.params.value;
      connection.query('SELECT * FROM new_publications WHERE newpub_id= ?',[temp],async function (error, results, fields) {
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
    exports.changestatus=async function (req,res){  
      var temp=req.params.value;    
      console.log("hai");                                                          
    connection.query('UPDATE new_publications set status= "1" where newpub_id= ?',[temp],async function (error, results, fields) {
    if (error) {
    res.json({
    code: 400,
    failed: "error ocurred",
    });
    } else {
    
    
    console.log(results);
    res.json({code:200})
    
    
    }
    })
    }
    
    exports.ignorerequest=async function (req,res){  
      var temp=req.params.value;    
      console.log("hai");                                                          
    connection.query('UPDATE new_publications set admin_view= "1"  where newpub_id= ?',[temp],async function (error, results, fields) {
    if (error) {
    res.json({
    code: 400,
    failed: "error ocurred",
    });
    } else {
    
    
    console.log(results);
    res.json({code:200})
    
    
    }
    })
    }
   
    exports.complaint=async function (req,res){      
                   console.log("hai");
                   console.log("hhhh")
      connection.query('SELECT * FROM complaints where status= ?',[0],async function (error, results, fields) {
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
    exports.complaint2=async function (req,res){  
      var temp=req.params.value;    
      console.log("hai");                                                             //it is used for enlarging complaaints by retreivind dta from complaint table
connection.query('SELECT * FROM complaints where complaint_id= ?',[temp],async function (error, results, fields) {
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
exports.customercomplaints=async function (req,res){  
  var temp=req.params.value;    
  console.log("hai");                                                             //it is used for enlarging complaaints by retreivind dta from complaint table
connection.query('SELECT * FROM customer where customer_id= ?',[temp],async function (error, results, fields) {
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
exports.ignorecomplaint=async function (req,res){  
  var temp=req.params.value;    
  console.log("hai");                                                             //it is used for enlarging complaaints by retreivind dta from complaint table
connection.query('UPDATE complaints set status= "1"  where complaint_id= ?',[temp],async function (error, results, fields) {
if (error) {
res.json({
code: 400,
failed: "error ocurred",
});
} else {


console.log(results);
res.json({code:200})


}
})
}
exports.Menutab=async function (req,res){  
  
  console.log("Entered node menu tab");                                                             //it is used for enlarging complaaints by retreivind dta from complaint table
connection.query('SELECT * FROM admin',async function (error, results, fields) {
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
exports.sendmessage=async function (req,res){  
  var temp=req.params.value;    
  console.log("hai");                                                             //it is used for enlarging complaaints by retreivind dta from complaint table
connection.query("INSERT INTO notifications (content) values (?)",[temp],async function (error, results, fields) {
if (error) {
res.json({
code: 400,
failed: "error ocurred",
});
} else {


console.log(results);
res.json({code:200})


}
})
}

exports.defaultcustomerfordelivery= async function(req,res){
  var temp=req.params.value;
  console.log(temp);
  console.log("hihi")
  connection.query('SELECT DISTINCT c1.customer_id,c1.customer_name,c1.reg_mobile,c1.address FROM customer c1 inner join subscription s1 ON c1.customer_id=s1.customer_id where c1.zone_id= ? order by c1.customer_name asc ',[temp],async function (error, results, fields) {
    if (error) {
      console.log(error)
      res.json({
        code: 400,
        failed: "error ocurred",
      });
    } else {
      console.log("ok ano")
      if(results.length>0){
        console.log(results);
        res.json({list:results});
       
      }
    
    }
  })
}
exports.deliverydetails= async function(req,res){
var temp=req.params.value;
  console.log("hihi")
  connection.query('SELECT p1.publication_id,p1.publication_name,p1.category,p1.language,s1.period FROM publications p1 inner join subscription s1 ON p1.publication_id=s1.publication_id where s1.customer_id= ? ',temp,async function (error, results, fields) {
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
exports.customersearchindelivery= async function(req,res){
  var temp=req.params.value;
  var z=req.params.value2;
  console.log("hihi")
  connection.query('SELECT DISTINCT c1.customer_id,c1.customer_name,c1.reg_mobile,c1.address FROM customer c1 inner join subscription s1 ON c1.customer_id=s1.customer_id WHERE lower(c1.customer_name) LIKE "%'+temp+'%" and zone_id= ?',[z],async function (error, results, fields) {
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

exports.replycustomer=async function (req,res){  
  console.log(req.params.id);
  console.log('fffff');
  // console.log(req.body)
   var temp=req.params.reqid;
  var var1={
    content:req.params.message,
    customer_id:req.params.id
  }
  console.log("dddddd");   
  
                                                       
connection.query('INSERT INTO notifications SET ?',[var1],async function (error, results, fields) {
  console.log("qqqqq")
if (error) {
  console.log(error)
res.json({
code: 400,
failed: "error ocurred",
});
} else {
  console.log(results)
  console.log("chumma")
  connection.query('UPDATE new_publications set admin_view= "1"  where newpub_id= ?',[temp],async function (error, results, fields){
    if (error) {
      res.json({
      code: 400,
      failed: "error ocurred",
      });
      }
      else{
        console.log(results);
        res.json({code:200})
        
      }
  });



}
});
}
exports.deliverprofile= async function(req,res){
  var temp=req.params.value;
    console.log("hihi")
    connection.query('SELECT * from delivers where deliver_id= ? ',temp,async function (error, results, fields) {
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

  exports.deliver2agencyrequest= async function(req,res){
   console.log("hey hey aneez")
      console.log("hey deliver")
      connection.query('SELECT * from new_publications where status="0" and admin_view="1"',async function (error, results, fields) {
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
    exports.confirmrequest= async function(req,res){
      temp=req.params.value
      console.log("hey hey")
         console.log("hey deliver")
         connection.query('UPDATE new_publications set status="1" where newpub_id= ?',[temp],async function (error, results, fields) {
           if (error) {
             console.log(error)
             res.json({
               code: 400,
               failed: "error ocurred",
             });
           } else {
             
               console.log(results);
               res.json({code:200})
              
             
           
           }
         })
       }
       