import React,{useState} from 'react';
import "./CSS/Login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [rollNumber, setRollNumber] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg,setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      rollNumber,
      password,
    });

    console.log("Backend response:", res.data); // Check structure

    const user = res.data.user; // or adjust based on actual structure

    if (user && user.name && user.rollNumber) {
      localStorage.setItem("name", user.name);
      localStorage.setItem("rollNumber", user.rollNumber);
      alert(`Welcome, ${user.name}`);
      navigate("/home");
    } else {
      setErrorMsg("Login failed: Unexpected response format.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setErrorMsg("Invalid roll number or password");
  }
};


  return (
    <div className="login-page-wrapper">
    <div className="login-container">
      <div className="login-box-inner">
        <h2 className="login-heading">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-box">
            <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)}
            required
            className = {rollNumber ? "not-empty" : ""}/>
            <label>Registration Number</label>
          </div>

          <div className="login-input-box">
            <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)}
            required
            className = {password? "not-empty" : ""}/>
            <label>Password</label>
          </div>

          {errorMsg && <p className = "login-error">{errorMsg}</p>}

          <div className="login-forgot-pass">
            <a href="#">Forgot your password?</a>
          </div>
          <button type="submit" className="login-btn" >Login</button>
          <div className="login-signup-link">
            <a href="/signup">Sign Up</a>
          </div>
        </form>
      </div>

      {[...Array(50)].map((_, i) => (
        <span key={i} style={{ "--i": i }} />
      ))}
    </div>
    </div>
  );
};

export default Login;
