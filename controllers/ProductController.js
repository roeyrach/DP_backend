const Product = require("../models/Product")

const getProducts = async (req, res) => {
	try {
		const products = await Product.find()
		if (res.statusCode === 200) {
			res.status(200).json(products)
			console.log(`Number of products: ${products.length}`)
		}
	} catch (error) {
		res.status(500).json({ error: "Server error" })
	}
}

const addProduct = async (req, res) => {
	const { name, sku, desc, type, date } = req.body
	// const [name, sku, desc, type, date] = [
	// 	"name",
	// 	"sku",
	// 	"desc",
	// 	"type",
	// 	new Date(),
	// ]

	try {
		const product = await Product.create({ name, sku, desc, type, date })
		res.send(product)
	} catch (error) {
		console.log("Error creating product: " + error.message)
		res.status(500).send("Error creating product")
	}
}

module.exports = { addProduct, getProducts }
