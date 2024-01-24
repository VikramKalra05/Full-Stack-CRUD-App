import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitUserDetails } from "./submitUserDetails";

const Register = () => {
    const Navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        email: ""
    })

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
                const result = await submitUserDetails(userDetails);
                alert(result);
                console.log(result);
                Navigate("/login");
            } catch (error) {
                alert(error);
            }
        }
        
    }

    useEffect(() => {
        submitUserDetails()
    }, [])


    return (
        <div>
            <h1>New User Register</h1>
            <div>
                <div>
                    <h2>Enter Username</h2>
                    <input 
                        type="text" 
                        placeholder="Username..." 
                        name="username" 
                        value={userDetails.username}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
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
                <button onClick={handleSubmit}>Register</button>
            </div>
        </div>
    )
}

export default Register;