import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({email: "", password:""})
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page from reloading
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const json=await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect to home page
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert('welcome back!','success');
    }
    else{
      props.showAlert('invalid credentials','danger');
    }
  };

  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
  }

  return (
    <div>
      <div class="box">
        <h2>Login</h2>
        <form action=""  onSubmit={handleSubmit}>
          <div class="inputBox">
            <input type="email" name="email" value={credentials.email} id="email" onChange={handleChange}/>
            <label for="">Email</label>
          </div>
          <div class="inputBox">
            <input type="password" name="password" value={credentials.password} id="password" onChange={handleChange}/>
            <label for="">Password</label>
          </div>
          <input type="submit" name="submit" value="Submit"/>
        </form>
      </div>
    </div>
  );
}

export default Login;
