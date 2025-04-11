import { useState } from "react";
import { API_ROUTES } from "../config/apiConfig";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_ROUTES.register, form);
      // window.location.href = "/login";
    } catch (error) {
      alert("Error registering: "+error);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="p-2 border w-full text-white" />
        <input name="email" placeholder="Email" onChange={handleChange} className="p-2 border w-full text-white" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="p-2 border w-full text-white" />
        <button className="p-2 bg-blue-600 text-white w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
