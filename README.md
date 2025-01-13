# User Management App

This is a user creation application with roles "user" and "admin". Depending on the role, users can access different actions and URLs within the app. To ensure security, users must log in through a Spring Security process.

- **Backend**: Java with Spring Boot.
- **Frontend**: Angular.
- **Database**: MySQL for storing user data and passwords.

## Features:
- User registration and authentication with Spring Security.
- Role-based access control (admin can manage users, users can only view).
- MySQL database for storing user information.

## Installation:
1. Clone the repository.
2. Set up MySQL database and import the schema from `db_backend_users.sql`.
3. Run the Spring Boot backend.
4. Run the Angular frontend.

Make sure to configure your database connection in the backend application.

## Technologies Used:
- Java (Spring Boot)
- Angular
- MySQL
- Spring Security
