const express = require("express")

const {
	addProduct,
	getProducts,
	saveProducts,
} = require("../controllers/ProductController")

const router = express.Router()

router.post("/addProduct", addProduct)
router.get("/getProducts", getProducts)
router.patch("/saveProducts", saveProducts)

module.exports = router
