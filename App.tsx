// App.tsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
// Import LandingPage từ file index.tsx (Giao diện trang chủ)
import LandingPage from './index';
// Import các trang khác
import Books from './pages/Books';
import Members from './pages/Members';
import BorrowReturn from './pages/BorrowReturn';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import AdminSettings from './pages/Adminsetting';
import UserHome from './pages/Userhome';
import UserBooks from './pages/Userbook';
import UserBorrowed from './pages/UserBorrow';
import UserProfile from './pages/UserProfile';
import BookDetail from './pages/BookDetail';
import UserActivity from './pages/UserActivity.tsx';
import Features from './pages/Features';
import Introduction from './pages/Introduction';
import Statistics from './pages/Statistics';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';


// ✅ Sửa lại import đúng cho trang Home
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            {/* Trang landing mặc định */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<Introduction />} />
            <Route path="/stats" element={<Statistics />} />

            {/* Các trang trong layout admin */}
            <Route element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="members" element={<Members />} />
              <Route path="borrow" element={<BorrowReturn />} />
              <Route path="contact" element={<Contact />} />
              <Route path="home" element={<Home />} />
              <Route path="adminsetting" element={<AdminSettings />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />

            </Route>
            {/* trang user home*/}
            <Route path="/userhome" element={<UserHome />} />
            <Route path="/userbooks" element={<UserBooks />} />
            <Route path="/borrowed" element={<UserBorrowed />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/activity" element={<UserActivity />} />


          </Routes>
        </HashRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;