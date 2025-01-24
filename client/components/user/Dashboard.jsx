import axios from "axios"
import { useEffect, useState } from "react"

const Dashboard = ()=>{
    const [notes,setNotes] = useState([])

    useEffect(()=>{

        const accessToken = localStorage.getItem("accessToken")

        axios.get("http://localhost:3000/notes/",{headers:{
            "Authorization": `Bearer ${accessToken}`
        }})
        .then(res=>{
            setNotes(res.data)
            console.log(res.data)
        })
        .catch(err=>console.log(err.response.data))
    },[])

    const handleDelete=(noteId) =>{
        
    }

    const handleEdit=(noteId) =>{

    }

    return (
        <>
            <h2>Welcome to Dashboard !!!</h2>
            {/* Render notes here */}
            <ul>
                {notes.map(note => (
                    <li key={note._id}>
                    title:{note.title},
                    description:{note.desc}
                    <button onClick={()=>handleEdit(note._id)}>Edit</button>
                    <button onClick={()=>handleDelete(note._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
export { Dashboard }

