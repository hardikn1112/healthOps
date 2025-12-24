const mongoose = require('mongoose');
const Joi = require('joi');

const appointmentSchema = new mongoose.Schema({
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Booked', 'Cancelled'],
        default: 'Booked'
    }
}, {timestamps: true});

const Appointment = mongoose.model('Appointment', appointmentSchema);

function validateAppointment(appointment) {
    const schema = Joi.object({
        slotId: Joi.string().required()
    });

    return schema.validate(appointment);
}

exports.Appointment = Appointment;
exports.validateAppointment = validateAppointment;