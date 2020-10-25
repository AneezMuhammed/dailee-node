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
app.get("/ignorecomplaint/:value",login.ignorecomplaint);
app.get("/customercomplaints/:value",login.customercomplaints);
app.get("/complaint2/:value",login.complaint2)
app.get("/complaint",login.complaint)
app.get("/customersearch/:value",login.customersearch);
app.get("/deliverysearch/:value",login.deliversearch);
app.get("/publicationsearch/:value",login.publicationsearch);
app.get("/deliverdetails/:value",login.getdeliverdetails);
app.get("/publicationdetails/:value",login.getpublicationdetails);
app.get("/request",login.requestdetails);
app.get("/request2/:value",login.request)
app.get("/customerinrequestdetails/:value",login.customerinrequestdetails);
app.get("/defaultcustomer",login.defaultcustomer);
app.get("/defaultdeliver",login.defaultdeliver);
app.get("/defaultpublication",login.defaultpublication);
app.get("/customerdetails/:value",login.getcustomerdetails)
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