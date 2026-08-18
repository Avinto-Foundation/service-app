import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: fd.get("email"), password: fd.get("password") }),
    });
    
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.errors?.username?.[0] || data.errors?.password?.[0] || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 300, margin: "50px auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="email" type="email" placeholder="Email" required /><br/><br/>
      <input name="password" type="password" placeholder="Password" required /><br/><br/>
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </form>
  );
}