import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";


export default function Login() {
    const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div
  className={`
    min-h-screen
    relative
    overflow-hidden
    flex
    items-center
    justify-center
    ${
      darkMode
        ? "bg-black"
        : "bg-slate-100"
    }
  `}
>
    <div className="absolute top-6 right-6 z-50">
  <ThemeToggle />
</div>
      {/* Blue Glow */}
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full top-0 left-0"></div>

      <div className="absolute w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0"></div>

      {/* Card */}
      <div
  className={`
    relative z-10
    w-[380px]
    backdrop-blur-xl
    rounded-3xl
    p-4
    border
    transition-all
    duration-300
    ${
      darkMode
        ? "bg-[#0F172A]/90 border-blue-500/20"
        : "bg-white border-slate-200 shadow-xl"
    }
  `}
>
<div className="flex justify-center mb-6">

  <div
    className="
      w-16
      h-16
      rounded-full
      bg-blue-500
      flex
      items-center
      justify-center
      shadow-lg
    "
  >
    <span className="text-white text-5xl font-semibold">
      ₹
    </span>
  </div>

</div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1
  className={`
    text-6xl
    font-extrabold
    tracking-tight
    ${
      darkMode
        ? "text-white"
        : "text-slate-900"
    }
  `}
>
            FinTrack
          </h1>

          <p
  className={`
    mt-2
    text-lg
    ${
      darkMode
        ? "text-slate-400"
        : "text-slate-600"
    }
  `}
>
            Track your finances effortlessly.
          </p>
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
         className={`
  w-full
  mb-4
  p-4
  rounded-xl
  border
  outline-none
  transition-all
  duration-300
  ${
    darkMode
      ? "bg-zinc-900 text-white border-zinc-800"
      : "bg-slate-100 text-slate-900 border-slate-300"
  }
`}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className={`
  w-full
  mb-4
  p-4
  rounded-xl
  border
  outline-none
  transition-all
  duration-300
  ${
    darkMode
      ? "bg-zinc-900 text-white border-zinc-800"
      : "bg-slate-100 text-slate-900 border-slate-300"
  }
`}
        />

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="
          w-full
          bg-blue-500
          hover:bg-blue-600
          text-white
          py-4
          rounded-xl
          font-semibold
          transition
          "
        >
          Login
        </button>

        {/* Signup Link */}
       <p
  className={`
    text-center
    mt-6
    ${
      darkMode
        ? "text-zinc-400"
        : "text-slate-600"
    }
  `}
>
          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-500 ml-2 font-semibold"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}