import axios from "axios"
import { useState } from "react"

const LogIn = ()=>{
    const [loginData , setLoginData] = useState({email:"",pass:""})

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(loginData)

        axios.post(`http://localhost:3000/users/login`,
        loginData)
        .then((res) => {
            localStorage.setItem("accessToken", res.data.token)
            console.log(res.data)
        })
        .catch(err=>console.log(err.response.data))
    }

    return (
        <>
            <h2>This is LogIn page</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={(e)=>setLoginData((prev)=>({...prev,email:e.target.value}))}/>
                <input type="password" placeholder="password" onChange={(e)=>setLoginData((prev)=>({...prev,pass:e.target.value}))}/>
                <input type="submit" placeholder="Submit"/>
            </form>
        </>
    )
}

export { LogIn }

