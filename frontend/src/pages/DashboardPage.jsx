import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { apiErrorMessage } from "../api/client";
import { fetchStats, listBorrows, returnLoan } from "../api/library";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TableSkeleton } from "../components/Skeleton";

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    remainingBooks: 0,
    borrowedBooks: 0,
    newMembers: 0,
  });
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  const title = useMemo(() => {
    return "Dashboard";
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [s, loans] = await Promise.all([
        fetchStats(),
        listBorrows(),
      ]);
      setStats(s);
      setActiveLoans(loans);
    } catch (e) {
      toast.error(apiErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onReturn(loanId) {
    setReturningId(loanId);
    try {
      await returnLoan({ loanId });
      toast.success("Trả sách thành công");
      await load();
    } catch (e) {
      toast.error(apiErrorMessage(e));
    } finally {
      setReturningId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Thống kê nhanh và danh sách mượn đang hoạt động.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Stat label="Tổng số sách" value={stats.totalBooks} />
        <Stat label="Số sách còn lại" value={stats.remainingBooks} />
        <Stat label="Số sách đang mượn" value={stats.borrowedBooks} />
        <Stat label="Thành viên mới (30 ngày)" value={stats.newMembers} />
      </div>

      <Card
        title="Đang mượn (Active loans)"
        actions={<Button variant="secondary" onClick={load}>Làm mới</Button>}
      >
        {loading ? (
          <TableSkeleton rows={5} />
        ) : activeLoans.length === 0 ? (
          <div className="text-sm text-slate-500">Chưa có lượt mượn nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-2 pr-3">Sách</th>
                  <th className="py-2 pr-3">Người mượn</th>
                  <th className="py-2 pr-3">Ngày mượn</th>
                  <th className="py-2 pr-3">Hạn trả</th>
                  <th className="py-2 pr-3">Phí phạt</th>
                  <th className="py-2 pr-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeLoans.map((l) => (
                  <tr key={l.id} className="align-top">
                    <td className="py-3 pr-3">
                      <div className="font-medium text-slate-900">{l.bookTitle}</div>
                    </td>
                    <td className="py-3 pr-3">{l.memberName}</td>
                    <td className="py-3 pr-3">
                      <span className="text-slate-700">
                        {l.loanDate ? new Date(l.loanDate).toLocaleString() : ""}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="text-slate-700">
                        {l.dueDate ? new Date(l.dueDate).toLocaleDateString("vi-VN") : ""}
                      </span>
                    </td>
                    <td className="py-3 pr-3">
                      {l.fineAmount ? Number(l.fineAmount).toLocaleString("vi-VN") : 0} đ
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <Button
                        variant="primary"
                        disabled={returningId === l.id}
                        onClick={() => onReturn(l.id)}
                      >
                        {returningId === l.id ? "Đang trả..." : "Trả sách"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

