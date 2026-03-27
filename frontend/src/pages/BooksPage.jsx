import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { apiErrorMessage } from "../api/client";
import { borrowBook, listBooks } from "../api/library";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { TableSkeleton } from "../components/Skeleton";

export function BooksPage() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [borrowState, setBorrowState] = useState({ open: false, book: null });
  const [memberId, setMemberId] = useState("");
  const [borrowing, setBorrowing] = useState(false);

  const title = useMemo(() => "Danh sách sách", []);

  async function load(nextQ = q) {
    setLoading(true);
    try {
      const data = await listBooks({ q: nextQ.trim() || undefined });
      setBooks(data);
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

  function openBorrow(book) {
    setMemberId("");
    setBorrowState({ open: true, book });
  }

  function closeBorrow() {
    setBorrowState({ open: false, book: null });
  }

  async function confirmBorrow() {
    const book = borrowState.book;
    if (!book) return;
    if (!memberId || Number(memberId) <= 0) {
      toast.error("Vui lòng nhập Member ID hợp lệ");
      return;
    }

    setBorrowing(true);
    try {
      const result = await borrowBook({
        bookId: book.id,
        memberId: Number(memberId),
      });
      const due = result?.dueDate ? new Date(result.dueDate) : null;
      const dueText = due ? due.toLocaleDateString("vi-VN") : "";
      toast.success(
        `Bạn đã mượn sách thành công, hạn trả là ngày ${dueText || "..."}.`
      );
      closeBorrow();
      await load();
    } catch (e) {
      toast.error(apiErrorMessage(e));
    } finally {
      setBorrowing(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tìm kiếm theo tiêu đề, tác giả, ISBN. Bấm “Mượn” để tạo lượt mượn mới.
        </p>
      </div>

      <Card
        title="Tìm kiếm"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => load()}>
              Làm mới
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              label="Từ khóa"
              value={q}
              placeholder="VD: Dế Mèn, Nguyễn Nhật Ánh, 978..."
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") load(e.currentTarget.value);
              }}
            />
          </div>
          <Button onClick={() => load(q)}>Tìm</Button>
        </div>
      </Card>

      <Card title={`Sách (${books.length})`}>
        {loading ? (
          <TableSkeleton rows={6} />
        ) : books.length === 0 ? (
          <div className="text-sm text-slate-500">Không có dữ liệu.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="py-2 pr-3">Tiêu đề</th>
                  <th className="py-2 pr-3">Tác giả</th>
                  <th className="py-2 pr-3">Kho</th>
                  <th className="py-2 pr-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {books.map((b) => (
                  <tr key={b.id} className="align-top">
                    <td className="py-3 pr-3">
                      <div className="font-medium text-slate-900">{b.title}</div>
                      <div className="text-xs text-slate-500">{b.categoryName || "—"}</div>
                    </td>
                    <td className="py-3 pr-3">{b.author}</td>
                    <td className="py-3 pr-3">
                      <span className="font-medium text-slate-900">{b.availableQuantity}</span>
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <Button
                        variant="primary"
                        disabled={b.availableQuantity <= 0 || b.status !== "Available"}
                        onClick={() => openBorrow(b)}
                      >
                        Mượn
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {borrowState.open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
            <div className="text-base font-semibold text-slate-900">Mượn sách</div>
            <div className="mt-1 text-sm text-slate-600">
              <span className="font-medium text-slate-900">{borrowState.book?.title}</span>
              <span className="text-slate-500"> — {borrowState.book?.author}</span>
            </div>

            <div className="mt-4">
              <Input
                label="Member ID"
                type="number"
                min={1}
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Nhập ID thành viên"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" disabled={borrowing} onClick={closeBorrow}>
                Hủy
              </Button>
              <Button disabled={borrowing} onClick={confirmBorrow}>
                {borrowing ? "Đang mượn..." : "Xác nhận"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

