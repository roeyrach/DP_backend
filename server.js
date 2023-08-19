const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()

const uri = process.env.URI

// Middleware: Logger
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} - ${new Date()}`)
	next()
})

// Middleware: Body Parser
app.use(express.json())

async function connectMongoDB() {
	try {
		await mongoose.connect(uri)
		console.log("Connected to MongoDB")
	} catch (error) {
		console.log("Couldn't connect to MongoDB via error: " + error)
	}
}

connectMongoDB()

// Middleware: Error Handler
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send("Something went wrong!")
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server listen on port ${PORT}`))
