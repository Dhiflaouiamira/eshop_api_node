
const {Contact} = require("../models/contact");
const express = require("express");


const router = express.Router();

router.post('/messages', (req, res) => {
    // #swagger.tags = ['messages']
    // #swagger.description = 'Add new messages.'
    const contact = new Contact(req.body);
    contact.save()
    .then(c => res.send(c))
    .catch(err => res.status(400).send(err))
})

router.get('/messages', (req, res) => {
    // #swagger.tags = ['messages']
    // #swagger.description = 'Retrieve all stats.'
    Contact.find()
    .then(c => res.send(c))
    .catch(err => res.status(400).send(err))
})

module.exports = router





