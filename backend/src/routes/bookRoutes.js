const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { getAllBooks, addBook } = require("../controllers/bookController");

const router = express.Router();

router.get("/", asyncHandler(getAllBooks));
router.post("/", asyncHandler(addBook));

module.exports = { bookRoutes: router };
