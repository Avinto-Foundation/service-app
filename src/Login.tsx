import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // Prevent double click
    
    setLoading(true);
    setError("");

    try {
      const form = e.currentTarget;
      const email = (form.elements.namedItem("email") as HTMLInputElement).value;
      const password = (form.elements.namedItem("password") as HTMLInputElement).value;

      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setLoading(false);
        if (data.errors?.username) setError(data.errors.username[0]);
        else if (data.errors?.password) setError(data.errors.password[0]);
      }
    } catch (err) {
      setLoading(false);
      setError("Cannot connect to server.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>
      
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", width: "100%", maxWidth: "420px" }}>
        
        <h2 style={{ marginTop: 0, marginBottom: "20px", textAlign: "center" }}>Welcome Back</h2>
        
        {error && <p style={{ color: "red", background: "#fee2e2", padding: "10px", borderRadius: "6px", fontSize: "14px", marginBottom: "20px" }}>{error}</p>}

        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Email Address</label>
        <input type="email" name="email" required style={inputStyle} />
        
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Password</label>
        <input type="password" name="password" required style={inputStyle} />
        
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: loading ? "#93c5fd" : "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#6b7280" }}>
          Don't have an account? <Link to="/signup" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Signup here</Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #d1d5db", borderRadius: "8px", boxSizing: "border-box" as const, fontSize: "14px" };