const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/Kabra", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to DB"))
    .catch((e) => console.log("error", e));
