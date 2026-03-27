import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiErrorMessage } from "../api/client";
import { listBorrows, returnLoan } from "../api/library";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { TableSkeleton } from "../components/Skeleton";
import type { LoanRow } from "../types";

export function ManageLoans() {
  const [rows, setRows] = useState<LoanRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data = await listBorrows();
      setRows(data);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onConfirmReturn(loanId: number) {
    setReturningId(loanId);
    try {
      const res = await returnLoan({ loanId });
      const fine = res?.fineAmount ? Number(res.fineAmount) : 0;
      toast.success(
        fine > 0
          ? `Trả sách thành công. Phí phạt: ${fine.toLocaleString("vi-VN")} đ`
          : "Trả sách thành công"
      );
      await load();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setReturningId(null);
    }
  }

  return (
    <Card title="Manage Loans" actions={<Button variant="secondary" onClick={load}>Làm mới</Button>}>
      {loading ? (
        <TableSkeleton rows={7} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Sách</th>
                <th className="py-2 pr-3">Thành viên</th>
                <th className="py-2 pr-3">Hạn trả</th>
                <th className="py-2 pr-3">Trạng thái</th>
                <th className="py-2 pr-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 pr-3">{r.id}</td>
                  <td className="py-3 pr-3">{r.bookTitle}</td>
                  <td className="py-3 pr-3">{r.memberName}</td>
                  <td className="py-3 pr-3">
                    {r.dueDate ? new Date(r.dueDate).toLocaleDateString("vi-VN") : ""}
                  </td>
                  <td className="py-3 pr-3">{r.status}</td>
                  <td className="py-3 pr-3 text-right">
                    <Button
                      disabled={returningId === r.id}
                      onClick={() => onConfirmReturn(r.id)}
                    >
                      {returningId === r.id ? "Đang cập nhật..." : "Xác nhận trả"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

