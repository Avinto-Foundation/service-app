import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError("");

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const res = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        setLoading(false);
        if (data.errors?.password) setError(data.errors.password[0]);
        else if (data.errors?.email) setError(data.errors.email[0]);
        else setError("Check your fields.");
      }
    } catch (err) {
      setLoading(false);
      setError("Error: " + String(err)); // If it fails, this will show the REAL reason
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", width: "100%", maxWidth: "420px" }}>
        
        <h2 style={{ marginTop: 0, marginBottom: "20px", textAlign: "center" }}>Create Account</h2>
        
        {error && <p style={{ color: "red", background: "#fee2e2", padding: "10px", borderRadius: "6px", fontSize: "14px", marginBottom: "20px" }}>{error}</p>}

        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Email</label>
        <input type="email" name="email" required style={inputStyle} />
        
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Username</label>
        <input type="text" name="username" required style={inputStyle} />
        
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Password (Min 8 chars, 1 Upper, 1 Number)</label>
        <input type="password" name="password" required style={inputStyle} />
        
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Confirm Password</label>
        <input type="password" name="confirm_password" required style={inputStyle} />
        
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Phone Number (10 digits)</label>
        <input type="text" name="phone_number" style={inputStyle} />
        
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Bio (Optional)</label>
        <textarea name="bio" style={{...inputStyle, height: "80px", resize: "vertical" as const}}></textarea>
        
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", fontSize: "14px" }}>Profile Picture (Optional)</label>
        <input type="file" name="profile_picture" accept="image/png, image/jpeg" style={{ marginBottom: "20px" }} />
        
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px", background: loading ? "#93c5fd" : "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Creating Account..." : "Signup"}
        </button>
        
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#6b7280" }}>
          Already have an account? <Link to="/login" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Login here</Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #d1d5db", borderRadius: "8px", boxSizing: "border-box" as const, fontSize: "14px" };