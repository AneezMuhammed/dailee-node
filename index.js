var express = require("express");
var login = require("./routes/login");
var bodyParser = require("body-parser");
var search = require("./routes/search");
var session = require("express-session");
var app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.get("/search/:value",login.search);
app.get("/defaultcustomer",login.defaultcustomer);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/login",login.login)
 app.post("/deliveryagency",login.registerdelivery)
app.post("/customer",login.registercustomer)
var router = express.Router();
app.set("view engine", "ejs");
app.use("/api", router);
app.use(express.static("public/"));
app.listen(4000);