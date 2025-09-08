import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react"; // icon set

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://aff-prog-backend.onrender.com/api/auth/login", form);
    // const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("referral_code", res.data.affiliate.referral_code);
    localStorage.setItem("role", res.data.affiliate.role);

    if (res.data.affiliate.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="card w-96 bg-base-100 shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="grow"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="grow"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-2 text-lg rounded-full">
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-4">
          <Link to="/register" className="link link-hover text-sm text-indigo-600">
            Become an Affiliate?
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
