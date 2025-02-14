const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            productId: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
            productName: { type: String }, // ✅ 额外存 `name`
            productImage: { type: String }, // ✅ 额外存 `image`
            price: { type: Number }, // ✅ 存 `price`
            quantity: { type: Number, default: 1 }
        }
    ],
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
