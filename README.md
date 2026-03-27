# Quản lý thư viện (Production-ready)

## 1) Cài đặt MySQL và tạo schema

Tạo database + bảng bằng file `backend/database.sql`.

```bash
# ví dụ dùng mysql cli
mysql -u root -p < backend/database.sql
```

Các bảng chính:
- `books (id, title, author, category, status, quantity, ...)`
- `members (...)`
- `borrow_history (...)`

## 2) Cấu hình Backend

```bash
cd backend
npm install
cp .env.example .env
```

Điền biến môi trường trong `backend/.env`:

```env
PORT=4000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=library_management
```

Chạy backend:

```bash
npm run dev
```

## 3) Cấu hình Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

`frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
```

## 4) API chính

- `GET /health`
- `GET /api/books?q=...`
- `POST /api/books`
- `POST /api/borrow` (check quantity > 0, trừ kho, tạo lịch sử mượn)
- `POST /api/return` (cộng lại kho, cập nhật ngày trả)
- `GET /api/borrows`
- `GET /api/statistics` (tổng sách, sách đang mượn, thành viên mới 30 ngày)
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/admin/members` (Admin only)

## 5) Thư viện mới đã dùng

- Backend: `mysql2`, `dotenv`, `cors`, `zod`, `morgan`, `express`
- Backend auth: `bcryptjs`, `jsonwebtoken`
- Frontend: `axios`, `react-hot-toast`, `tailwindcss`, `react-router-dom`, `typescript`

## 6) Migration auth

Nếu bạn muốn chạy thủ công, dùng file `backend/migrations/001_auth_users.sql`.
Hiện tại backend cũng **tự đảm bảo** bảng `users` và cột `books.cover_url` khi khởi động.

