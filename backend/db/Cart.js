const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products', 
        required: true
    },
    quantity: {type: Number}
});

module.exports = mongoose.model("carts", cartSchema);
