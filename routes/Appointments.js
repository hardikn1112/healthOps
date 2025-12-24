const express = require('express');
const router = express.Router();
const {Appointment, validateAppointment} = require('../models/Appointments');
const auth = require('../middleware/Auth');
const {Slot} = require('../models/Slots');

router.post('/', auth, async (req,res) => {
    // Validate Appointment - req.body
    const { error } = validateAppointment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const slotId = req.body.slotId;

    // Book the Slot
    const slot = await Slot.findOneAndUpdate(
        { _id: slotId, isBooked: false},
        { isBooked: true }, { new: true }
    );
    if (!slot) return res.status(400).send('Slot Not Available');

    // Create Appointment
    try{
        const appointment = new Appointment({
            slotId: slot._id,
            doctorId: slot.doctorId,
            clientId: req.user._id
        });

        await appointment.save();
        res.status(201).send('Appointment Booked');
    }
    catch (err) {
        // Rollback if appointment creation fails
        await Slot.findByIdAndUpdate(slotId, { isBooked: false });
        throw err;
    }
});

router.put('/cancel/:id', auth, async (req,res) => {
    try {
        const appointment = await Appointment.findOne({
            _id: req.params.id,
            clientId: req.user._id,
            status: 'Booked'
        });

        if (!appointment) {
            res.status(400).send('Appoinment not found');
        }

        appointment.status = 'Cancelled';
        await appointment.save();

        await Slot.findByIdAndUpdate(appointment.slotId, { isBooked: false });

        res.send('Appointment Cancelled');
    }
    catch (err) {
        res.status(500).send('Cancellation Failed');
    }
})

module.exports = router;