\# Job Portal Backend



A RESTful backend for a job application tracking platform built with Node.js, Express.js, and MySQL.



\## Features



\- User registration and login

\- JWT-based authentication

\- Job creation and listing

\- Job search and filtering

\- Pagination

\- Job applications

\- Duplicate application prevention

\- Application status management

\- Application status filtering

\- Application statistics

\- User-specific application access

\- Application deletion

\- MySQL relational database



\## Tech Stack



\- Node.js

\- Express.js

\- MySQL

\- JWT

\- bcrypt

\- REST API

\- Git \& GitHub



\## API Structure



\### Authentication



`POST /api/users/register`



`POST /api/users/login`



\### Jobs



`GET /api/jobs`



`GET /api/jobs?location=Bengaluru`



`GET /api/jobs?page=1\&limit=10`



\### Applications



`POST /api/applications`



`GET /api/applications`



`GET /api/applications/:id`



`GET /api/applications/stats`



`GET /api/applications?status=SHORTLISTED`



`PUT /api/applications/:id/status`



`DELETE /api/applications/:id`



\## Application Statuses



\- APPLIED

\- SHORTLISTED

\- INTERVIEW

\- REJECTED

\- OFFERED



\## Database



The application uses MySQL with relational tables for:



\- Users

\- Jobs

\- Applications



Applications maintain relationships between users and jobs through foreign keys.





