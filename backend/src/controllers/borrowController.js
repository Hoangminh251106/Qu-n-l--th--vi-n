const { pool } = require("../config/db");
const { HttpError } = require("../errors");
const { findMemberById } = require("../models/memberModel");
const {
  findBookForUpdate,
  decreaseBookQuantity,
  increaseBookQuantity,
  createBorrowRecord,
  findActiveLoanForUpdate,
  markLoanReturned,
  getBorrowList,
} = require("../models/borrowModel");
const { borrowSchema, returnSchema } = require("../validators");

function toMysqlDateTime(d) {
  // MySQL DATETIME string: YYYY-MM-DD HH:mm:ss
  return new Date(d).toISOString().slice(0, 19).replace("T", " ");
}

async function borrowBook(req, res) {
  const parsed = borrowSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid payload", parsed.error.flatten());

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const { bookId, memberId, staffId, loanDays } = parsed.data;
    const book = await findBookForUpdate(conn, bookId);
    if (!book) throw new HttpError(404, "Sai ID sách");
    if (book.available_quantity <= 0) throw new HttpError(409, "Sách đã hết (Hết sách)");
    if (book.status !== "Available") throw new HttpError(409, "Sách không ở trạng thái sẵn sàng");

    const member = await findMemberById(conn, memberId);
    if (!member) throw new HttpError(404, "Sai ID thành viên");
    if (member.status === "Blocked") throw new HttpError(403, "Thành viên bị khóa (Blocked)");

    const days = loanDays ?? Number(process.env.LOAN_DAYS || 14);
    const dueDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    await decreaseBookQuantity(conn, bookId);
    const loanId = await createBorrowRecord(conn, {
      bookId,
      memberId,
      staffId,
      dueDate: toMysqlDateTime(dueDate),
    });

    await conn.commit();
    res.status(201).json({
      data: {
        loanId,
        bookId,
        memberId,
        dueDate: toMysqlDateTime(dueDate),
      },
    });
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

async function returnBook(req, res) {
  const parsed = returnSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid payload", parsed.error.flatten());

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const active = await findActiveLoanForUpdate(conn, parsed.data.loanId);
    if (!active) throw new HttpError(404, "Sai ID mượn sách hoặc đã trả");

    const finePerDay = Number(process.env.FINE_PER_DAY || 1000);
    const now = new Date();
    const due = new Date(active.due_date);
    const diffDays = Math.max(0, Math.ceil((now.getTime() - due.getTime()) / (24 * 60 * 60 * 1000)));
    const fineAmount = diffDays * finePerDay;

    await markLoanReturned(conn, parsed.data.loanId, { fineAmount });
    await increaseBookQuantity(conn, active.book_id);

    await conn.commit();
    res.json({ data: { loanId: parsed.data.loanId, fineAmount, status: "Returned" } });
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

async function listBorrows(req, res) {
  const data = await getBorrowList();
  res.json({ data });
}

module.exports = { borrowBook, returnBook, listBorrows };
