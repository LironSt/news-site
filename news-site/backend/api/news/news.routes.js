const {
  loadNews,
  loadNewsByCategory,
  getArticlesByReporter,
  getReporters
} = require("./news.controller");
const express = require("express");
const router = express.Router();

router.post("/", loadNewsByCategory);
router.get("/", loadNews);
router.get("/:reporter", getArticlesByReporter);
router.get("/reporters", getReporters);

module.exports = router;
