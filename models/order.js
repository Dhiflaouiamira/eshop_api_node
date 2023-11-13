
const mongoose = require("mongoose")
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const productOrderSchema = mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    quantity: {
        type: Number,
        default: 1
    },

    name:{
        type : String,
        default :""
    },

    price:{
        type : Number,
        default :0
    }

})

const orderSchema = mongoose.Schema({

	client: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true

    },

    total: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    status: {
        type: String,
        enum: ['on-going', 'delivered', 'canceled'],
        default: 'on-going'  
    },

    products: [productOrderSchema]

})


const Order = mongoose.model("Order", orderSchema);



module.exports = { Order };