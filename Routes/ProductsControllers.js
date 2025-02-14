const User = require('../model/User');
const Product = require('../model/Product');


const addToCart = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user found" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        let { item } = req.body;

        if (!item) {
            return res.status(400).json({ success: false, message: "Product data required" });
        }

        const productId = item._id;
        
        const product = await Product.findById(productId);

        const cartItem = user.cart.find(cart => cart.productId.toString() === productId.toString());

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            user.cart.push({
                productId,
                productName: product.name, 
                productImage: product.image, 
                price: product.price, 
                quantity: 1
            })
        }

        // ✅ 保存购物车
        await user.save();
        res.json({ success: true, cart: user.cart });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Cart update failed", error: error.message });
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { productId, change } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartItem = user.cart.find((item) => item.productId.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        cartItem.quantity += change;

        if (cartItem.quantity <= 0) {
            user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
        }

        await user.save();
        res.json({ success: true, cart: user.cart });

    } catch (error) {
        console.error("❌ Error in updateQuantity:", error);
        res.status(500).json({ success: false, message: "Failed to update cart item", error: error.message });
    }
};

const removeItem = async (req,res) =>{
    try{

    const { productId } = req.body;

    if (!req.userId) {
        return res.status(401).json({ success: false, message: "Unauthorized: No user ID provided" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const newCart = user.cart.filter(item => !item.productId.equals(productId))

    user.cart = newCart;
    await user.save();

    return res.status(200).json({success:true});
    }catch(error){
        console.log(error);
    }
}

const getallItems = async (req,res)=>{
    const getallItems = await Product.find({});
    res.json({ success :true, products:getallItems});
}

const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("cart.productId");
        res.json({ success: true, cart: user.cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve cart" });
    }
};

const getallItemsForMainPage = async(req,res)=>{
        const getallItems = await Product.find({});
        res.json({ success :true, products:getallItems});   
}

module.exports = { addToCart, getCart,getallItems,updateQuantity,removeItem,getallItemsForMainPage};
