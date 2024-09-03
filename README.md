# InfoTech Backend

<div align="center" style="margin-bottom: 40px;">

  <div style="display: flex; align-items: center; justify-content: center;">
    <img src="./assets/logo.png" alt="InfoTech Logo" width="100" height="100"> 
    <h1 style="margin-left: 20px;">InfoTech: Streamline Educational Processes</h1>
  </div>
</div>

## Project Overview

The InfoTech backend is designed to handle authentication, manage user roles, and interact with the MongoDB databases for an educational platform.
It provides endpoints for admins, teachers, students, assistants, and guests, managing various aspects of the platform, including user accounts, lessons, homework, and support messages.

## Technologies Used

- **Express**: A web application framework for Node.js.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv**: A module to load environment variables from a .env file.
- **cors**: Middleware to enable Cross-Origin Resource Sharing. -**cookie-parser**: Middleware to parse cookies attached to the client request object.
- **pino**: A logging library for Node.js.

## Setup

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd MERN-project-backend
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Edit the `sample.env` file and add your own details**:

   Open the `sample.env` file in a text editor and replace the placeholder values with your own details. Rename the file to `.env` once you've added your configurations.
   ```env
   # MongoDB URLs for different batches
   MONGODB_URL_2024=mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority&appName=<app-name>
   MONGODB_URL_2025=mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority&appName=<app-name>
   MONGODB_URL_2026=mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority&appName=<app-name>

   # Secret key for JWT
   SECRET_KEY=<your-secret-key>

   # Port number for the server to listen on
   PORT=5000
   ```

4. **Start the development server**:
   ```sh
   npm start
   ```

## Middleware

The following middleware functions are used in this project:

- **`authenticateToken`**: Verifies the JWT token and ensures the user is authenticated.
- **`authorizeRole`**: Checks the user's role and ensures they have the necessary permissions to access a route.
- **`logger.js`**: Logs all incoming requests and errors using `pino` for easier debugging and monitoring.
## API Endpoints

### Guest Routes

1. POST /guest/register: Register a new guest.
2. GET /guest/classes: Retrieve available classes.
3. POST /guest/auth: Authenticate a guest user.

### Student Routes

1. GET /student/homeworks: Get homework assignments for students.
2. GET /student/class: Get class details for students.
3. GET /student/studentSupportPage: Access the support page.
4. GET /student: Retrieve student details.

### Teacher Routes

1. GET /teacher/lessons: Retrieve lessons.
2. GET /teacher/homework: Retrieve homework assignments.
3. GET /teacher/class: Get class details.
4. GET /teacher/submissions: Retrieve student submissions.
5. GET /teacher/feedback: Retrieve feedback on lessons.

### Assistant Routes

1. GET /assistant/users: Retrieve assistant user details.

### Admin Routes

1. GET /admin/assistants: Manage assistant accounts.
2. GET /admin/studentRequets: Manage student requests.

## Models

Defines the structure of the Roles in MongoDB.

1. Assistant
2. Attendance
3. Class
4. Lesson
4. Student
5. SupportMessage
1. User

## Authentication

Authentication is managed using JWT tokens. The authenticateToken middleware verifies the token and authorizeRole ensures the user has the necessary permissions.

## Conclusion

The InfoTech backend is the backbone of the educational platform, ensuring secure and efficient management of user data, role-based access control, and seamless integration with MongoDB databases. With robust API endpoints and middleware for authentication and authorization, the backend is designed to handle the complex needs of an educational environment.


