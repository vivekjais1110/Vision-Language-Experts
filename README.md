# 🚀 Backend Developer Assessment (Vision Language Experts)

A backend system for managing Users and Asset Management System Specification, powered by **Node.js**, **Express**, **JWT Authentication**, and **MySQL** with **Sequelize ORM**.

📄 [(VisionTask.pdf)](https://github.com/vivekjais1110/Vision-Language-Experts/blob/main/VisionTask.pdf)

---

## 📌 Features

- 🔐 Secure User Authentication (JWT + bcrypt)
- 🧾 CRUD Operations on Tasks (Create, Read, Update, Delete)
- 📥 Express Validator for Request Validation
- 🧠 Modular Architecture with Middleware, Controllers & Routes

---

## ✨ Bonus Features

- 📈 Filter-based status data

---

## ⚙️ Setup & Installation

Make sure you have the following tools installed:

- ✅ Node.js (v12+)
- ✅ MySQL

### 🔁 Clone the Repository

```bash
git clone https://github.com/vivekjais1110/Vision-Language-Experts.git
cd Vision-Language-Experts
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Environment Configuration

Create a `.env` file in the root directory and configure:

```env
PORT=6000
JWT_SECRET=vision_language_experts
SQL_DB=vision_language_experts
SQL_USER=root
SQL_PASSWORD=root
SQL_HOST=localhost
SQL_DIALECT=mysql
```

### ▶️ Run the Server

```bash
npm start
```

---

## 🔑 Environment Variables

| Variable       | Description              |
| -------------- | ------------------------ |
| `PORT`         | Server Port              |
| `JWT_SECRET`   | JWT Signing Secret       |
| `SQL_DB`       | MySQL Database Name      |
| `SQL_USER`     | MySQL Username           |
| `SQL_PASSWORD` | MySQL Password           |
| `SQL_HOST`     | Database Host            |
| `SQL_DIALECT`  | Database Dialect (mysql) |

---

## 📱 API Endpoints

### 👤 User Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/v1/register` | Register user |
| POST   | `/api/v1/login`    | User login    |

### ✅ Task Routes

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| POST   | `/api/v1/asset_create`     | Create new task      |
| GET    | `/api/v1/assets`        | Get all tasks        |
| PUT    | `/api/v1/asset_update/:id` | Update task (status) |
| DELETE | `/api/v1/asset_delete/:id` | Delete task          |



## 🧪 Postman Collection

📢 For complete API testing, import this collection into Postman:

🔗 [vision_language_experts.postman_collection.json](https://github.com/vivekjais1110/Vision-Language-Experts/blob/main/vision_language_experts.postman_collection.json)

✅ Includes saved response examples for quick reference!

---

## 📦 Dependencies

| Library             | Use Case           |
| ------------------- | ------------------ |
| `express`           | Core web server    |
| `sequelize`         | ORM for MySQL      |
| `jsonwebtoken`      | JWT Authentication |
| `bcryptjs`          | Password hashing   |
| `express-validator` | Input validation   |

