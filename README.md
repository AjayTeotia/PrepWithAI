# To-Do List Application

A powerful and user-friendly To-Do List application built with the **MERN stack** (MongoDB, Express.js, React, Node.js), styled using **Tailwind CSS** and **Shadcn**. This application enables users to manage tasks efficiently with features like user authentication, task management, and pinned notes.

## Features

- User authentication (login/signup)
- Create, update, and delete tasks
- Pin important tasks for easy access
- Responsive design for both mobile and desktop
- Dark mode support (if applicable)
- User-friendly interface with Tailwind CSS and Shadcn components

## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Shadcn (component library)
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)

- **State Management:** React Context API or Redux (if applicable)

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (locally or through a cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
2. Install the backend dependencies:

    ```bash
    cd backend
    npm install

3. Install the frontend dependencies:

    ```bash
    cd ../frontend
    npm install
4. Set up environment variables:

Create a .env file in the backend directory and add your MongoDB connection string and other configurations:

    ```bash
    
    MONGODB_URI=mongodb://your_mongo_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000

5. Run the development servers:

Open two terminal windows and run the following commands:

In the first terminal (for the backend):
    ```bash
    cd backend
    npm run dev

In the second terminal (for the frontend):

    ```bash
    cd frontend
    npm run start
Your application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.
    
