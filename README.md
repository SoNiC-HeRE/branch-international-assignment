# Bolt: CS Messaging Web App
Bolt is a simple messaging web application designed to handle customer inquiries efficiently. Built with scalability and usability in mind, this tool empowers agents to respond to customer queries effectively while ensuring streamlined team collaboration.

## Problem Statement
In this project, you will address the challenge of handling a high volume of customer inquiries while flagging the most urgent issues. The main objective is to build a simple messaging web application for Branch that can scale with us as we grow our customer base. 


## Requirements Completed
- ☑️ Build a messaging web application that can be used to respond to incoming questions sent by our customers. The system should allow a team of agents to respond to incoming messages from (potentially many) customers in a streamlined fashion. Design the system so that multiple agents can log in at the same time and respond to incoming messages (no need to handle authentication).
- ☑️ The customer messages can be sent and received through an API endpoint which you can simulate via a simple web form.
- ☑️ We will provide a set of real customer service messages to you in a CSV file. Store these messages in a database of your choosing. These messages should then appear on the agents portal and your application should provide a way to view and respond to these individual messages as well.
- ☑️ Host your application somewhere (your machine is fine as well!).
- ☑️ Record a video of your application’s functioning and follow it up with a small code walkthrough covering only the crucial aspects. Ensure that the video is not longer than 5 - 6 minutes.

## (Advanced Requirements also covered)
- ☑️ Figure out a scheme to help agents divide work amongst themselves, and to prevent multiple agents working on the same message at once.
- ☑️ Explore ways to surface messages that are more urgent and in need of immediate attention. For example, customers who are asking about the loan approval process or when their loan will be disbursed might have more urgency than those asking how to update information on their Branch account.
- ☑️ Implement search functionality to allow agents to search over incoming messages and / or customers
- ☑️ Explore ways to surface additional information about customers (e.g. external profiles or some internal information we have about them) in the UI, to provide context to agents.
- ☑️ Implement a canned message feature that allows agents to quickly respond to enquiries using a set of pre-configured stock messages.
- ☑️ Make the agent UI (and/or the customer-facing UI) more interactive by leveraging websockets or similar technology, so that new incoming messages can show up in real time.

## Features
- Basic Features:
    - Agent Messaging Portal:
    Agents can view and respond to customer messages.
    - Multiple agents can log in simultaneously. 
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
- Frontend: React.js, SCSS
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
```
open separate terminals for client and server folders
run
    - npm i
run 
    - npm start for server and npm run dev for client
```

## Code Walkthrough



## Video Demo:




