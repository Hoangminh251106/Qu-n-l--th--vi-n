async function findMemberById(conn, memberId) {
  const [rows] = await conn.query(
    `SELECT id, full_name, email, phone, status, membership_date
     FROM members
     WHERE id = ?
     LIMIT 1`,
    [memberId]
  );
  return rows[0] || null;
}

module.exports = { findMemberById };
