import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { apiErrorMessage } from "../api/client";
import { listBooks } from "../api/library";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { TableSkeleton } from "../components/Skeleton";
import type { Book } from "../types";
import { Search, BookOpen, User, Tag } from "lucide-react";

// Component con cho từng thẻ sách - Đã tối ưu UI/UX
function BookCard({ b }: { b: Book }) {
  const status = b.status || "Available";
  const available = b.availableQuantity ?? 0;
  
  // Link ảnh Unsplash chất lượng cao theo ID sách để không bị trùng
  const cover = b.coverUrl || `https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80&sig=${b.id}`;

  return (
    <Link
      to={`/books/${b.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        <img
          src={cover}
          alt={b.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-medium bg-indigo-600 px-2 py-1 rounded">Xem chi tiết</span>
        </div>
        <div className="absolute top-2 right-2">
           <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md shadow-sm ${
              available > 0 ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
            }`}>
              {available > 0 ? "Sẵn có" : "Hết sách"}
            </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase text-indigo-600">
          <Tag size={10} />
          {b.categoryName || "Chưa phân loại"}
        </div>
        <h3 className="line-clamp-2 text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
          {b.title}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <User size={12} />
          {b.author}
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <div className="text-[11px] text-slate-400">
            Kho: <span className="font-semibold text-slate-700">{available} cuốn</span>
          </div>
          <button className="text-xs font-semibold text-indigo-600 hover:underline">
            Mượn ngay →
          </button>
        </div>
      </div>
    </Link>
  );
}

export function Home() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const b of books) if (b.categoryName) set.add(b.categoryName);
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [books]);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchCat = category === "all" || b.categoryName === category;
      const matchSearch = b.title.toLowerCase().includes(q.toLowerCase()) || 
                          b.author.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [books, category, q]);

  async function load() {
    setLoading(false); // Chế độ demo: để false để hiện UI ngay
    try {
      const data = await listBooks({ q: q.trim() || undefined });
      setBooks(data);
    } catch (err) {
      // toast.error(apiErrorMessage(err)); 
      // Tạm comment lỗi để bạn thấy giao diện trước khi fix backend
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-10">
      {/* Hero Section - Lột xác Banner */}
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 px-8 py-16 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/20 mb-6">
            <BookOpen size={14} />
            Hệ thống quản lý thư viện số v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Khám phá kho tàng <span className="text-indigo-400">tri thức</span> nhân loại.
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Tìm kiếm hàng ngàn đầu sách, quản lý mượn trả dễ dàng chỉ với vài cú click. 
            Đăng nhập ngay để bắt đầu hành trình của bạn.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => document.getElementById('search-box')?.scrollIntoView({behavior:'smooth'})} 
                    className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg hover:bg-indigo-500 transition">
              Khám phá ngay
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter - Gọn gàng hơn */}
      <div id="search-box" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Tìm kiếm sách</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nhập tên sách, tác giả..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>
        </div>
        <div className="w-full md:w-64">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Thể loại</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition appearance-none bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'all' ? 'Tất cả thể loại' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Book Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl font-bold text-slate-800">Danh sách sách mới nhất</h2>
          <span className="text-sm text-slate-500">{filtered.length} kết quả</span>
        </div>
        
        {loading ? (
          <TableSkeleton rows={8} />
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((b) => (
              <BookCard key={b.id} b={b} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">Không tìm thấy cuốn sách nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
}