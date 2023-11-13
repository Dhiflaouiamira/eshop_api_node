
const { Product, validate } = require("../models/product");
const express = require("express");

const router = express.Router();

// Get all products
router.get("/products", async (req, res) => {
    // #swagger.tags = ['products']
    // #swagger.description = 'Retrieve all products.'
    let query = {}
    if (req.query.search) query.name = { $regex: req.query.search, $options: "i" }

    if (req.query.type) query.type = req.query.type
	const products = await Product.find(query);
	res.send(products);
})

function getProductErrorsDetails(errors) {
    errorsObj = {}
    errors.forEach(err => {
        errorsObj[err.path[0]] = err.message
    })
    return errorsObj;
}

// Add new product
router.post("/products", async (req, res) => {
    // #swagger.tags = ['products']
    // #swagger.description = 'Add new product.'
    try {
        let product = Product(req.body)
        await product.save();
        res.send(product);
    } catch (error) {
        res.status(500).send({error: error});
    }
})

// Get product by id
router.get("/products/:id", async (req, res) => {
	// #swagger.tags = ['products']
    // #swagger.description = 'Get product by id.'
    await Product.findById(req.params.id).exec()
    .then(product => res.status(200).send(product))
    .catch(err => res.status(404).send({error: "product not found"}))
})

// Update existing product
router.put("/products/:id", async (req, res) => {
    // #swagger.tags = ['products']
    // #swagger.description = 'Update product by id.'
    if (req.body.password) delete req.body.password;
    Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        if (err) {
            res.status(404).send({error: "product not found"});
        } else {
            Product.findById(product.id).exec()
            .then(product => res.status(200).send(product))
            .catch(err => res.status(404).send({error: "product not found"}))
        }
    });
})

// Delete existing product
router.delete("/products/:id", async (req, res) => {
    // #swagger.tags = ['products']
    // #swagger.description = 'Delete product by id.'
    Product.findByIdAndDelete({ _id: req.params.id }, (err, product) => {
        if (err) {
            res.status(404).send({error: "product not found"})
        } else {
            res.status(204).send()
        }
    });
})

module.exports = router