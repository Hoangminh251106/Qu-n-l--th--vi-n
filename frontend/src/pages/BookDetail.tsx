import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { apiErrorMessage } from "../api/client";
import { borrowBook, listBooks } from "../api/library";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { useAuth } from "../auth/AuthContext";
import type { Book } from "../types";

export function BookDetail() {
  const { id } = useParams();
  const bookId = Number(id);
  const navigate = useNavigate();
  const { isAuthed } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string>("");
  const [borrowing, setBorrowing] = useState(false);

  const cover = useMemo(() => {
    return (
      book?.coverUrl ||
      "https://dummyimage.com/600x800/e2e8f0/334155&text=Book"
    );
  }, [book?.coverUrl]);

  async function load() {
    if (!Number.isFinite(bookId) || bookId <= 0) return;
    setLoading(true);
    try {
      // backend currently has list only; we fetch and find in-memory
      const data = await listBooks();
      const found = data.find((b: Book) => b.id === bookId) || null;
      setBook(found);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  async function onBorrow() {
    if (!book) return;
    if (!isAuthed) {
      toast.error("Vui lòng đăng nhập để mượn sách");
      navigate("/login");
      return;
    }
    if (!memberId || Number(memberId) <= 0) {
      toast.error("Vui lòng nhập Member ID hợp lệ");
      return;
    }
    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId: book.id, memberId: Number(memberId) });
      const due = result?.dueDate ? new Date(result.dueDate) : null;
      const dueText = due ? due.toLocaleDateString("vi-VN") : "...";
      toast.success(`Bạn đã mượn sách thành công, hạn trả là ngày ${dueText}.`);
      await load();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBorrowing(false);
    }
  }

  if (loading) {
    return (
      <Card title="Chi tiết sách">
        <div className="text-sm text-slate-500">Đang tải...</div>
      </Card>
    );
  }

  if (!book) {
    return (
      <Card title="Chi tiết sách">
        <div className="text-sm text-slate-500">Không tìm thấy sách.</div>
      </Card>
    );
  }

  const available = book.availableQuantity ?? 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <img src={cover} alt={book.title} className="w-full object-cover" />
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <Card title={book.title}>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-slate-500">Tác giả:</span>{" "}
              <span className="font-medium text-slate-900">{book.author}</span>
            </div>
            <div>
              <span className="text-slate-500">Thể loại:</span>{" "}
              <span className="font-medium text-slate-900">{book.categoryName || "—"}</span>
            </div>
            <div>
              <span className="text-slate-500">Trạng thái:</span>{" "}
              <span className="font-medium text-slate-900">{book.status || "—"}</span>
            </div>
            <div>
              <span className="text-slate-500">Số lượng còn:</span>{" "}
              <span className="font-medium text-slate-900">{available}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-end">
            <div className="sm:col-span-2">
              <Input
                label="Member ID"
                type="number"
                min={1}
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Nhập ID thành viên"
              />
            </div>
            <Button
              disabled={borrowing || available <= 0 || book.status !== "Available"}
              onClick={onBorrow}
            >
              {borrowing ? "Đang mượn..." : "Mượn sách"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

