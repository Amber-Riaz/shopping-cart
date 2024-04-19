import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Fixed import for GoogleLogout
import { jwtDecode } from "jwt-decode";
import Store from './Store';

const LoginPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    setUser(decoded); // Set user data
    setIsAuthenticated(true);
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  const handleLogoutSuccess = () => {
    setUser(null); // Clear user data
    setIsAuthenticated(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!isAuthenticated ? (
        <GoogleOAuthProvider clientId="397433963437-057q5l1o7f14dgljqlcp5c9n3f9oejot.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign in with Google
              </button>
            )}
          />
        </GoogleOAuthProvider>
      ) : (
        <div>
          <Store user={user} handleLogout={handleLogoutSuccess}/>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
