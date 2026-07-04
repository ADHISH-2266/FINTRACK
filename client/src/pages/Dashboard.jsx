import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  console.log("Current User:", user);
console.log("User ID:", user?.id);

  const navigate = useNavigate();

  const [transactions, setTransactions] =
    useState([]);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    transaction_date: "",
  });
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);

  const [customCategory, setCustomCategory] = useState("");

  const [editingId, setEditingId] = useState(null);

  const loadTransactions = async () => {
    try {

      const res = await api.get(
        `/transactions/${user.id}`
      );

      setTransactions(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

 const handleSubmit = async () => {

  try {

    if (editingId) {

      await api.put(
        `/transactions/update/${editingId}`,
        {
          ...form,
          category:
            form.category === "Others"
              ? customCategory
              : form.category,
        }
      );

      setEditingId(null);

    } else {

      await api.post(
        "/transactions/add",
        {
          ...form,
          category:
            form.category === "Others"
              ? customCategory
              : form.category,
          user_id: user.id,
        }
      );

    }

    loadTransactions();

    setForm({
      description: "",
      amount: "",
      type: "expense",
      category: "Food",
      transaction_date: "",
    });

    setCustomCategory("");

    setEditingId(null);

  } catch (error) {

    console.log(error);

  }

};

const handleDelete = async (id) => {

    if (!window.confirm("Delete this transaction?"))
        return;

    try {

        await api.delete(`/transactions/delete/${id}`);

        loadTransactions();

    } catch (err) {

        console.log(err);

    }

};

const handleEdit = (transaction) => {

  setEditingId(transaction.id);

  const defaultCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Rent",
    "Entertainment",
    "Health",
    "Education",
  ];

  const isCustom =
    !defaultCategories.includes(transaction.category);

  setForm({
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    category: isCustom
      ? "Others"
      : transaction.category,
    transaction_date:
      transaction.transaction_date?.split("T")[0],
  });

  setCustomCategory(
    isCustom ? transaction.category : ""
  );

};

  const totalIncome =
    transactions
      .filter(
        (t) =>
          t.type === "income"
      )
      .reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      );

  const totalExpense =
    transactions
      .filter(
        (t) =>
          t.type === "expense"
      )
      .reduce(
        (sum, t) =>
          sum + Number(t.amount),
        0
      );

  const balance =
    totalIncome - totalExpense;

    const categoryTotals = {};

transactions.forEach((t) => {
  if (t.type === "expense") {
    categoryTotals[t.category] =
      (categoryTotals[t.category] || 0) +
      Number(t.amount);
  }
});

let highestCategory = "";
let highestAmount = 0;

Object.entries(categoryTotals).forEach(
  ([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  }
);

let advice = "";
let adviceColor = "";

if (totalExpense > totalIncome) {

  adviceColor = "text-red-500";

  advice = `Warning! Your expenses exceed your income. Most of your spending is on ${highestCategory} (₹${highestAmount}). Consider reducing this category to improve your savings.`;

} else {

  adviceColor = "text-green-600";

  advice = `Great! Your expenses are within your income. Your highest spending category is ${highestCategory} (₹${highestAmount}). Keep monitoring this category to maintain healthy finances.`;

}

    const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};

  return (
     <div
  className={`min-h-screen py-8 transition-all duration-500 ${
    darkMode
      ? "bg-slate-950"
      : "bg-slate-100"
  }`}
>

    <div
  className={`
    max-w-6xl
    mx-auto
    px-6
    rounded-[32px]
    p-8
    transition-all
    duration-500
    ${
      darkMode
        ? "bg-slate-900"
        : "bg-white shadow-xl"
    }
  `}
>

     <div className="flex justify-between items-center mb-8">

  <div>

  <h1
  className={`
    text-6xl
    font-extrabold
    tracking-tight
    leading-none
    bg-gradient-to-r
    from-red-600
    via-red-500
    to-black
    bg-clip-text
    text-transparent
    inline-block
  `}
>
  FinTrack
</h1>
  <p
    className={`mt-1 ${
      darkMode
        ? "text-slate-400"
        : "text-slate-600"
    }`}
  >
    Manage your finances smarter
  </p>

  <p
    className={`mt-2 text-sm font-medium ${adviceColor}`}
  >
    {advice}
  </p>

</div>

  <div className="flex items-center gap-4">

    {/* Theme Toggle */}

   <button
  onClick={() => setDarkMode(!darkMode)}
  className={`
    relative
    w-20
    h-10
    rounded-full
    transition-all
    duration-300
    ${
      darkMode
        ? "bg-slate-700"
        : "bg-slate-100"
    }
  `}
>

  <div
    className={`
      absolute
      top-1
      w-8
      h-8
      rounded-full
      bg-slate-200
      flex
      items-center
      justify-center
      shadow-md
      transition-all
      duration-300
      ${
        darkMode
          ? "translate-x-10"
          : "translate-x-1"
      }
    `}
  >
    {darkMode ? "🌙" : "☀️"}
  </div>

</button>


    {/* Logout */}

  <button
  onClick={handleLogout}
  className="
    w-20
    h-10
    rounded-full
    bg-red-500
    text-white-500
    text-sm
    font-bold
    transition-all
    duration-300
    hover:bg-white-500
    hover:text-white
  "
>
  Logout
</button>

  </div>

</div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-8 mb-10">

  <div
  className={`
    rounded-3xl
    p-6
    border
    transition-all
    duration-300
    ease-in-out
    hover:-translate-y-3
    hover:scale-105
    hover:shadow-2xl
    cursor-pointer
    ${
      darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
  `}
>
          <h3 className="text-slate-400">
            Total Income
          </h3>

          <h1
  className={`text-3xl font-bold mt-2 ${
    darkMode ? "text-white" : "text-black"
  }`}
>
  ₹ {totalIncome}
</h1>
        </div>

       <div
  className={`
    rounded-3xl
    p-6
    border
    transition-all
duration-300
ease-in-out
hover:-translate-y-3
hover:scale-105
hover:shadow-2xl
cursor-pointer
    ${
      darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
  `}
>
          <h3 className="text-slate-400">
            Total Expense
          </h3>

         <h1
  className={`text-3xl font-bold mt-2 ${
    darkMode ? "text-white" : "text-black"
  }`}
>
  ₹ {totalExpense}
</h1>
        </div>

        <div
  className={`
    rounded-3xl
    p-6
    border
    transition-all
duration-300
ease-in-out
hover:-translate-y-3
hover:scale-105
hover:shadow-2xl
cursor-pointer
    ${
      darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
  `}
>
          <h3 className="text-slate-400">
            Balance
          </h3>

        <h1
  className={`text-3xl font-bold mt-2 ${
    darkMode ? "text-white" : "text-black"
  }`}
>
  ₹ {balance}
</h1>
        </div>

      </div>

      {/* Add Transaction */}

    <div
  className={`
    rounded-3xl
    p-6
    border
    ${
      darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
  `}
>

        <div className="grid md:grid-cols-5 gap-4">

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="   what was this for ? "
            className={`
  p-1
  rounded-xl
  border
  ${
    darkMode
      ? "bg-slate-900 text-white border-slate-700"
      : "bg-slate-50 text-slate-900 border-slate-200"
  }
`}
          />

          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            className={`
  p-4
  rounded-xl
  border
  ${
    darkMode
      ? "bg-slate-900 text-white border-slate-700"
      : "bg-slate-50 text-slate-900 border-slate-200"
  }
`}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={`
  p-4
  rounded-xl
  border
  ${
    darkMode
      ? "bg-slate-900 text-white border-slate-700"
      : "bg-slate-50 text-slate-900 border-slate-200"
  }
`}
          >
            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`
  p-4
  rounded-xl
  border
  ${
    darkMode
      ? "bg-slate-900 text-white border-slate-700"
      : "bg-slate-50 text-slate-900 border-slate-200"
  }
`}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Rent</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Education</option>
            <option>Others</option>
          </select>

          {form.category === "Others" && (
  <input
    type="text"
    placeholder="Custom Category"
    value={customCategory}
    onChange={(e) =>
      setCustomCategory(e.target.value)
    }
    className={`
  p-4
  rounded-xl
  border
  ${
    darkMode
      ? "bg-slate-900 text-white border-slate-700"
      : "bg-slate-50 text-slate-900 border-slate-200"
  }
`}
  />
)}

          <input
            type="date"
            name="transaction_date"
            value={form.transaction_date}
            onChange={handleChange}
            className={`
  p-4
  rounded-xl
  border
  ${
    darkMode
      ? "bg-slate-900 text-white border-slate-700"
      : "bg-slate-50 text-slate-900 border-slate-200"
  }
`}
          />

        </div>

       <button
  onClick={handleSubmit}
  className="
    mt-5
    bg-blue-500
    px-8
    py-3
    rounded-xl
    text-white
    hover:bg-blue-600
    transition
  "
>
  {editingId ? "Update Transaction" : "Add Transaction"}
</button>

      </div>

      {/* Transactions */}

     <div
  className={`
    mt-8    rounded-3xl
    p-6
    border
    ${
      darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
  `}
>

       <h2
  className={`text-2xl font-bold mb-5 ${
    darkMode
      ? "text-white"
      : "text-black"
  }`}
>
  Recent Transactions
</h2>

        <div className="space-y-3">

          {transactions.map((t) => (

<div
  key={t.id}
  className={`
    p-4
    rounded-xl
    border
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:shadow-lg
    flex
    justify-between
    items-center
    ${
      darkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-slate-50 border-slate-200"
    }
  `}
>

  <div>

    <p
      className={
        darkMode
          ? "text-white font-semibold"
          : "text-black font-semibold"
      }
    >
      {t.description}
    </p>

    <p
      className={
        darkMode
          ? "text-slate-400"
          : "text-slate-600"
      }
    >
      {t.category}
    </p>

    <p
      className={
        t.type === "income"
          ? "text-green-500 font-bold"
          : "text-red-500 font-bold"
      }
    >
      ₹ {t.amount}
    </p>

  </div>

  <div className="flex gap-2">

    <button
      onClick={() => handleEdit(t)}
      className="
        bg-blue-500
        hover:bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        transition
      "
    >
      Edit
    </button>

    <button
      onClick={() => handleDelete(t.id)}
      className="
        bg-red-500
        hover:bg-red-600
        text-white
        px-4
        py-2
        rounded-lg
        transition
      "
    >
      Delete
    </button>

  </div>

</div>

))}

        </div>

      </div>

    </div>

    </div>
  );
}