const db = require("../config/db");

exports.addIncome = (req, res) => {
  const { user_id, amount, source } = req.body;

  db.query(
    "INSERT INTO incomes(user_id,amount,source) VALUES(?,?,?)",
    [user_id, amount, source],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Income Added"
      });
    }
  );
};

exports.getIncome = (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM incomes WHERE user_id=? ORDER BY id DESC",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};