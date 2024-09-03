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
   cd InfoTech-backend
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Create a `.env` file**:

   ```sh
   touch .env
   ```

4. **Add environment variables to the `.env` file**:

   ```env
    PORT=5000
    SECRET_KEY=MERNNMEZ
    MONGODB_URL_2024=<mongodb-url-for-2024>
    MONGODB_URL_2025=<mongodb-url-for-2025>
    MONGODB_URL_2026=<mongodb-url-for-2026>
   ```

5. **Start the development server**:
   ```sh
   npm run dev
   ```

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

1. SupportMessage
2. Assistant
3. Class
4. Student
5. User

## Routes

### Teacher Routes

1. routes/teacher/classRoutes.js: Routes for managing classes.
2. routes/teacher/feedbackRoutes.js: Routes for managing feedback.
3. routes/teacher/homeworkRoutes.js: Routes for managing homework.
4. routes/teacher/lessonRoutes.js: Routes for managing lessons.
5. routes/teacher/submissionRoutes.js: Routes for managing submissions.

### Student Routes

1. routes/student/homeRoutes.js: Routes for managing student home pages.
2. routes/student/homeworkRoutes.js: Routes for managing student homework.
3. routes/student/studentRoutes.js: Routes for managing student details.
4. routes/student/supportRoutes.js: Routes for managing student support messages.

### Guest Routes

1. routes/guest/authRoutes.js: Routes for guest authentication.
2. routes/guest/classRoutes.js: Routes for guest class details.
3. routes/guest/registerRoutes.js: Routes for guest registration.

### Assistant Routes

1. routes/assistant/userRoutes.js: Routes for managing assistant users.

### Admin Routes

1. routes/admin/assistantRoutes.js: Routes for admin managing assistants.
2. routes/admin/studentRequets.js: Routes for admin managing student requests.

## Authentication

Authentication is managed using JWT tokens. The authenticateToken middleware verifies the token and authorizeRole ensures the user has the necessary permissions.

## Testing

Add details on how to run tests, if applicable.

## Deployment

Add instructions for deploying the backend to a production environment.
