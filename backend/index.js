const config = require("./db/Config");
const product = require("./db/Product");
const Cart = require("./db/Cart");
const cors = require("cors");
const express = require("express");
const app = express();
const multer = require('multer');;

app.use(cors());
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Images")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    },
});

const upload = multer({ storage: storage });

app.post("/addProduct", upload.single("pimage"), async (req, res) => {
    try{
        const imageName = req.file.filename
        res.send(imageName)
    }
    catch(error){
        res.json({ status : error})
    }
});

app.post("/storeProduct", async (req, res) => {

    try{
        await product.insertMany({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price
        });
        res.send(req.body);
    }
    catch(error){
        res.send("in catch")
    }
})

app.get("/getProduct", async (req, res) => {
    try {
        product.find({}).then((object) => {
            res.send(object);
        });
    } catch (error) {
        res.json({ status: error });
    }
});

app.post("/addCart", async (req, res) => {
    try {
        await Cart.create({
            productId: req.body.productId,
            quantity: 1
        });

        const qty = req.body.quantity - 1;
        const result = await product.findByIdAndUpdate(req.body.productId, 
            {
                $set: { quantity: qty}
            },
            {
                new: true
            }
        )
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});

app.get("/getCart", async (req, res) => {
    try {
        const cartItem = await Cart.find().populate('productId');
        res.send(cartItem)
    } catch (error) {
        res.json({ status: error });
    }
});

app.put("/updateCart", async (req, res) => {
    try {
        const productRes = await product.findById(req.body.productId);
        if(productRes.quantity >= req.body.quantity){
            const qty = productRes.quantity - req.body.quantity
            await product.findByIdAndUpdate(
                req.body.productId,
                {
                    $set: { quantity: qty },
                },
                {
                    new: true,
                }
            )
            const result = await Cart.updateOne(
                {
                    productId : req.body.productId
                },
                {
                    $set: { quantity: req.body.quantity },
                },
                {
                    new: true,
                }
            );
            if (!result) {
                return res.status(404).json({ error: "Product not found" });
            }
            return res.json(result);
        }
    } catch (err) {
        return res.status(422).json({ error: err.message });
    }
});

app.listen(3000, () => console.log(`Server running on port 3000`));
