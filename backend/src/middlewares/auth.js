const jwt = require("jsonwebtoken");
const { HttpError } = require("../errors");

function getToken(req) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}

function requireAuth(req, res, next) {
  const token = getToken(req);
  if (!token) return next(new HttpError(401, "Unauthorized"));

  try {
    const secret =
      process.env.JWT_SECRET ||
      (process.env.NODE_ENV === "production" ? "" : "dev_secret_change_me");
    if (!secret) return next(new HttpError(500, "JWT_SECRET is not set"));
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch {
    return next(new HttpError(401, "Invalid token"));
  }
}

function requireAdmin(req, res, next) {
  if (!req.user) return next(new HttpError(401, "Unauthorized"));
  if (req.user.role !== "Admin") return next(new HttpError(403, "Admin only"));
  return next();
}

module.exports = { requireAuth, requireAdmin };

