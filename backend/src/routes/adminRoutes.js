const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { requireAuth, requireAdmin } = require("../middlewares/auth");
const { pool } = require("../config/db");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/members", asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, phone, status, membership_date
     FROM members
     ORDER BY id DESC
     LIMIT 500`
  );
  res.json({ data: rows });
}));

module.exports = { adminRoutes: router };

