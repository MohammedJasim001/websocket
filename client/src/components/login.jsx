import { useState } from "react";
import { loginUser } from "../service/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState(""); // Use state for email as well
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if ( !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const data = await loginUser({name,email,password})
      console.log(data,'data');
  
      localStorage.setItem("user", JSON.stringify(data));

      // Clear form and error
      setEmail("");
      setPassword("");
      setError("");
      alert("Login successful!");
    } catch (err) {
      setError("Invalid username, email, or password",err);
      console.log(err)
    }
    navigate('/chat')
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginForm;
