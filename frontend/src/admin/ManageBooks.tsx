import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiErrorMessage } from "../api/client";
import { createBook, listBooks } from "../api/library";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { TableSkeleton } from "../components/Skeleton";
import type { Book } from "../types";

export function ManageBooks() {
  const [rows, setRows] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    categoryId: "",
    totalQuantity: 1,
  });

  async function load() {
    setLoading(true);
    try {
      const data = await listBooks();
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

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createBook({
        title: form.title.trim(),
        author: form.author.trim(),
        categoryId: Number(form.categoryId),
        totalQuantity: Number(form.totalQuantity),
        availableQuantity: Number(form.totalQuantity),
        status: "Available",
      });
      toast.success("Tạo sách thành công");
      setForm({ title: "", author: "", categoryId: "", totalQuantity: 1 });
      await load();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card title="Tạo sách">
        <form onSubmit={onCreate} className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:items-end">
          <Input
            label="Tiêu đề"
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            required
          />
          <Input
            label="Tác giả"
            value={form.author}
            onChange={(e) => setForm((s) => ({ ...s, author: e.target.value }))}
            required
          />
          <Input
            label="Category ID"
            type="number"
            min={1}
            value={form.categoryId}
            onChange={(e) => setForm((s) => ({ ...s, categoryId: e.target.value }))}
            required
          />
          <Input
            label="Số lượng"
            type="number"
            min={0}
            value={form.totalQuantity}
            onChange={(e) => setForm((s) => ({ ...s, totalQuantity: Number(e.target.value) }))}
            required
          />
          <div className="sm:col-span-4 flex justify-end">
            <Button disabled={saving} type="submit">
              {saving ? "Đang lưu..." : "Thêm sách"}
            </Button>
          </div>
        </form>
      </Card>

      <Card title={`Danh sách sách (${rows.length})`} actions={<Button variant="secondary" onClick={load}>Làm mới</Button>}>
        {loading ? (
          <TableSkeleton rows={7} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-2 pr-3">ID</th>
                  <th className="py-2 pr-3">Tiêu đề</th>
                  <th className="py-2 pr-3">Tác giả</th>
                  <th className="py-2 pr-3">Category</th>
                  <th className="py-2 pr-3">Còn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 pr-3">{b.id}</td>
                    <td className="py-3 pr-3">{b.title}</td>
                    <td className="py-3 pr-3">{b.author}</td>
                    <td className="py-3 pr-3">{b.categoryName || b.category_id}</td>
                    <td className="py-3 pr-3">{b.availableQuantity ?? 0}</td>
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

