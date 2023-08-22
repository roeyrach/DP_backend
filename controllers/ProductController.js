const Product = require("../models/Product")

const getProducts = async (req, res) => {
	try {
		const products = await Product.find()
		if (res.statusCode === 200) {
			res.status(200).json(products)
			console.error(`Number of products: ${products.length}`)
		}
	} catch (error) {
		res.status(500).json({ error: "Server error" })
	}
}

const saveProducts = async (req, res) => {
	const productsToUpdate = req.body
	console.log("all the product comes from req.body ", productsToUpdate)

	try {
		// Find all existing products in the database
		const existingProducts = await Product.find()

		const updatedProducts = await Promise.all(
			productsToUpdate.map(async (productData) => {
				const { _id, ...updateData } = productData

				if (_id) {
					// If _id is provided, update the existing product
					const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
						new: true,
					})
					return updatedProduct
				} else {
					// If _id is not provided, create a new product
					const newProduct = await Product.create(updateData)
					return newProduct
				}
			})
		)

		// Delete products that are not present in the req.body
		existingProducts.forEach(async (existingProduct) => {
			const isPresent = updatedProducts.some((updatedProduct) =>
				updatedProduct._id.equals(existingProduct._id)
			)
			if (!isPresent) {
				await Product.findByIdAndDelete(existingProduct._id)
			}
		})

		res.status(200).json(updatedProducts)
	} catch (error) {
		console.error("Error updating/creating products: " + error.message)
		res.status(500).send("Error updating/creating products")
	}
}

module.exports = { getProducts, saveProducts }
