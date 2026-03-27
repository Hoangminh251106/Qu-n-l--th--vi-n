import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="text-2xl font-black text-indigo-600 uppercase">LibraryHub</div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">Hệ thống quản lý thư viện hiện đại dành cho sinh viên IT. Kết nối tri thức, phát triển tương lai.</p>
          </div>
          <div>
            <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Khám phá</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-500">
              <li><Link to="/" className="hover:text-indigo-600 transition">Trang chủ</Link></li>
              <li><Link to="/books" className="hover:text-indigo-600 transition">Danh mục sách</Link></li>
              <li><Link to="/news" className="hover:text-indigo-600 transition">Tin tức</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-500">
              <li><Link to="/help" className="hover:text-indigo-600 transition">Hướng dẫn mượn</Link></li>
              <li><Link to="/policy" className="hover:text-indigo-600 transition">Bảo mật</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Liên hệ</h3>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>📍 123 Đường Sách, TP. HCM</li>
              <li>📞 <a href="tel:090456789" className="text-indigo-600 underline">090.456.789</a></li>
              <li>✉️ <a href="mailto:support@library.vn" className="text-indigo-600 underline">support@library.vn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-100 pt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} LibraryHub Project. Developed with ❤️ by Minh.
        </div>
      </div>
    </footer>
  );
}