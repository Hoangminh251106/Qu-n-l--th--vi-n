const { pool } = require("../config/db");

async function getStatistics() {
  const [[bookRow]] = await pool.query(`SELECT COUNT(*) AS totalBooks FROM books`);
  const [[remainingRow]] = await pool.query(
    `SELECT COALESCE(SUM(available_quantity),0) AS remainingBooks FROM books`
  );
  const [[borrowedRow]] = await pool.query(
    `SELECT COUNT(*) AS borrowedBooks
     FROM loans
     WHERE status IN ('Borrowed','Overdue')`
  );
  const [[memberRow]] = await pool.query(
    `SELECT COUNT(*) AS newMembers
     FROM members
     WHERE membership_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`
  );

  return {
    totalBooks: Number(bookRow.totalBooks || 0),
    remainingBooks: Number(remainingRow.remainingBooks || 0),
    borrowedBooks: Number(borrowedRow.borrowedBooks || 0),
    newMembers: Number(memberRow.newMembers || 0),
  };
}

module.exports = { getStatistics };
