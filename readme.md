# 🩺 Appointment Booking & Event-Driven Notification System

A **production-minded backend system** for managing doctor appointments and availability slots, built with a **clean event-driven architecture** that decouples core business logic from side-effects like email notifications.

This project focuses on **real-world backend engineering challenges** — data consistency, asynchronous workflows, lifecycle events, and extensibility — not just CRUD APIs.

---

## 🚀 Why This Project?

Most appointment booking systems tightly couple booking logic with notifications, making them hard to scale and maintain.

This system is designed differently:

- Core domain actions emit **events**
- Notifications are handled **asynchronously**
- Failures in notifications **never affect** core workflows

This mirrors how real-world production backends are built.

---

## 🧠 Features

### ✅ Appointment Lifecycle Management
- Create appointments
- Cancel appointments using **status updates** (no hard deletes)
- Maintain consistency across users, slots, and appointments

### ✅ Slot Management
- Doctors can create and delete availability slots
- Prevent overlapping or conflicting slots
- Gracefully handle slot deletions after bookings

### ✅ Event-Driven Notifications
- Appointment created → Email to client
- Appointment cancelled → Email to client
- Slot created → Email to doctor
- Slot deleted → Email to doctor

All notifications are triggered via **domain events**, not embedded in route handlers.

---

## 🧩 Architecture Overview
Client Request
↓
Route Handler
↓
Domain Action (Appointment / Slot)
↓
Domain Event Emitted
↓
Notification Listener
↓
Email Service

### Why this architecture?
- Clean separation of business logic and side-effects
- Easy to add SMS / Push notifications later
- Notification failures are isolated and traceable

---

## 🏗️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **In-process EventEmitter**
- **Nodemailer** for email delivery
  
> The system is designed to upgrade to **BullMQ / Redis workers** when scalability demands it.

---

## 🔍 Engineering Challenges Solved

- Avoided null reference errors by **pre-fetching data before deletion**
- Converted ISO timestamps into **human-readable date & time**
- Coordinated async reads across multiple collections
- Ensured notification failures do not break domain flows
- Maintained strict separation between domain logic and side-effects

