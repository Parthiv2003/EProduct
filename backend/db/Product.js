const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    image: { type: String },
    description: { type: String},
    quantity: {type: Number},
    price: {type: Number, require: true}
});

module.exports = mongoose.model("products", productSchema);
