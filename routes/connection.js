
var mysql = require("mysql2");

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
  module.exports.connection;