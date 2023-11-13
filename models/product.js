const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  promo: {
    type: Number,
    default: null
  },
  conditions: {
    type: String,
    enum:["New products",
      "Best sales",
      "Prices drop",
      "In Stock",
    "En Promo"],
    default: null
  },
  type: {
    type: String,
    enum: ["maquillage","ongles","Soins de la peau","Parfums","Produits capillaires","Soins du corps","Produits d'hygiène féminine" ],
    default: null
  },
  stars: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Product = mongoose.model("Product", productSchema);

// Define the validation schema using Joi
const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  promo: Joi.number().default(null),
  conditions: Joi.string().default(null),
  type: Joi.string().valid("abc").default(null),
  stars: Joi.number().default(0),
  quantity: Joi.number().default(0),
  image: Joi.string().default(null),
  createdAt: Joi.date().default(Date.now),
});

// Define the validate function using Joi
function validate(product) {
  return productValidationSchema.validate(product);
}

module.exports = { Product, validate };
