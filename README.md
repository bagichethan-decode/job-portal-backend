# Job Portal Backend

A RESTful backend API for a Job Portal application built with Node.js, Express.js, and MySQL.

The backend supports candidate and employer workflows including authentication, job management, job applications, employer application management, and application status updates.

---

## Features

### Authentication & Authorization
- User registration
- User login
- JWT authentication
- Role-based authorization
- Candidate and Employer roles
- Protected API routes

### Candidate Features
- Browse jobs
- View job details
- Apply for jobs
- View submitted applications
- Filter applications by status
- View individual application details
- Delete applications
- View application statistics

### Employer Features
- Create jobs
- Manage employer jobs
- View applications received for employer-owned jobs
- Filter applications by status
- View application information
- Update application status
- 
### Application Status

Supported application statuses include:

- `APPLIED`
- `SHORTLISTED`
- `INTERVIEW`
- `REJECTED`
- `HIRED`

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- JWT
- bcrypt
- dotenv
- REST API
- Git & GitHub 
--
## Project Structure

```text
job-portal-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── applicationController.js
│   ├── jobController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── applicationModel.js
│   ├── jobModel.js
│   └── userModel.js
│
├── routes/
│   ├── applicationRoutes.js
│   ├── jobRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
