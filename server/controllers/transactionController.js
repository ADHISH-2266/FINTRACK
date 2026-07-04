const db = require("../config/db");

exports.addTransaction = (req, res) => {

  console.log("Received Body:");
    console.log(req.body);

  const {
    user_id,
    description,
    amount,
    type,
    category,
    transaction_date
  } = req.body;

  db.query(
    `
    INSERT INTO transactions
    (
      user_id,
      description,
      amount,
      type,
      category,
      transaction_date
    )
    VALUES(?,?,?,?,?,?)
    `,
    [
      user_id,
      description,
      amount,
      type,
      category,
      transaction_date
    ],
    (err) => {
      if (err) {
  console.log("DATABASE ERROR:");
  console.log(err);
  return res.status(500).json(err);
}
      res.json({
        message: "Transaction Added"
      });
    }
  );
};

exports.getTransactions = (req, res) => {
  const { userId } = req.params;

  db.query(
    `
    SELECT *
    FROM transactions
    WHERE user_id=?
    ORDER BY created_at DESC
    `,
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

exports.deleteTransaction = (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM transactions WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Transaction Deleted"
            });

        }
    );

};

exports.updateTransaction = (req, res) => {

    const id = req.params.id;

    const {
        description,
        amount,
        type,
        category,
        transaction_date
    } = req.body;

    db.query(

        `UPDATE transactions
         SET description=?,
             amount=?,
             type=?,
             category=?,
             transaction_date=?
         WHERE id=?`,

        [
            description,
            amount,
            type,
            category,
            transaction_date,
            id
        ],

        (err) => {

            if (err) {
  console.log("DATABASE ERROR:");
  console.log(err);
  return res.status(500).json(err);
}
            res.json({
                message: "Transaction Updated"
            });

        }

    );

};