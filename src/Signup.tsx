import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form); // Automatically gets all inputs + image file

    const res = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      body: fd, // Do NOT set Content-Type for FormData!
    });

    const data = await res.json();
    if (res.ok) {
      navigate("/login");
    } else {
      setError(data.errors?.password?.[0] || data.errors?.email?.[0] || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ maxWidth: 300, margin: "50px auto" }}>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="email" type="email" placeholder="Email" required /><br/><br/>
      <input name="username" placeholder="Username" required /><br/><br/>
      <input name="password" type="password" placeholder="Password" required /><br/><br/>
      <input name="confirm_password" type="password" placeholder="Confirm Password" required /><br/><br/>
      <input name="phone_number" placeholder="Phone (10 digits)" /><br/><br/>
      <input name="profile_picture" type="file" accept="image/*" /><br/><br/>
      <button type="submit">Signup</button>
      <p>Have an account? <a href="/login">Login</a></p>
    </form>
  );
}