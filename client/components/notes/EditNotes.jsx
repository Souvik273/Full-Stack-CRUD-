import axios from "axios"

export const EditNotes = ({noteId})=>{
    axios.patch(`http://localhost:3000/${noteId}`,{
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(console.log(`note with noteId:${noteId} updated`))
    .catch(err=>console.log(err))
}