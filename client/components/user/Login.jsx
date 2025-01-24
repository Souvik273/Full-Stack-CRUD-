import axios from "axios";
import env from "dotenv";
import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const LogIn = ()=>{
    const navigate = useNavigate();
    const [loginData , setLoginData] = useState({email:"",pass:""})

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(loginData)

        axios.post(`${env.BACKEND_URL}/users/login`,
        loginData)
        .then((res) => {
            localStorage.setItem("accessToken", res.data.token)
            console.log(res.data)
            navigate("/dashboard");
        })
        .catch(err=>console.log(err.response.data))
    }

    return (
        <>
            <h2>This is LogIn page</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={(e)=>setLoginData((prev)=>({...prev,email:e.target.value}))}/>
                <input type="password" placeholder="password" onChange={(e)=>setLoginData((prev)=>({...prev,pass:e.target.value}))}/>
                <p>Dont have account ? <Link to={"/SignUp"}>SignUp</Link></p>
                <input type="submit" placeholder="Submit"/>
            </form>
        </>
    )
}

export { LogIn };

