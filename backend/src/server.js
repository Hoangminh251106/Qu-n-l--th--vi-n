require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ensureConnection } = require("./config/db");
const { ensureSchema } = require("./config/ensureSchema");
const { errorHandler, notFound } = require("./errors");

// --- HÀM IMPORT THÔNG MINH (Chống lỗi Crash dòng 56) ---
// Tự động tìm đúng Router dù bạn dùng module.exports = router hay module.exports = { route: router }
const getRouter = (moduleObj, routeName) => {
  return moduleObj[routeName] || moduleObj.router || moduleObj;
};

const authRoutes = getRouter(require("./routes/authRoutes"), "authRoutes");
const bookRoutes = getRouter(require("./routes/bookRoutes"), "bookRoutes");
const borrowRoutes = getRouter(require("./routes/borrowRoutes"), "borrowRoutes");
const statisticsRoutes = getRouter(require("./routes/statisticsRoutes"), "statisticsRoutes");
const adminRoutes = getRouter(require("./routes/adminRoutes"), "adminRoutes");

async function main() {
  const app = express();
  const port = Number(process.env.PORT || 5000);

  // Kết nối Database
  await ensureConnection();
  await ensureSchema();

  // Cấu hình CORS
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || /^http:\/\/localhost:517\d$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/health", (req, res) => res.json({ ok: true, db: "mysql connected" }));

  // --- GẮN ROUTE AN TOÀN ---
  // Kiểm tra nếu là function hợp lệ mới chạy, không thì bỏ qua (tránh crash server)
  if (typeof authRoutes === "function") app.use("/api/auth", authRoutes);
  else console.log("⚠️ Cảnh báo: authRoutes bị lỗi export");

  if (typeof bookRoutes === "function") app.use("/api/books", bookRoutes);
  else console.log("⚠️ Cảnh báo: bookRoutes bị lỗi export");

  if (typeof borrowRoutes === "function") app.use("/api", borrowRoutes);
  else console.log("⚠️ Cảnh báo: borrowRoutes bị lỗi export");

  if (typeof statisticsRoutes === "function") app.use("/api", statisticsRoutes);
  else console.log("⚠️ Cảnh báo: statisticsRoutes bị lỗi export");

  if (typeof adminRoutes === "function") app.use("/api/admin", adminRoutes);
  else console.log("⚠️ Cảnh báo: adminRoutes bị lỗi export");

  app.use(notFound);
  app.use(errorHandler);

  app.listen(port, "127.0.0.1", () => {
    console.log(`\n🚀 Hệ thống Backend đã khởi động!`);
    console.log(`👉 Lắng nghe tại: http://127.0.0.1:${port}\n`);
  });
}

main().catch((err) => {
  console.error("❌ Lỗi Server:", err);
  process.exit(1);
});