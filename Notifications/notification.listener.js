const eventBus = require('../events/eventBus');
const EVENTS = require('../events/events');
const sendEmail = require('./notification.mail');
const {appointmentCreatedTemplate, appointmentCancelledTemplate, 
  slotCreatedTemplate, slotCancelledTemplate} = require('../Notifications/mailTemplates');

eventBus.on(EVENTS.APPOINTMENT_CREATED, async (payload) => {
  try {
    console.log('Notification - Appointment Created:', payload);

    const mail = await appointmentCreatedTemplate(payload);

    await sendEmail(mail);

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

eventBus.on(EVENTS.APPOINTMENT_CANCELLED, async (payload) => {
  try {
    console.log('Notification - Appointment Cancelled:', payload);

    const mail = await appointmentCancelledTemplate(payload);

    await sendEmail(mail);

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

eventBus.on(EVENTS.SLOT_CREATED, async (payload) => {
  try {
    console.log('Notification - Slot Created:', payload);

    const mail = await slotCreatedTemplate(payload);

    await sendEmail(mail);

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

eventBus.on(EVENTS.SLOT_DELETED, async (payload) => {
  try {
    console.log('Notification - Slot Deleted:', payload);

    const mail = await slotCancelledTemplate(payload);

    await sendEmail(mail);

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

