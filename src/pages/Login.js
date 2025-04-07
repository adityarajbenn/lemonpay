import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`https://lemonpaybackend.onrender.com/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
        try {
          data = await res.json();
        } catch {
          throw new Error("Something went wrong. Please try again.");
        }

        if (!res.ok) {
          const message = data.msg || data.errors?.[0]?.msg || "Login failed";
          throw new Error(message);
        }


      // Save the token to localStorage
      localStorage.setItem("userId", data.userId);

      // Navigate to task page
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome Login System"
      buttonText="Sign In"
      alternateLink={{ text: "Sign Up", href: "/signup" }}
      onSubmit={handleSubmit}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthLayout>
  );
}

export default Login;
