const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../errors");
const { z } = require("zod");
const { findUserByEmail, createMemberAndUser } = require("../models/userModel");

const registerSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

function signToken({ userId, role, memberId, fullName, email }) {
  const secret =
    process.env.JWT_SECRET ||
    (process.env.NODE_ENV === "production" ? "" : "dev_secret_change_me");
  if (!secret) throw new Error("JWT_SECRET is not set");
  return jwt.sign({ userId, role, memberId, fullName, email }, secret, { expiresIn: "7d" });
}

async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid payload", parsed.error.flatten());

  const exists = await findUserByEmail(parsed.data.email);
  if (exists) throw new HttpError(409, "Email already registered");

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const { userId, memberId } = await createMemberAndUser({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    passwordHash,
  });

  const token = signToken({
    userId,
    role: "Member",
    memberId,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
  });
  res.status(201).json({ data: { token } });
}

async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid payload", parsed.error.flatten());

  const user = await findUserByEmail(parsed.data.email);
  if (!user) throw new HttpError(401, "Sai email hoặc mật khẩu");

  const ok = await bcrypt.compare(parsed.data.password, user.password_hash);
  if (!ok) throw new HttpError(401, "Sai email hoặc mật khẩu");

  const token = signToken({
    userId: user.id,
    role: user.role,
    memberId: user.member_id,
    fullName: user.full_name,
    email: user.email,
  });
  res.json({ data: { token } });
}

module.exports = { register, login };

