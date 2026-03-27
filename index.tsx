import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// 👈 THÊM: Import hook điều hướng
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Search, TrendingUp, Award, Heart, Menu, X, LogIn, UserPlus, Shield, User } from 'lucide-react';
// 👈 THÊM: Import component App để khởi động Router
import App from './App';

// Thành phần Card Feature (giữ nguyên)
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]">
    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'
  const [isLogin, setIsLogin] = useState(true); // true for login, false for register
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 👈 SỬA 1: Khởi tạo hook useNavigate
  const navigate = useNavigate();

  const openLoginModal = (type) => {
    setLoginType(type);
    setIsLogin(true);
    setShowLoginModal(true);
  };

  const openRegisterModal = (type) => {
    setLoginType(type);
    setIsLogin(false);
    setShowLoginModal(true);
  };

  // 👈 SỬA 2: Thêm hàm xử lý đăng nhập và chuyển hướng
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // ⚠️ Thêm logic xác thực thực tế ở đây

    // Giả định Đăng nhập Admin thành công
    if (loginType === 'admin') {
      console.log('Admin login successful. Redirecting to /Home.');
      // 🚨 KÍCH HOẠT CHUYỂN HƯỚNG SANG TRANG Home
      navigate('/Home');
      setShowLoginModal(false);

    }
    // Giả định Đăng nhập User thành công
    else if (loginType === 'user') {
      console.log('User login successful. Redirecting to UserHome...');
      navigate('/UserHome'); // ← chuyển đúng tới file UserHome.tsx
      setShowLoginModal(false);
    }
  };

  return (
    // TOÀN BỘ GIAO DIỆN CỦA BẠN (GIỮ NGUYÊN)
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">LMS</span>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Tính năng</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium">Giới thiệu</a>
              <a href="#stats" className="text-gray-600 hover:text-blue-600 font-medium">Thống kê</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium">Liên hệ</a>
            </nav>
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => openLoginModal('user')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Đăng nhập</span>
              </button>
              <button
                onClick={() => openRegisterModal('user')}
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition"
              >
                <UserPlus className="w-5 h-5" />
                <span>Đăng ký</span>
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg pb-4">
            {/* Mobile Menu Items */}
            <div className="px-4 pt-2 space-y-2">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600">Tính năng</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600">Giới thiệu</a>
              <a href="#stats" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600">Thống kê</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600">Liên hệ</a>
              <hr className="my-2" />
              <button
                onClick={() => { openLoginModal('user'); setIsMenuOpen(false); }}
                className="w-full text-left flex items-center space-x-2 py-2 text-blue-600 hover:text-blue-800 font-medium transition"
              >
                <LogIn className="w-5 h-5" />
                <span>Đăng nhập</span>
              </button>
              <button
                onClick={() => { openRegisterModal('user'); setIsMenuOpen(false); }}
                className="w-full text-left flex items-center space-x-2 py-2 bg-blue-600 text-white px-4 rounded-full font-medium hover:bg-blue-700 transition"
              >
                <UserPlus className="w-5 h-5" />
                <span>Đăng ký</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
            Khám Phá <span className="text-blue-600">Thư Viện Số</span> Trực Tuyến
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Hệ thống quản lý thư viện hiện đại, cho phép bạn mượn, trả sách và quản lý thành viên một cách dễ dàng và hiệu quả.
          </p>
          <div id="stats" className="bg-white dark:bg-gray-800 inline-block px-6 py-3 rounded-full shadow-xl mb-10">
            <p className="text-2xl font-bold text-green-600">10,000+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Đầu sách đa dạng</p>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => openRegisterModal('user')}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Đăng ký miễn phí
            </button>
            <button
              onClick={() => openLoginModal('user')}
              className="bg-transparent border border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition"
            >
              Đăng nhập ngay
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Tính Năng Nổi Bật của Hệ Thống
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Search} title="Tìm kiếm thông minh" description="Tìm kiếm sách, tài liệu nhanh chóng bằng từ khóa, tác giả, hoặc thể loại. Hỗ trợ lọc nâng cao." />
            <FeatureCard icon={BookOpen} title="Mượn sách online" description="Đặt mượn sách trực tuyến và theo dõi tình trạng mượn/trả ngay trên tài khoản của bạn." />
            <FeatureCard icon={Users} title="Quản lý thành viên" description="Quản lý thông tin độc giả, thẻ thành viên, lịch sử mượn trả và các khoản phí phạt (nếu có)." />
            <FeatureCard icon={TrendingUp} title="Thống kê & Báo cáo" description="Cung cấp các biểu đồ trực quan về lượng sách, số lượng thành viên, và tần suất mượn trả." />
            <FeatureCard icon={Award} title="Bảng xếp hạng" description="Theo dõi top sách được mượn nhiều nhất và top độc giả tích cực nhất trong thư viện." />
            <FeatureCard icon={Heart} title="Danh sách yêu thích" description="Lưu lại những đầu sách muốn đọc để không bỏ lỡ bất kỳ tài liệu thú vị nào." />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Về Thư Viện Số LMS
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                Chúng tôi xây dựng LMS với sứ mệnh mang tri thức đến gần hơn với mọi người. Với giao diện thân thiện, dễ sử dụng, hệ thống giúp việc quản lý thư viện trở nên đơn giản và hiệu quả hơn bao giờ hết.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Đầu Sách</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">5K+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Thành Viên</p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Lượt Mượn</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Placeholder for an image or illustration */}
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                alt="Thư viện"
                className="w-full max-w-xl h-auto object-cover rounded-xl shadow-lg"
              />

            </div>
          </div>

        </section>

        {/* User Types Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Bạn Là Ai?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-blue-600">
              <User className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Người Dùng</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Độc giả, thành viên thư viện. Truy cập vào kho sách, quản lý lịch sử mượn trả và danh sách yêu thích cá nhân.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => openLoginModal('user')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => openRegisterModal('user')}
                  className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition"
                >
                  Đăng ký
                </button>
              </div>
            </div>

            {/* Admin Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-cyan-600">
              <Shield className="w-10 h-10 text-cyan-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Quản Trị Viên</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Nhân viên quản lý thư viện. Truy cập vào Dashboard, quản lý toàn bộ sách, thành viên và giao dịch mượn trả.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => openLoginModal('admin')}
                  className="bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-700 transition"
                >
                  Đăng nhập Admin
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 text-center bg-blue-600 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Đăng ký ngay hôm nay để trở thành một phần của cộng đồng tri thức lớn nhất!
          </p>
          <button
            onClick={() => openRegisterModal('user')}
            className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-blue-100 transform hover:scale-105 transition-all"
          >
            Đăng Ký Miễn Phí Ngay!
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                <span>LMS</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Nền tảng quản lý thư viện số hiện đại và hiệu quả.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Liên kết nhanh</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Tính năng</a></li>
                <li><a href="#about" className="hover:text-white transition">Giới thiệu</a></li>
                <li><a href="#contact" className="hover:text-white transition">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white transition">Chính sách bảo mật</a></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Liên hệ</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: contact@lms.com</li>
                <li>Hotline: 0123 456 789</li>
                <li>Địa chỉ: 109 Nguyễn Xí, Bình Thạnh</li>
              </ul>
            </div>
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Theo dõi</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/16PfkHoryN/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0 0 22 12z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.1 12.1 0 0 1 3.1 4.9a4.28 4.28 0 0 0 1.32 5.7 4.2 4.2 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56A8.7 8.7 0 0 0 22.46 6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LMS. All rights reserved.
          </div>
        </div>
      </footer>

      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-2">
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
              {loginType === 'admin' ? 'Quản trị viên' : 'Thành viên thư viện'}
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = form.fullname?.value;
                const username = form.username?.value;
                const password = form.password?.value;
                const confirmPassword = form.confirmPassword?.value;

                if (!isLogin) {
                  if (!name) {
                    alert('Vui lòng nhập họ tên.');
                    return;
                  }
                  if (password !== confirmPassword) {
                    alert('Mật khẩu xác nhận không khớp.');
                    return;
                  }

                  alert('Đăng ký thành công!');
                  setTimeout(() => {
                    setIsLogin(true);
                  }, 1000);
                  return;
                }

                // Đăng nhập
                if (isLogin && loginType === 'user') {
                  localStorage.setItem('userToken', 'fake-user-token');
                  localStorage.setItem('userName', name || 'Thành viên');
                  navigate('/UserHome');
                  setShowLoginModal(false);
                  return;
                }

                if (isLogin && loginType === 'admin') {
                  localStorage.setItem('adminToken', 'fake-admin-token');
                  localStorage.setItem('adminName', name || 'Quản trị viên');
                  navigate('/home');
                  setShowLoginModal(false);
                  return;
                }
              }}
            >
              {/* Full Name Input (only for Register) */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              )}

              {/* Username or Email */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {loginType === 'admin' ? 'Tên đăng nhập' : 'Địa chỉ Email'}
                </label>
                <input
                  type={loginType === 'admin' ? 'text' : 'email'}
                  id="username"
                  name="username"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Confirm Password (only for Register) */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
              </button>

              {/* Switch to Register/Login */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </p>

              {/* Social Login (User only) */}
              {loginType === 'user' && isLogin && (
                <div className="relative mt-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Hoặc
                    </span>
                  </div>
                </div>
              )}
            </form>

            {/* Switch User Type buttons */}
            {loginType === 'user' && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setLoginType('admin');
                    setIsLogin(true);
                  }}
                  className="text-sm text-gray-600 hover:text-blue-600 transition flex items-center justify-center space-x-2 mx-auto"
                >
                  <Shield className="w-4 h-4" />
                  <span>Đăng nhập với tư cách quản trị viên</span>
                </button>
              </div>
            )}

            {loginType === 'admin' && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setLoginType('user');
                    setIsLogin(true);
                  }}
                  className="text-sm text-gray-600 hover:text-blue-600 transition flex items-center justify-center space-x-2 mx-auto"
                >
                  <User className="w-4 h-4" />
                  <span>Đăng nhập với tư cách người dùng</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};



const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
export default LandingPage;