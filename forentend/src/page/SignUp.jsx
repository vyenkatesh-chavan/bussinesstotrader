import React, { useEffect } from "react";
import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    //check if user is already logged in
    //if user is logged in then redirect to home page
    useEffect(() => {
    const auth=localStorage.getItem("user");
    if(auth){
        navigate("/");
    }
  });

   const call=async()=>{
       // console.log(name,email,password,confirmPassword);
        if(name && email && password && confirmPassword){
           if(password===confirmPassword){
           let result=await fetch("http://localhost:3000/register",{
            method : "POST",
            headers:{
                "Content-Type":"application/json",
                authorization:JSON.stringify(localStorage.getItem("token"))
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password
            })
           })
           result=await result.json();
           //this will store the user data in local storage
           localStorage.setItem("user",JSON.stringify(result));
           localStorage.setItem("token",result.token);
           navigate("/");
           }
           else {
            alert("Password and Confirm Password do not match");
           }
    }
    else{
            alert("Please fill all the fields");
    }
  }

    return(
        <>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
  <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
  
  <div>
    <label className="block text-sm font-medium text-gray-700">Name</label>
    <input 
      type="text" 
      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter your name"
      onChange={(e)=>setName(e.target.value)}
      value={name}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input 
      type="email" 
      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter your email"
      onChange={(e)=>setEmail(e.target.value)}
      value={email}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Password</label>
    <input 
      type="password" 
      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Enter your password"
      onChange={(e)=>setPassword(e.target.value)}
      value={password}
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
    <input 
      type="password" 
      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      placeholder="Confirm your password"
      onChange={((e)=>setConfirmPassword(e.target.value))}
      value={confirmPassword}
    />
  </div>
  
  <button 
  
   onClick={call}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
  >
    Sign Up
    
  </button>
  <Link to="/login" className="text-blue-600 hover:underline text-center block">
  <h4>already have account ? : Login </h4></Link>
  <Link to="/" className="text-blue-600 hover:underline text-center block">
  <h5 >Home</h5>
  </Link>
 
  {/* <p>{console.log(name,email,password)}</p> */}
</div>

        </>
    )
}

export default SignUp;