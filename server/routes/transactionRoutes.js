const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/add", addTransaction);

router.get("/:userId", getTransactions);

router.put("/update/:id", updateTransaction);

router.delete("/delete/:id", deleteTransaction);

module.exports = router;