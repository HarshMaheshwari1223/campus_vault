import React,{useState} from 'react';
import "./CSS/Login.css";


const SignUp = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className="login-page-wrapper">
    <div className="login-container">
      <div className="login-box-inner">
        <h2 className="login-heading">Sign Up</h2>
        <form className="login-form" action="#">
          <div className="login-input-box">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            required
            className = {email ? "not-empty" : ""}/>
            <label>Email</label>
          </div>

          <div className="login-input-box">
            <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)}
            required
            className = {password? "not-empty" : ""}/>
            <label>Password</label>
          </div>
          <div className="login-forgot-pass">
            <a href="#">Forgot your password?</a>
          </div>
          <button className="login-btn" type="submit">Sign Up</button>
          <div className="login-signup-link">
            <a href="/">Login</a>
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

export default SignUp;
