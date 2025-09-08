import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", form);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="input input-bordered w-full mb-2"
            onChange={(e) => setForm({ ...form, name: e.target.value })}/>
          <input type="email" placeholder="Email" className="input input-bordered w-full mb-2"
            onChange={(e) => setForm({ ...form, email: e.target.value })}/>
          <input type="password" placeholder="Password" className="input input-bordered w-full mb-4"
            onChange={(e) => setForm({ ...form, password: e.target.value })}/>
          <button className="btn btn-primary w-full">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;