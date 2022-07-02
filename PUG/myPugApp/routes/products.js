var express = require("express");
var router = express.Router();
var productModal = require("../modals/productModal");
var checkSessionAuth = require("../middlewares/checkSessionAuth");
/* GET users listing. */
router.get("/", async function (req, res, next) {
  let products = await productModal.find();
  console.log(req.session.user);
  res.render("products/list", { title: "Products List", products });
  // res.send("I am in products.js");
});
//store data
router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/add");
  // res.send("I am in products.js");
});
router.post("/add", async function (req, res, next) {
  let product = new productModal();
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.redirect("/products");
  // res.send("I am in products.js");
});

router.get("/delete/:id", async (req, res, nexy) => {
  let product = await productModal.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
router.get("/cart/:id", async function (req, res, next) {
  let product = await productModal.findById(req.params.id);
  console.log("Add This Product in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/products");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, nexy) {
  let product = await productModal.findById(req.params.id);
  console.log("editing");
  res.render("products/edit", { product });
});
router.post("/edit/:id", async function (req, res, next) {
  let product = await productModal.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  console.log("saving");
  await product.save();
  res.redirect("/products");
});

module.exports = router;
