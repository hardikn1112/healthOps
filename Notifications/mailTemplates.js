const mongoose = require('mongoose');
const {User} = require('../models/Users');
const {Slot} = require('../models/Slots');

function formatSlotTime(isoDate) {
    return new Date(isoDate).toLocaleString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });
}

async function appointmentCreatedTemplate(payload) {

    const doctor = await User.findById(payload.doctorId).select('name').lean();
    const client = await User.findById(payload.clientId).select('email').lean();

    return {
        to: client.email,
        subject: `Your Appointment has been Created`,
        body: `Your Appointment with ${doctor.name} has been created for ${formatSlotTime(payload.startTime)}`
    }
};

async function appointmentCancelledTemplate(payload) {

    const doctor = await User.findById(payload.doctorId).select('name').lean();
    const client = await User.findById(payload.clientId).select('email').lean();

    return {
        to: client.email,
        subject: `Your Appointment has been Cancelled`,
        body: `Your Appointment with ${doctor.name} for ${formatSlotTime(payload.startTime)} has been cancelled.`
    }
};

async function slotCreatedTemplate(payload) {

    const doctor = await User.findById(payload.doctorId).lean();

    return {
        to: doctor.email,
        subject: `Your Slot has been Created`,
        body: `Dear ${doctor.name},
Your Slot has been created for ${formatSlotTime(payload.startTime)}`
    }
};

async function slotCancelledTemplate(payload) {

    const doctor = await User.findById(payload.doctorId).lean();

    return {
        to: doctor.email,
        subject: `Your Slot has been Removed`,
        body: `Dear ${doctor.name},
Your Slot for ${formatSlotTime(payload.startTime)} has been removed.`
    }
};



module.exports.appointmentCreatedTemplate = appointmentCreatedTemplate;
module.exports.appointmentCancelledTemplate = appointmentCancelledTemplate;
module.exports.slotCreatedTemplate = slotCreatedTemplate;
module.exports.slotCancelledTemplate = slotCancelledTemplate;