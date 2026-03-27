import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";

export function Header() {
  const { isAuthed, payload, logout, role } = useAuth();
  const navigate = useNavigate();
  const name = payload?.fullName || "Thành viên";

  return (
    <header className="fixed top-0 z-[100] w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 text-2xl">📚</div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 uppercase tracking-tight">Library<span className="text-indigo-600">Hub</span></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hệ thống quản lý chuyên nghiệp</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={({isActive}) => `text-sm font-bold uppercase tracking-widest transition ${isActive ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600"}`}>Trang chủ</NavLink>
          <NavLink to="/books" className={({isActive}) => `text-sm font-bold uppercase tracking-widest transition ${isActive ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600"}`}>Kho sách</NavLink>
          {isAuthed && role === "Admin" && (
            <NavLink to="/admin" className="rounded-full bg-slate-900 px-4 py-1.5 text-[10px] font-black text-white uppercase tracking-tighter">Quản trị</NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!isAuthed ? (
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/login")} className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">Đăng nhập</button>
              <button onClick={() => navigate("/register")} className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition active:scale-95">Đăng ký</button>
            </div>
          ) : (
            <div className="flex items-center gap-4 border-l pl-4 border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-900 uppercase">{name}</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase">Đang Online</p>
              </div>
              <button onClick={() => { logout(); toast.success("Đã đăng xuất"); navigate("/"); }} className="rounded-xl bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition">Thoát</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}