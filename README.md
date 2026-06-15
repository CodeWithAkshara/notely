# 📝 Notely

A modern full-stack Notes Application built using the MERN stack. Notely helps users create, organize, archive, favorite, and manage notes efficiently with secure authentication and a responsive user interface.

## 🚀 Features

### User Features

* User Registration & Login
* JWT Authentication
* Create Notes
* Edit Notes
* Delete Notes
* Archive Notes
* Restore Notes
* Favorite Notes
* Search Notes
* Dark/Light Theme
* Responsive Design

### Admin Features

* Separate Admin Authentication
* CSRF-Protected Admin Access
* View All Users' Notes
* Protected Admin APIs

### Security Features

* JWT-based Authentication
* HTTP-only Cookies
* CSRF Protection
* Protected Routes
* Secure Admin Endpoints

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## 📂 Project Structure

```bash
notes-app/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/CodeWithAkshara/notely.git
cd notely
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

Run backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Admin Flow

1. Admin logs in using the dedicated Admin Login API.
2. Admin receives a CSRF token.
3. Admin can access protected admin endpoints.
4. Admin can view all notes across users.

## 📱 Responsive Design

The application is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

## 👩‍💻 Author

**Akshara Jaiswal**

GitHub: https://github.com/CodeWithAkshara
