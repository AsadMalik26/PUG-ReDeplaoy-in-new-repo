var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send("Hello Asad");
  // res.send("<h1> Hello Asad </h1>");
  res.render("index.pug", { title: "Home Page" });
});
/* router.get("/Products", function (req, res, next) {
  res.render("products");
  // res.send("<h1> Hello Products </h1>");
}); */
router.get("/contactus", function (req, res, next) {
  res.render("contactus");
});

module.exports = router;
