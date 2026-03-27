import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { apiErrorMessage } from "../api/client";
import { listBorrows } from "../api/library";
import { Card } from "../components/Card";
import { TableSkeleton } from "../components/Skeleton";
import { useAuth } from "../auth/AuthContext";
import type { LoanRow } from "../types";

export function MyBorrowedBooks() {
  const { payload } = useAuth();
  const memberId = payload?.memberId;

  const [rows, setRows] = useState<LoanRow[]>([]);
  const [loading, setLoading] = useState(true);

  const title = useMemo(() => "Sách tôi đang mượn", []);

  async function load() {
    setLoading(true);
    try {
      const all = await listBorrows();
      const mine = memberId ? all.filter((r: LoanRow) => r.memberId === memberId) : [];
      setRows(mine);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Danh sách các sách bạn đang mượn và hạn trả.
        </p>
      </div>

      <Card title={`Đang mượn (${rows.length})`}>
        {loading ? (
          <TableSkeleton rows={6} />
        ) : rows.length === 0 ? (
          <div className="text-sm text-slate-500">Bạn chưa mượn sách nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-2 pr-3">Sách</th>
                  <th className="py-2 pr-3">Ngày mượn</th>
                  <th className="py-2 pr-3">Hạn trả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 pr-3">{r.bookTitle}</td>
                    <td className="py-3 pr-3">{new Date(r.loanDate).toLocaleString()}</td>
                    <td className="py-3 pr-3">{new Date(r.dueDate).toLocaleDateString("vi-VN")}</td>
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

