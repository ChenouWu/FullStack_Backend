const express = require("express");
const {addToCart ,getCart, getallItems,updateQuantity, removeItem,getallItemsForMainPage} = require('./ProductsControllers')
const protect = require('../middleWare/protect')

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/getcart", protect, getCart);
router.post('/updateQuantity',protect,updateQuantity)
router.get("/getallItems",getallItems);
router.get("/getallItemsForMainPage",getallItemsForMainPage)
router.delete('/deleteItem',protect,removeItem);


module.exports = router;
