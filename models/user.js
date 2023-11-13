




const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const Joi = require("joi");

const userSchema = mongoose.Schema({

	fullName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'agent', 'client'],
        default: 'client'
    },

    joinedAt: {
        type: Date,
        default: Date.now()
    },
    
    password: String,

    phone: {
        type: Number,
        required: true
    },

    image: {
        type: String,
        default: null
    }

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
            _id: this._id,
            role: this.role,
            fullName: this.fullName 
        }, 
        process.env.JWT_PRIVATE_KEY
    );
    return token;
};

const User = mongoose.model("User", userSchema);



module.exports = { User };