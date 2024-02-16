# Task Manager API

Task Manager API is a project that provides user and task management functionalities along with authentication using JSON Web Tokens (JWT).

## Features

- User API with operations to get all users, get a user, update user, and delete user.
- Task API with operations to get all tasks, get a task, update a task, and delete a task.
- Authentication API with features for signup, login, reset password, update password, and forgot password.
- Use error-handling middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Nodemailer

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-api.git
   
2. Create a config.env file in the root of the project and add the following environment variables:
   
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=your_mongodb_connection_string
   DATABASE_PASSWORD=your_mongodb_password
   
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   JWT_COOKIE_EXPIRES_IN=7

   EMAIL_USERNAME=your_email_username
   EMAIL_PASSWORD=your_email_password
   
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port

4. Install dependencies:
   
   ```bash
   npm install
   
6. Run the application:
   
   ```bash
   npm run start:dev

