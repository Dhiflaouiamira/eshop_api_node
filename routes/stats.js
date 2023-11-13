
const { mongoose } = require("mongoose");
const { Order } = require("../models/order");
const { User } = require("../models/user");
const { Product } = require("../models/product");

const express = require("express");


const router = express.Router();

// Get all orders
router.get("/stats", async (req, res) => {
    // #swagger.tags = ['stats']
    // #swagger.description = 'Retrieve all stats.'
    let stats = {}
    stats.sales = 0
    await Order.find()
    .then(orders => {
        orders.forEach(order => {
            stats.sales = stats.sales+order.total
        });
    })
    .catch(err => console.log)
	await Order.find().count()
    .then(c => stats.orders = c)
    .catch(err => console.log)
    await Product.find().count()
    .then(p => stats.products = p)
    .catch(err => console.log)
    await User.find().count()
    .then(u => stats.users = u)
    .catch(err => console.log)
	res.send(stats);
})


module.exports = router