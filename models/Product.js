const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	sku: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
