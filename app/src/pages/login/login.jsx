import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./loginUser";


const Login = () => {
    const Navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUserDetails({
            ...userDetails,
            [name]: value
        })

    }
    
    const handleSubmit = async () => {
        console.log(userDetails);

        if(userDetails){
            try {
                const result = await loginUser(userDetails);
                console.log(result);
                if(result.token){
                    alert("User has been logged in successfully");
                    Navigate("/");
                }else{
                    alert("Wrong Password!");
                }
            } catch (error) {
                alert(error);
            }
        }
        
    }

    return (
        <div>
            <h1>Login Page</h1>
            <div>
                <div>
                    <h2>Enter Email</h2>
                    <input 
                        type="email" 
                        placeholder="Email..." 
                        name="email" 
                        value={userDetails.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <h2>Enter Password</h2>
                    <input 
                        type="password" 
                        placeholder="Password..." 
                        name="password" 
                        value={userDetails.password}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}

export default Login;