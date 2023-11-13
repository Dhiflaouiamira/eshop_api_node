const express = require('express');
const connect = require('./config/db');
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const stats = require('./routes/stats');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts'); 
const cors = require('cors');
var morgan = require('morgan')
require('dotenv').config();

const mongoose = require('mongoose');
const dburl = process.env.dburl;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());


app.use(morgan('tiny'))


// CORS middleware
app.use(cors());




app.use(express.json());

// Routes
app.use("/api", [auth, users, products, orders, stats, contacts]); // Use Contact instead of contact




// Middlewares
app.use(express.json());




mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });