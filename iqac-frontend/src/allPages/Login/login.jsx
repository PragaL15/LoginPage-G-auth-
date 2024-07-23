import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHost from "../../utils/api";
import "./login.css";

function Login() {
  const [token, setToken] = useState(null);

  const googleAuth = () => {
    window.open(`${apiHost}/auth/google`, "_self");
  };

  useEffect(() => {
    console.log("Token updated:", token);
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="login-container">
      <div className="welcome-section">
        <h1>Welcome Back 👋</h1>
        <p>Today is a new day. Sign in to start.</p>
      </div>
      <div className="login-section">
        <div className="login-card">
          <img src="../../../public/student_logo.png" alt="Student Logo" className="fixed-size-image" />
          <h2>IQAC Portal</h2>
          {!token ? (
            <>
              <button className="google-btn" onClick={googleAuth}>
                <img src="../../../public/image8-2.png" alt="Google Logo" className="google-logo" />
                <span>Sign in with Google</span>
              </button>
              <div className='para'><p>Sign in using your BITsathy account</p></div>
            </>
          ) : (
            <div>
              <p>You are logged in!</p>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
