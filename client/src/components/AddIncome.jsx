import { useState } from "react";

export default function AddIncome() {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-zinc-900 p-6 rounded-3xl">

      <h2 className="text-xl font-bold mb-4">
        Add Income
      </h2>

      <input
        placeholder="Source"
        value={source}
        onChange={(e) =>
          setSource(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-zinc-800 mb-3"
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-zinc-800 mb-3"
      />

      <button
        className="w-full bg-white text-black p-3 rounded-xl"
      >
        Add Income
      </button>

    </div>
  );
}