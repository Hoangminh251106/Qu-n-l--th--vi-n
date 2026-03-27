import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiErrorMessage } from "../api/client";
import { fetchStats } from "../api/library";
import { Card } from "../components/Card";
import { Skeleton } from "../components/Skeleton";

export function Dashboard() {
  const [stats, setStats] = useState<{
    totalBooks: number;
    remainingBooks: number;
    borrowedBooks: number;
    newMembers: number;
  } | null>(null);

  async function load() {
    try {
      const s = await fetchStats();
      setStats(s);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Thống kê tổng quan từ hệ thống.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats ? (
          <>
            <Card title="Tổng số đầu sách">{stats.totalBooks}</Card>
            <Card title="Số sách còn lại">{stats.remainingBooks}</Card>
            <Card title="Đang mượn">{stats.borrowedBooks}</Card>
            <Card title="Thành viên mới (30 ngày)">{stats.newMembers}</Card>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="mt-3 h-8 w-24" />
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="mt-3 h-8 w-24" />
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="mt-3 h-8 w-24" />
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="mt-3 h-8 w-24" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

