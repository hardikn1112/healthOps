const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash')
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('../models/Users');
const auth = require('../middleware/Auth');
const router = express.Router();

router.get('/me', auth, async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/',  async (req,res) => {
    // Validate User - req.body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if User Exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    // Compare the password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // Genearte JWT token for the session and return it in header
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(req);
}

module.exports = router;