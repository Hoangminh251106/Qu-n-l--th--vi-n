const { pool } = require("./db");

async function ensureUsersTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('Admin','Member') NOT NULL DEFAULT 'Member',
      member_id INT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_users_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL
    )
  `);
}

async function ensureBooksCoverUrlColumn() {
  const dbName = process.env.DB_NAME || "library_system";
  const [rows] = await pool.query(
    `
      SELECT 1 AS ok
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'books' AND COLUMN_NAME = 'cover_url'
      LIMIT 1
    `,
    [dbName]
  );
  if (rows && rows.length > 0) return;

  await pool.query(`ALTER TABLE books ADD COLUMN cover_url VARCHAR(500) NULL`);
}

async function ensureSchema() {
  await ensureUsersTable();
  await ensureBooksCoverUrlColumn();
}

module.exports = { ensureSchema };

