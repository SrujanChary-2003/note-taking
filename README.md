<h1>📝 NoteNest – Full-Stack Note-Taking App</h1>
<p>A full-stack, responsive note-taking application built with React (TypeScript), Node.js (Express + TypeScript), and MongoDB, supporting Email + OTP authentication and Google Sign-In.</p>

<pre>
🌐 Live Preview (Optional)

🔗 [Live Site](https://your-deployment-url.com)

🚀 Features
✅ Sign up using Email + OTP (with validation)
✅ Sign up / Login via Google (OAuth2)
✅ JWT-based user authorization for note operations
✅ Create, view, and delete notes
✅ Mobile-responsive & matches given Figma design
✅ Proper error handling for all invalid inputs and API failures
✅ User dashboard with personal greeting and note section
✅ Secure sessions via HTTP-only cookies

🛠️ Tech Stack
📦 Backend
Node.js

Express.js (TypeScript)

MongoDB with Mongoose

JWT for authentication

Google OAuth2

Nodemailer for OTP (via Gmail or SMTP)

💻 Frontend
ReactJS with TypeScript

React Router

Axios

Tailwind CSS

React Hook Form for validations

🧑‍💻 Getting Started
⚙️ Prerequisites
Ensure you have:

Node.js v18+

npm or yarn

MongoDB Atlas or local MongoDB

Google Cloud OAuth credentials (Client ID + Secret)

</pre>
<pre>
📁 Folder Structure

project-root/
│
├── backend/ ← Express API
│ ├── src/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── index.ts
│ ├── .env
│ └── tsconfig.json
│
├── frontend/ ← React App
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── assets/
│ │ └── App.tsx
│ └── tailwind.config.ts
│
└── README.md

</pre>
<pre>
⚙️ Setup Instructions
📦 Backend Setup
bash

cd backend
npm install
Create a .env file inside /backend:

PORT=PORT_NUMBER
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=LOCALHOST_URL
EMAIL_USER=your_gmail_or_smtp_user
EMAIL_PASS=your_email_password_or_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Run the server:

bash

npm run dev
📎 Runs at: http://localhost:5000

🌐 Frontend Setup
bash

cd frontend
npm install
Create .env file inside /frontend:

VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
Start the app:

bash

npm run dev
📎 Runs at: http://localhost:5173

🔐 Authentication Flow
Signup:

Enter name, DOB, email → Request OTP → Verify OTP → Signup

Login:

Enter email, OTP → JWT stored in cookies

Or use Google Sign-In

Protected routes require a valid JWT token via HTTP-only cookies.

🧪 API Endpoints Summary
Auth:
POST /api/auth/request-otp

POST /api/auth/signup

POST /api/auth/login

GET /api/auth/get-user-by-email?email=

POST /api/auth/google

Notes:
GET /api/notes/

POST /api/notes/

DELETE /api/notes/:id

All note routes require JWT authorization.

📸 Screenshots

Signup screen

Dashboard with notes

Google sign-in

Mobile version

</pre>
