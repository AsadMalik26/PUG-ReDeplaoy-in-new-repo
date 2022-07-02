var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: {
    type: Number,
    validate: function () {
      if (this.price < 0) {
        this.price = 0;
      }
    },
  },
});

var productModule = mongoose.model("Product", productSchema);
module.exports = productModule;
