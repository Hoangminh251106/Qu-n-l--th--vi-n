const { pool } = require("../config/db");

async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, password_hash, role, member_id
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

async function findUserById(id) {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, role, member_id
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

async function createMemberAndUser({ fullName, email, passwordHash }) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [memberRes] = await conn.query(
      `INSERT INTO members (full_name, email, status)
       VALUES (?, ?, 'Active')`,
      [fullName, email]
    );
    const memberId = memberRes.insertId;

    const [userRes] = await conn.query(
      `INSERT INTO users (full_name, email, password_hash, role, member_id)
       VALUES (?, ?, ?, 'Member', ?)`,
      [fullName, email, passwordHash, memberId]
    );
    await conn.commit();
    return { userId: userRes.insertId, memberId };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

module.exports = { findUserByEmail, findUserById, createMemberAndUser };

