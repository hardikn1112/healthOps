const mongoose = require('mongoose');
const Joi = require('joi');

const slotSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Slot = mongoose.model('Slot', slotSchema);

function validateSlot(slot) {
    const schema = Joi.object({
        doctorId: Joi.string(),
        startTime: Joi.date().iso().required(),
        endTime: Joi.date().iso().required(),
        isBooked: Joi.forbidden()
    });

    return schema.validate(slot);
}

exports.Slot = Slot;
exports.validateSlot = validateSlot;