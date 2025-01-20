# DineMaster Pro - Frontend

DineMaster Pro is the frontend system of Canim's online ordering and delivery platform. Built with a modern tech stack, it provides role-based user interfaces for managing menu items, tracking orders, visualizing kitchen operations, and handling deliveries. Designed to enhance the user experience, it integrates real-time WebSocket updates, geolocation services, and a sleek responsive design.

---

## Link to Application

[https://dinemasterpro.netlify.app/](https://dinemasterpro.netlify.app/)

---

## Purpose

Canim is a beloved local restaurant known for its exceptional cuisine and welcoming ambiance. With growing demand, particularly during peak hours, the restaurant faces challenges with its dine-in-only service model. This project aims to address these challenges by implementing an online ordering and delivery system, allowing customers to conveniently order and track their meals from home.

---

## Table of Contents

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Tests](#tests)  
4. [Requirements](#requirements)  
5. [Documentation](#documentation)  
6. [Setup and Installation](#setup-and-installation)  
7. [Continuous Integration/Deployment](#continuous-integrationdeployment)  
8. [Contributors](#contributors)  
9. [License](#license)  

---

## Features

- **Role-Based Access**:
  - **Manager**: Manage menu items, add staff members, track deliveries, and oversee staff and customer accounts.
  - **Kitchen Staff**: Visualize and process orders in real-time.
  - **Delivery Personnel**: View and update delivery orders.
  - **Customers**: Place and track food orders with real-time progress updates.
  
- **WebSocket Integration**: `Real-time` updates for order progress using `STOMP` over `WebSocket`.

- **Geolocation Integration**:
  - Validate delivery addresses.
  - Calculate delivery fees dynamically based on the distance between the restaurant and the customer.

- **Responsive Design**: Optimized for both desktop and mobile users with a sleek interface.

- **Dynamic Map Visualization**: Real-time order tracking and delivery routing using Leaflet.

---

## Technologies Used

### **Tech Stack**

- **Main Language**: `JavaScript` (`React`)  
- **State Management**: `Zustand`  
- **Styling**: `Tailwind CSS`  
- **Image Management**: `Cloudinary` 
- **Geolocation**: `Leaflet` (for map rendering and routing)
- **End-to-End testing**: `Cypress`

---

## Tests

### Overview

The application is tested to ensure UI reliability and functionality:

- **End-to-End Tests**: User workflows, such as placing an order or managing menu items, are tested across multiple roles. (`Cypress` is used)

---

## Requirements

- **Node.js**: Version 16 or higher  
- **npm**: For dependency management  

---

## Documentation

The following documents can be found in the `/Documents` directory:

- **Design Document**: Includes architectural decisions, C4 diagrams, and frontend-specific notes.
- **Project Plan**: Outlines timelines and milestones.  

---

## Setup and Installation

### Clone the Repository:
```bash
git clone https://github.com/Samuil2004/DineMaster_FrontEnd.git
cd dinemaster_fe
```

### Install Dependencies:
```bash
npm install 
```

### Run the Application Locally:
```bash
npm run dev
```
