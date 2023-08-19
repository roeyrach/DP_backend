const express = require("express")

const { addProduct, getProducts } = require("../controllers/ProductController")

const router = express.Router()

router.post("/addProduct", addProduct)
router.get("/getProducts", getProducts)

module.exports = router
