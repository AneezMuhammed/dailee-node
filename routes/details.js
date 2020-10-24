var connection=require("./connection");
exports.getcustomerdetails=async function(req,res){
    var temp=req.params.value;
    connection.query('SELECT * FROM customer WHERE customer_id= ?',[temp],async function (error, results, fields) {
      if (error) {
        res.json({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if(results.length>0)
      res.json({results})
      }
    })
  }