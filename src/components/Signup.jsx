import React, { useState } from 'react'
import './LoginForm.css';
import {useNavigate } from 'react-router-dom';

function SignUp(props) {
  const [credentials,setCredentials]=useState({name:"",email:"",password:""});
  let navigate=useNavigate();

  const handleChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials;// name,email,password ko bahar nikalo credentials se
    const response=await fetch("http://localhost:5000/api/auth/createuser", {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name,email,password})
    })
    const json=await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authtoken)
      navigate('/');
      props.showAlert('Welcome!','success');
    }
    else{
      props.showAlert("Some error occurred","danger")
    }
  }
  return (
    <div>
      <div class="box">
        <h2>Sign Up</h2>
        <form action=""  onSubmit={handleSubmit}>
        <div class="inputBox">
            <input type="text" name="name" value={credentials.name} id="name" onChange={handleChange} minLength={3} required/>
            <label for="">Name</label>
          </div>

          <div class="inputBox">
            <input type="email" name="email" value={credentials.email} id="email" onChange={handleChange} minLength={3} required/>
            <label for="">Email</label>
          </div>
          
          <div class="inputBox">
            <input type="password" name="password" value={credentials.password} id="password" onChange={handleChange} minLength={3} required/>
            <label for="">Password</label>
          </div>
          <input type="submit" name="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default SignUp