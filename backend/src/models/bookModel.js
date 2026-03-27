const { pool } = require("../config/db");

async function getBooks({ q } = {}) {
  const keyword = q && q.trim() ? `%${q.trim()}%` : null;

  const sqlNoFilter = `
    SELECT
      b.id,
      b.title,
      b.author,
      b.category_id,
      c.name AS categoryName,
      b.isbn,
      b.publisher,
      b.publish_year,
      b.total_quantity AS totalQuantity,
      b.available_quantity AS availableQuantity,
      b.price,
      b.location,
      b.status
    FROM books b
    LEFT JOIN categories c ON c.id = b.category_id
    ORDER BY b.id DESC
    LIMIT 500
  `;

  const sqlWithFilter = `
    SELECT
      b.id,
      b.title,
      b.author,
      b.category_id,
      c.name AS categoryName,
      b.isbn,
      b.publisher,
      b.publish_year,
      b.total_quantity AS totalQuantity,
      b.available_quantity AS availableQuantity,
      b.price,
      b.location,
      b.status
    FROM books b
    LEFT JOIN categories c ON c.id = b.category_id
    WHERE b.title LIKE ? OR b.author LIKE ?
    ORDER BY b.id DESC
    LIMIT 500
  `;

  const [rows] = await pool.query(keyword ? sqlWithFilter : sqlNoFilter, keyword ? [keyword, keyword] : []);
  return rows;
}

async function createBook(payload) {
  const {
    title,
    author,
    categoryId,
    isbn,
    publisher,
    publishYear,
    totalQuantity,
    availableQuantity,
    price,
    location,
    status,
  } = payload;

  const avail = typeof availableQuantity === "number" ? availableQuantity : totalQuantity;

  const [result] = await pool.query(
    `INSERT INTO books
      (title, author, category_id, isbn, publisher, publish_year, total_quantity, available_quantity, price, location, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      author,
      categoryId,
      isbn || null,
      publisher || null,
      publishYear || null,
      totalQuantity,
      avail,
      price ?? null,
      location || null,
      status,
    ]
  );

  const [rows] = await pool.query(
    `
      SELECT
        b.id,
        b.title,
        b.author,
        b.category_id,
        c.name AS categoryName,
        b.isbn,
        b.publisher,
        b.publish_year,
        b.total_quantity AS totalQuantity,
        b.available_quantity AS availableQuantity,
        b.price,
        b.location,
        b.status
      FROM books b
      LEFT JOIN categories c ON c.id = b.category_id
      WHERE b.id = ?
    `,
    [result.insertId]
  );

  return rows[0];
}

module.exports = { getBooks, createBook };
