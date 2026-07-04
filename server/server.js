require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
//const incomeRoutes = require("./routes/incomeRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
//app.use("/api/income", incomeRoutes);
app.use("/api/transactions",transactionRoutes);

app.get("/", (req, res) => {
  res.send("FinTrack API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});