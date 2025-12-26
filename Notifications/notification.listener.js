const eventBus = require('../events/eventBus');
const EVENTS = require('../events/events');

eventBus.on(EVENTS.APPOINTMENT_CREATED, (payload) => {
  try {
    console.log('Notification triggered:', payload);

    // await sendEmail(payload.userId)

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

eventBus.on(EVENTS.APPOINTMENT_CANCELLED, (payload) => {
  try {
    console.log('Notification triggered:', payload);

    // await sendEmail(payload.userId)

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

eventBus.on(EVENTS.SLOT_CREATED, (payload) => {
  try {
    console.log('Notification triggered:', payload);

    // await sendEmail(payload.userId)

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

eventBus.on(EVENTS.SLOT_DELETED, (payload) => {
  try {
    console.log('Notification triggered:', payload);

    // await sendEmail(payload.userId)

  } catch (err) {
    console.error('Notification error:', err.message);
  }
});

