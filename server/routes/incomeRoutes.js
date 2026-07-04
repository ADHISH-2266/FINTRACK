const express = require("express");
const router = express.Router();

const incomeController = require("../controllers/incomeController");

router.post("/add", incomeController.addIncome);
router.get("/:userId", incomeController.getIncome);

module.exports = router;