# Paassword Vault Manager App

Welcome to the Paassword Vault Manager app! This README will guide you through the setup and usage of our password management application.

## Tech Stack

- Frontend:
  - React
  - React Redux
  - React Query

- Backend:
  - Node.js
  - Express.js
  - Mongoose (MongoDB ORM)

- Encryption:
  - Argon2 (Password hashing)

## Purpose

The primary purpose of this project is that we are not trusting our server with anything .It provide a secure and reliable password management solution. In the digital age, ensuring the security of sensitive information like passwords is paramount.Therefore at the client side only I am hashing password and then new hashed password is being sent to the server.

### Key Features

- Client-side encryption: Passwords are encrypted at the client-side before being transmitted to the server. This ensures that even if the server is compromised, the passwords remain encrypted and secure.
  
- Password hashing: Passwords are hashed using Argon2 before being stored in the database. This provides an additional layer of security, making it extremely difficult for attackers to retrieve the original passwords even if they gain access to the database.

## Getting Started

To get started with the Paassword Vault Manager app, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vbvsingh29/paassword-vault.git

cd paassword-vault

# Install backend dependencies

```bash
cd server
yarn 
```
# From the server directory, to start server
```bash
yarn dev
```

# Install frontend dependencies
```bash
cd ../client
yarn 
```
# From Client directory 
```bash
yarn start
```
## Environment Variables

### Backend
- `PORT`: The port on which the backend server will run.
- `DB_URI`: The URI of the MongoDB database.
- `CORS_ORIGIN`: CLient side domain (Cross-Origin Resource Sharing).
- `PUBLIC_KEY`: The public key for JWT token verification.
- `PRIVATE_KEY`: The private key for JWT token signing.

### Frontend (JavaScript Syntax)
- `REACT_APP_API_ENDPOINT`: Server Side Domain 

