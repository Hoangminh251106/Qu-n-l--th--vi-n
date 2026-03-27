import { useMemo, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { apiErrorMessage } from "../api/client";
import { createBook, listBorrows, returnLoan } from "../api/library";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TableSkeleton } from "../components/Skeleton";

export function AdminPage() {
  const title = useMemo(() => "Quản lý (Admin)", []);
  const [form, setForm] = useState({
    title: "",
    author: "",
    categoryId: "",
    status: "Available",
    totalQuantity: 1,
  });
  const [saving, setSaving] = useState(false);
  const [borrowRows, setBorrowRows] = useState([]);
  const [loadingBorrows, setLoadingBorrows] = useState(true);
  const [returningId, setReturningId] = useState(null);

  async function loadBorrows() {
    setLoadingBorrows(true);
    try {
      const rows = await listBorrows();
      setBorrowRows(rows);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoadingBorrows(false);
    }
  }

  useEffect(() => {
    loadBorrows();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.categoryId) {
      toast.error("Vui lòng nhập đầy đủ Tiêu đề, Tác giả, Category ID");
      return;
    }
    if (Number(form.totalQuantity) < 0) {
      toast.error("Số lượng không được âm");
      return;
    }

    setSaving(true);
    try {
      await createBook({
        title: form.title.trim(),
        author: form.author.trim(),
        categoryId: Number(form.categoryId),
        status: form.status,
        totalQuantity: Number(form.totalQuantity),
        availableQuantity: Number(form.totalQuantity),
      });
      toast.success("Thêm sách thành công");
      setForm({ title: "", author: "", categoryId: "", status: "Available", totalQuantity: 1 });
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function onReturnBorrow(loanId) {
    setReturningId(loanId);
    try {
      const result = await returnLoan({ loanId });
      const fine = result?.fineAmount ? Number(result.fineAmount) : 0;
      toast.success(
        fine > 0
          ? `Trả sách thành công. Phí phạt: ${fine.toLocaleString("vi-VN")} đ`
          : "Trả sách thành công"
      );
      await loadBorrows();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setReturningId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Thêm sách mới vào hệ thống (CRUD sách ở backend).
        </p>
      </div>

      <Card title="Thêm sách mới">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Tiêu đề"
              value={form.title}
              onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
              placeholder="VD: Dế Mèn Phiêu Lưu Ký"
              required
            />
          </div>
          <Input
            label="Tác giả"
            value={form.author}
            onChange={(e) => setForm((s) => ({ ...s, author: e.target.value }))}
            placeholder="VD: Tô Hoài"
            required
          />
          <Input
            label="Category ID"
            value={form.categoryId}
            onChange={(e) => setForm((s) => ({ ...s, categoryId: e.target.value }))}
            placeholder="VD: 1"
            required
          />
          <label className="block">
            <div className="mb-1 text-sm font-medium text-slate-700">Trạng thái</div>
            <select
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option value="Available">Available</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </label>
          <Input
            label="Số lượng (total)"
            type="number"
            min={0}
            value={form.totalQuantity}
            onChange={(e) => setForm((s) => ({ ...s, totalQuantity: e.target.value }))}
            required
          />
          <div className="sm:col-span-2 flex justify-end">
            <Button disabled={saving} type="submit">
              {saving ? "Đang lưu..." : "Thêm sách"}
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Quản lý đơn mượn sách" actions={<Button variant="secondary" onClick={loadBorrows}>Làm mới</Button>}>
        {loadingBorrows ? (
          <TableSkeleton rows={6} />
        ) : borrowRows.length === 0 ? (
          <div className="text-sm text-slate-500">Chưa có đơn mượn.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-2 pr-3">Sách</th>
                  <th className="py-2 pr-3">Thành viên</th>
                  <th className="py-2 pr-3">Ngày mượn</th>
                  <th className="py-2 pr-3">Hạn trả</th>
                  <th className="py-2 pr-3">Phí phạt</th>
                  <th className="py-2 pr-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {borrowRows.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 pr-3">{r.bookTitle}</td>
                    <td className="py-3 pr-3">{r.memberName}</td>
                    <td className="py-3 pr-3">
                      {r.loanDate ? new Date(r.loanDate).toLocaleString() : ""}
                    </td>
                    <td className="py-3 pr-3">
                      {r.dueDate ? new Date(r.dueDate).toLocaleDateString("vi-VN") : ""}
                    </td>
                    <td className="py-3 pr-3">
                      {r.fineAmount ? Number(r.fineAmount).toLocaleString("vi-VN") : 0} đ
                    </td>
                    <td className="py-3 pr-3 text-right">
                      {r.status === "Borrowed" || r.status === "Overdue" ? (
                        <Button
                          disabled={returningId === r.id}
                          onClick={() => onReturnBorrow(r.id)}
                        >
                          {returningId === r.id ? "Đang trả..." : "Trả sách"}
                        </Button>
                      ) : (
                        <span className="text-slate-500">Đã trả</span>
                      )}
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

