import { useState } from "react";
import { login } from "../utils/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    async function loginHandle() {
      let loginRes = await login(form)
      if(loginRes.data.data?.user || loginRes.status === 304) {
        console.log("Logged in ")
        window.location.href = "/"
      }

    }

    try {
      loginHandle()

    } catch (err) {
      alert("Login failed", err);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" placeholder="Email" onChange={handleChange} className="p-2 border w-full text-white" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border w-full text-white" />
        <button className="p-2 bg-blue-600 text-white w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
