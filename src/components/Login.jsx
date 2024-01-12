import Button from '@mui/material/Button';
import React from "react";
import { useDispatch } from 'react-redux';
import { login } from "./../redux/userSlice";
import { auth, provider } from "./../config/firebase.js";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();

  const signIn =  () => {    
     signInWithPopup(auth,provider).then(({ user }) => {
     
      const user_data = [
        user.displayName,
           user.email,
          user.photoURL,
      ]
     console.log("user",user_data)
      dispatch(
        login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        })
      );
      localStorage.setItem("user_data",JSON.stringify(user_data))
    });
  };
  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg"
          alt=""
        />
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;