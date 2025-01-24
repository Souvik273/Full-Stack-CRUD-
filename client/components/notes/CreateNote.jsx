import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const CreateNote = ()=>{

    const [note,setNote] = useState({title:"",desc:""})

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(note)
        const accessToken = localStorage.getItem("accessToken")

        axios.post("http://localhost:3000/notes/",
            note,
            {headers:{
                "Authorization": `Bearer ${accessToken}`
            }}
            
        )
        .then((res)=>{
            console.log(res.data)
        })
        .catch(err=>console.log(err.response.data))
    }

    return (
        <>
            <h2>Create Your note</h2>

            <input type="text" placeholder="title" onChange={(e)=>setNote((prev)=>({...prev,title:e.target.value}))}/>

            <textarea placeholder="Enter Your Note Here" onChange={(e)=>setNote((prev)=>({...prev,desc:e.target.value}))}></textarea>

            <button onClick={handleSubmit}>Cretae Note</button>

            <Link to={"/dashboard"}>Dashboard</Link>
        </>
    )
}

export { CreateNote }

