const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
      ord_msg: "GET /orders"
  });
});
module.exports = router;
