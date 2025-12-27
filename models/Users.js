const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'doctor'],
        default: 'user'
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id:this._id, role: this.role, email:this.email }, process.env.JWT_SECRET_KEY, {expiresIn: '12h'});
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        role: Joi.string().min(4).max(6)
    });

    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;