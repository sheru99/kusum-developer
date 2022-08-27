const express = require('express');
const router = express.Router();
const commonMW = require("../middlewares/commonMiddlewares")
const userController= require("../controllers/userController")
const productController= require("../controllers/productController")
const orderController= require("../controllers/orderController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createUser",commonMW.validation, userController.createUser)
router.post("/createProduct", productController.createProduct )
router.post("/createOrder",commonMW.validation, orderController.createOrder )


module.exports = router;