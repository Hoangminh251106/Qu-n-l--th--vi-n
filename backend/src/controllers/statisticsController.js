const { getStatistics } = require("../models/statisticsModel");

async function statistics(req, res) {
  const data = await getStatistics();
  res.json({ data });
}

module.exports = { statistics };
