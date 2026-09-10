import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../../context/user.context";
import useApi from "./shared/api";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { setUser, setAccessToken } = useUserContext();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await api.post("/auth/register", formData);

    // success logic yahan
    console.log(response.data);

  } catch (error) {
    setError(
      error.response?.data?.message || "An error occurred"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto", padding: "24px" }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
