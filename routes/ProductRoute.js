const express = require("express")

const {
	getProducts,
	saveProducts,
} = require("../controllers/ProductController")

const router = express.Router()

router.get("/getProducts", getProducts)
router.patch("/saveProducts", saveProducts)

module.exports = router
