import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { BooksPage } from "./pages/BooksPage";
import { BookDetail } from "./pages/BookDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MyBorrowedBooks } from "./pages/MyBorrowedBooks";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AdminRoute } from "./routes/AdminRoute";
import { AdminLayout } from "./admin/AdminLayout";
import { ManageBooks } from "./admin/ManageBooks";
import { ManageLoans } from "./admin/ManageLoans";
import { ManageMembers } from "./admin/ManageMembers";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

// Component hỗ trợ tự động cuộn lên đầu trang khi chuyển Route
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cấu hình thông báo Toast toàn hệ thống */}
      <Toaster position="top-right" reverseOrder={false} />
      
      <ScrollToTop />
      
      <Layout>
        <Routes>
          {/* Public Routes - Ai cũng xem được */}
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetail />} />
          
          {/* Auth Routes - Trang đăng nhập/đăng ký */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes - Phải đăng nhập mới vào được */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/me/borrowed" element={<MyBorrowedBooks />} />
          </Route>

          {/* Admin Routes - Chỉ Admin mới vào được */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/books" replace />} />
              <Route path="books" element={<ManageBooks />} />
              <Route path="loans" element={<ManageLoans />} />
              <Route path="members" element={<ManageMembers />} />
            </Route>
          </Route>

          {/* Mặc định nếu gõ sai link thì về Trang chủ */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}