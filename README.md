<div align="center">

# 💊 MediStore — Backend API

### REST API for Online Medical Store — Bangladesh

**Robust and scalable backend API powering MediStore — handling medicine management, user authentication, role-based access, and order processing.**

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-7-47A248?style=for-the-badge&logo=PostgreSQL)](https://www.PostgreSQL.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://medi-store-frontend-seven.vercel.app/)

[🌐 Live Frontend](https://medi-store-frontend-seven.vercel.app/) · [🐛 Report Bug](https://github.com/your-username/medi-store-backend/issues) · [✨ Request Feature](https://github.com/your-username/medi-store-backend/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Roles & Permissions](#-roles--permissions)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🏥 About

**MediStore Backend** is a RESTful API built with **Node.js**, **Express**, and **PostgreSQL**. It serves as the backbone of the MediStore platform — an online medical store for Bangladesh. The API handles everything from user authentication and medicine listings to order processing and admin management, with full **role-based access control** for Users, Manufacturers, and Admins.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register, login & protected routes
- 👥 **Role-Based Access Control** — User / Manufacturer / Admin roles
- 💊 **Medicine Management** — Full CRUD for medicines by manufacturers
- 🛒 **Order Processing** — Place, track, and manage orders
- 🛡 **Admin Panel API** — Manage users, medicines, and all orders
- 🌍 **CORS Configured** — Ready for frontend integration
- 📦 **Mongoose ODM** — Clean PostgreSQL schema design
- ⚡ **RESTful Design** — Clean, consistent API structure

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **PostgreSQL** | MySQL Database |
| **Prisma** | Prisma ORM |
| **JWT** | Authentication & authorization |
| **bcrypt** | Password hashing |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin resource sharing |


---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm / yarn
- PostgreSQL Atlas account or local PostgreSQL

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/medi-store-backend.git
cd medi-store-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Fill in the required values (see [Environment Variables](#-environment-variables)).

4. **Start the development server**

```bash
npm run dev
```

Server runs on → `http://localhost:5000`

---

## 📁 Project Structure

```
medi-store-backend/
├── src/
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── role.middleware.js    # Role-based access
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Medicine.js           # Medicine schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── auth.routes.js        # Auth routes
│   │   ├── medicine.routes.js    # Medicine routes
│   │   ├── order.routes.js       # Order routes
│   │   ├── user.routes.js        # User routes
│   │   └── admin.routes.js       # Admin routes
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── medicine.controller.js
│   │   ├── order.controller.js
│   │   ├── user.controller.js
│   │   └── admin.controller.js
│   └── utils/
│       └── helpers.js
├── server.js                     # Entry point
├── .env.example
├── .gitignore
└── package.json
```

---

## 📡 API Endpoints

### 🔐 Auth
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user info | Auth |

### 💊 Medicines
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/medicines` | Get all medicines | Public |
| GET | `/api/medicines/:id` | Get single medicine | Public |
| POST | `/api/medicines` | Add new medicine | Manufacturer |
| PUT | `/api/medicines/:id` | Update medicine | Manufacturer |
| DELETE | `/api/medicines/:id` | Delete medicine | Manufacturer |
| GET | `/api/medicines/my` | Get my medicines | Manufacturer |

### 🛒 Orders
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/orders` | Place new order | User |
| GET | `/api/orders/my` | Get my orders | User |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

### 👥 Users
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id/role` | Update user role | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### 🛡 Admin
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats | Admin |
| GET | `/api/admin/medicines` | All medicines overview | Admin |
| PUT | `/api/admin/medicines/:id` | Manage any medicine | Admin |

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# PostgreSQL
PostgreSQL_URI=PostgreSQL+srv://username:password@cluster.PostgreSQL.net/medistore

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
CLIENT_URL=https://medi-store-frontend-seven.vercel.app
```

> ⚠️ Never commit `.env` to version control.

---

## 👥 Roles & Permissions

| Permission | User | Manufacturer | Admin |
|---|---|---|---|
| Browse medicines | ✅ | ✅ | ✅ |
| Place orders | ✅ | ✅ | ✅ |
| View own orders | ✅ | ✅ | ✅ |
| Add medicines | ❌ | ✅ | ✅ |
| Manage own medicines | ❌ | ✅ | ✅ |
| View all orders | ❌ | ❌ | ✅ |
| Manage all users | ❌ | ❌ | ✅ |
| Update order status | ❌ | ❌ | ✅ |
| Full platform access | ❌ | ❌ | ✅ |

---

## 📦 Available Scripts

```bash
# Start development server (with nodemon)
npm run dev

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🌐 Deployment

The backend can be deployed on **Render**, **Railway**, **Vercel**, or any Node.js-compatible server.

### Deploy on Render
1. Connect your GitHub repo on [Render](https://render.com/)
2. Set **Build Command** → `npm install`
3. Set **Start Command** → `npm start`
4. Add all environment variables
5. Deploy!

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📞 Related

| | Link |
|---|---|
| 🌐 Frontend Live | [medi-store-frontend-seven.vercel.app](https://medi-store-frontend-seven.vercel.app/) |
| 💻 Frontend Repo | [medi-store-frontend](https://github.com/your-username/medi-store-frontend) |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for healthier communities in Bangladesh

**[⬆ Back to top](#-medistore--backend-api)**

</div>
