
const { mongoose, ObjectId, Mongoose } = require("mongoose");
const { Order, validate } = require("../models/order");
const express = require("express");


const router = express.Router();

// Get all orders
router.get("/orders", async (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.description = 'Retrieve all orders.'
    let query = {}
    if (req.query.client) query = { client: mongoose.Types.ObjectId(req.query.client) }
	const orders = await Order.find(query).populate("client")
	res.send(orders);
})


// Add new order
router.post("/orders", async (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.description = 'Add new order.'
    delete req.body._id
    let order = Order(req.body)
    order.products.forEach(product => {
        product.product = mongoose.Types.ObjectId(product._id)
        console.log(order)
    });
    order.save()
    .then(o => res.status(201).send(o))
    .catch(e => res.status(400).send(e))
})

// Get order by id
router.get("/orders/:id", async (req, res) => {
	// #swagger.tags = ['orders']
    // #swagger.description = 'Get order by id.'
    await Order.findById(req.params.id).exec()
    .then(order => res.status(200).send(order))
    .catch(err => res.status(404).send({error: "order not found"}))
})

// Update existing order
router.put("/orders/:id", async (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.description = 'Update order by id.'
    if (req.body.password) delete req.body.password;
    Order.findByIdAndUpdate(req.params.id, req.body, (err, order) => {
        if (err) {
            res.status(404).send({error: "order not found"});
        } else {
            res.send(order);
        }
    });
})

// Delete existing order
router.delete("/orders/:id", async (req, res) => {
    // #swagger.tags = ['orders']
    // #swagger.description = 'Delete order by id.'
    Order.findByIdAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            res.status(404).send({error: "order not found"})
        } else {
            res.status(202).send("order deleted.")
        }
    });
})

module.exports = router