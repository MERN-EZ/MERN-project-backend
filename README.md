# InfoTech Backend

<div align="center" style="margin-bottom: 40px;">

  <div style="display: flex; align-items: center; justify-content: center;">
    <img src="./public/assets/logo.png" alt="InfoTech Logo" width="100" height="100">
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
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
-**cookie-parser**: Middleware to parse cookies attached to the client request object.
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
POST /guest/auth: Authenticate a guest user.
### Student Routes
GET /student/homeworks: Get homework assignments for students.
GET /student/class: Get class details for students.
GET /student/studentSupportPage: Access the support page.
GET /student: Retrieve student details.
### Teacher Routes
GET /teacher/lessons: Retrieve lessons.
GET /teacher/homework: Retrieve homework assignments.
GET /teacher/class: Get class details.
GET /teacher/submissions: Retrieve student submissions.
GET /teacher/feedback: Retrieve feedback on lessons.
### Assistant Routes
GET /assistant/users: Retrieve assistant user details.
### Admin Routes
GET /admin/assistants: Manage assistant accounts.
GET /admin/studentRequets: Manage student requests.

