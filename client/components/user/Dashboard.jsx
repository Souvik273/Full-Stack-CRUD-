import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { EditNotes } from "../notes/EditNotes"

const Dashboard = ()=>{
    const navigate = useNavigate()
    const [notes,setNotes] = useState([])

    const accessToken = localStorage.getItem("accessToken")

    useEffect(()=>{

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
        axios.delete(`http://localhost:3000/notes/${noteId}`,{headers:{
            "Authorization": `Bearer ${accessToken}`
        }})
        .then(()=>{
            console.log(`Note deleted successfully`)
            navigate("/dashboard")
    })
        .catch(err=>console.log(err))
    }

    const handleEdit=(noteId) =>{
        <EditNotes noteId={noteId}/>
    }

    return (
        <>
            <h2>Welcome to Dashboard !!!</h2>
            
            {/* Render notes here */}
            <ul>
                {notes.length !==0 ? notes.map(note => (
                    <li key={note._id}>
                    title:{note.title},
                    description:{note.desc}
                    <button onClick={()=>handleEdit(note._id)}>Edit</button>
                    <button onClick={()=>handleDelete(note._id)}>Delete</button>
                    </li>
                )):"you don't have any notes...  "}
                <Link to={"/create-note"}>create new Notes ? </Link>
            </ul>
        </>
    )
}
export { Dashboard }

