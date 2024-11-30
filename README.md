# Bolt: CS Messaging Web App
## Overview:
    Bolt is a simple messaging web application designed to handle customer inquiries efficiently. Built with scalability and usability in mind, this tool empowers agents to respond to customer queries effectively while ensuring streamlined team collaboration.

## Features
- Basic Features:
    - Agent Messaging Portal:
    Agents can view and respond to customer messages.
    - Multiple agents can log in simultaneously (authentication not implemented).
    - Customer API Simulation:
    Messages sent by customers are simulated via a web form and stored in the database.
    - Database Integration:
    Real customer service messages (from a provided CSV) are stored in the database and displayed on the agent portal.
    - Hosting:
    The application is hosted locally or can be deployed to a hosting service.

- Additional Features
    - Work Division:
    A system to assign messages to specific agents, preventing duplicate handling.

    - Urgency Flags:
    Messages are prioritized based on content (e.g., loan-related queries flagged as urgent).

    - Search Functionality:
    Allows agents to search incoming messages by customer name or message content.

    - Canned Responses:
    Pre-configured stock messages to enable quick replies.

    - Real-Time Updates:
    Utilizes WebSockets to display new messages to agents without refreshing the page.

## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Updates: WebSockets (Socket.io)
- Hosting: Local server / Deployed on [Your Hosting Platform]

## Setup Instructions
- Prerequisites
    - Node.js v16+ and npm installed
    - MongoDB instance running locally or on the cloud
    - Git installed

## Steps to Set Up
- Clone the Repository
```
git clone https://github.com/SoNiC-HeRE/branch-international-assignment.git
cd branch-international-assignment
```
- Install Dependencies
```
npm install
```

- Set Up the Database

```
Import the provided customer_messages.csv into your MongoDB database.
```
- Configure the MongoDB URI in the .env file:
```    
MONGODB_URI=mongodb://localhost:27017/bolt_cs_messaging
```
- Run the Application
