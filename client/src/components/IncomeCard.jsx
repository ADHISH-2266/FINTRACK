export default function IncomeCard({
  title,
  amount,
}) {
  return (
    <div className="bg-zinc-900 p-5 rounded-3xl">

      <h3 className="text-zinc-400">
        {title}
      </h3>

      <p className="text-2xl font-bold text-white">
        ₹ {amount}
      </p>

    </div>
  );
}