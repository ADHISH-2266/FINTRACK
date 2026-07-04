const db = require("../config/db");

exports.addExpense = (req, res) => {
  const {
    user_id,
    category,
    amount,
    description
  } = req.body;

  db.query(
    "INSERT INTO expenses(user_id,category,amount,description) VALUES(?,?,?,?)",
    [
      user_id,
      category,
      amount,
      description
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Expense Added"
      });
    }
  );
};