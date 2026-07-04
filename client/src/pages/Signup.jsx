import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
export default function Signup() {
    const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const res = await api.post("/auth/signup", formData);

      alert("Account Created Successfully");

      navigate("/");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
   <div
  className={`
    min-h-screen
    flex
    items-center
    justify-center
    relative
    overflow-hidden
    transition-all
    duration-300
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

 {
    darkMode && (
      <>
        <div className="absolute w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full top-0 left-0"></div>

        <div className="absolute w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0"></div>
      </>
    )
  }
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

        <h1 className={`
  text-5xl
  font-bold
  mb-2
  ${
    darkMode
      ? "text-white"
      : "text-slate-900"
  }
`}>
          Create Account
        </h1>

        <p className={`
  mb-8
  ${
    darkMode
      ? "text-zinc-400"
      : "text-slate-600"
  }
`}>
          Track your finances effortlessly
        </p>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
`}        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
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

   <button
  onClick={handleSignup}
  className="
    w-full
    bg-blue-500
    hover:bg-blue-600
    text-white
    py-4
    rounded-xl
    font-semibold
    transition
    duration-300
  "
>
  Sign Up
</button>

        <p className="text-zinc-400 text-center mt-6">
          Already have an account?

          <Link
            to="/"
            className="text-blue-500 ml-2 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}