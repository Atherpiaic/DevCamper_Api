const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: { msg: "Show all bootcamps" } });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Show  bootcamps by id ${req.params.id}` }
  });
});

router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Creating new bootcamp` }
  });
});

router.put("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `Show  bootcamps by id ${req.params.id}` }
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    data: { msg: `delete  by id ${req.params.id}` }
  });
});

module.exports = router;
