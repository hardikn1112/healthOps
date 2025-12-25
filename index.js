const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const register = require('./routes/Register');
const login = require('./routes/Login');
const slot = require('./routes/Slots');
const appointment = require('./routes/Appointments');
require('./Notifications/notification.listener');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/healthops')
        .then(() => console.log('Conneced to MongoDB...'))
        .catch(err => console.log('Could not connect to MongoDB...', err.message));
        

app.get('/', (req,res) => {
    res.send(`<h1>This is HealthOps</h1>`);
})

app.use('/register', register);
app.use('/login', login);
app.use('/slots', slot);
app.use('/appointments', appointment);

app.listen(port, () => {
    console.info(`Server is listening on port ${port}...`)
})