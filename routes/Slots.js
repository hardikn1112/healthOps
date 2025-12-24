const express = require('express');
const router = express.Router();
const {Slot, validateSlot} = require('../models/Slots');
const auth = require('../middleware/Auth');
const role = require('../middleware/Role');

router.post('/', [auth,role], async (req,res) => {
    // Validate slot - req.body
    const { error } = validateSlot(req.body);
    if (error) return res.status(400).send(Error.details[0].message);

    // Store startTime and endTime to check for overlap
    const {startTime, endTime} = req.body;

    // Prevent Overlapping of slots
    const overlap = await Slot.findOne({ 
        doctorId: req.user._id,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
    });

    if (overlap) return res.status(400).send('Slot overlaps with an existing slot');

    // Create a Slot
    const slot = await Slot.create({
        doctorId: req.user._id,
        startTime,
        endTime
    });

    res.status(201).send(`Slot Created... ${slot}`);
});

module.exports = router;