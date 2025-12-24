const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const {User, validateUser} = require('../models/Users');
const router = express.Router();

router.post('/', async (req,res) => {
    // Validate User - req.body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if already registered
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User Already Registered');

    // Create a new user
    user = new User( _.pick(req.body, ['name', 'email', 'password', 'role'] ));

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the Database
    user.save();

    // Genearte JWT token for the session and return it in header
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

module.exports = router;