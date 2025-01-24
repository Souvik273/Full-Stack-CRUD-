import axios from 'axios';
import env from "dotenv";
import { useState } from "react";

const SignUp = ()=>{
    const [userData , setUserData] = useState({
        username:"",
        email:"",
        pass:""
    })
    const handleSubmit = ()=>{
        console.log(userData)
        axios.post(`${env.BACKEND_URL}/users`, userData)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
        console.log(`data submitted`)
    }
    return (
        <>
            <h2>This is SignUp page</h2>
            <input type="text" placeholder="username" onChange={(e)=>setUserData((prev)=>({...prev,username:e.target.value}))}/>
            <input type="email" placeholder="email" onChange={(e)=>setUserData((prev)=>({...prev,email:e.target.value}))}/>
            <input type="password" placeholder="password" onChange={(e)=>setUserData((prev)=>({...prev,pass:e.target.value}))}/>

            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export { SignUp };

