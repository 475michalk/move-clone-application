// בעמוד ההתחברות
import React from 'react';
import { Link } from "react-router-dom";

const Login = () => {


  
  return (
    <div>
      <h2>Login Page</h2>
      <p>אני עמוד התחברות</p>
      {/* קישור לעמוד CreateRoute */}
      <Link to="/CreateRoute">עבור לעמוד CreateRoute</Link>
    </div>
  );
}
export default Login;
