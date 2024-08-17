# Google Authentication Login Feature

This project implements a Google Authentication login feature with a frontend login page. The system allows users to authenticate via their Google accounts and access protected resources based on their assigned roles.

## Features

### 1. Google OAuth 2.0 Integration
- Users can log in using their Google accounts.
- OAuth 2.0 authentication flow is handled by the Google Authentication API.
- After successful login, users are redirected to the Dashboard page.

### 2. JSON Web Token (JWT) Authentication
- Upon successful authentication, a JWT is generated and stored in the user's browser cookies.
- The JWT is used to authenticate subsequent requests to protected resources.

### 3. Role-Based Access Control (RBAC)
- The system supports role-based access control, allowing users to have different roles with specific permissions.
- User roles and their associated resources are fetched from the database and are used to control access to different parts of the application.

### 4. Refresh Token Mechanism
- A refresh token is issued alongside the JWT, allowing the user to request a new JWT without re-authenticating.
- The refresh token is stored in cookies and used to maintain user sessions.

### 5. Middleware for Protected Routes
- Middleware ensures that only authenticated users with valid JWTs can access protected routes.
- Users without a valid JWT are redirected to the login page.

### 6. Frontend Login Page
- A simple and intuitive login page that allows users to initiate Google OAuth 2.0 login.
- The frontend is built with modern web technologies (e.g., React.js) and communicates with the backend via API calls.

### 7. Logging and Error Handling
- Logs are generated for key events, such as authentication failures and unauthorized access attempts.
- Comprehensive error handling ensures that users receive appropriate feedback in case of issues.

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your system.
- MySQL database setup with the required tables (`master_students`, `user_roles_mapping`, `master_resources`, `roles_resources_mapping`).

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/PragaL15/LoginPage-G-auth-
   
