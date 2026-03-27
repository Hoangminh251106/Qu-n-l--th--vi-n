const express = require("express");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { statistics } = require("../controllers/statisticsController");

const router = express.Router();

router.get("/statistics", asyncHandler(statistics));

module.exports = { statisticsRoutes: router };
