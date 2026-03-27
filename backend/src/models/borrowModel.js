async function findBookForUpdate(conn, bookId) {
  const [rows] = await conn.query(
    `SELECT id, status, available_quantity, title
     FROM books
     WHERE id = ?
     FOR UPDATE`,
    [bookId]
  );
  return rows[0] || null;
}

async function decreaseBookQuantity(conn, bookId) {
  await conn.query(
    `UPDATE books
     SET available_quantity = available_quantity - 1,
         status = CASE WHEN available_quantity - 1 > 0 THEN 'Available' ELSE 'Out of Stock' END
     WHERE id = ?`,
    [bookId]
  );
}

async function increaseBookQuantity(conn, bookId) {
  await conn.query(
    `UPDATE books
     SET available_quantity = available_quantity + 1,
         status = 'Available'
     WHERE id = ?`,
    [bookId]
  );
}

async function createBorrowRecord(conn, { bookId, memberId, staffId, dueDate }) {
  const [result] = await conn.query(
    `INSERT INTO loans (book_id, member_id, staff_id, due_date, status)
     VALUES (?, ?, ?, ?, 'Borrowed')`,
    [bookId, memberId, staffId ?? null, dueDate]
  );
  return result.insertId;
}

async function findActiveLoanForUpdate(conn, loanId) {
  const [rows] = await conn.query(
    `SELECT id, book_id, member_id, due_date, status
     FROM loans
     WHERE id = ? AND status IN ('Borrowed','Overdue')
     FOR UPDATE`,
    [loanId]
  );
  return rows[0] || null;
}

async function markLoanReturned(conn, loanId, { fineAmount }) {
  await conn.query(
    `UPDATE loans
     SET return_date = NOW(),
         fine_amount = ?,
         status = 'Returned'
     WHERE id = ?`,
    [fineAmount, loanId]
  );
}

async function getBorrowList() {
  const { pool } = require("../config/db");
  const [rows] = await pool.query(
    `SELECT
        l.id,
        l.book_id AS bookId,
        b.title AS bookTitle,
        l.member_id AS memberId,
        m.full_name AS memberName,
        l.loan_date AS loanDate,
        l.due_date AS dueDate,
        l.return_date AS returnDate,
        l.fine_amount AS fineAmount,
        l.status
     FROM loans l
     INNER JOIN books b ON b.id = l.book_id
     INNER JOIN members m ON m.id = l.member_id
     WHERE l.status IN ('Borrowed','Overdue')
     ORDER BY l.loan_date DESC
     LIMIT 500`
  );
  return rows;
}

module.exports = {
  findBookForUpdate,
  decreaseBookQuantity,
  increaseBookQuantity,
  createBorrowRecord,
  findActiveLoanForUpdate,
  markLoanReturned,
  getBorrowList,
};
