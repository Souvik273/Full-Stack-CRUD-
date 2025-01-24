import axios from "axios";
import env from "dotenv";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    desc: "",
  });
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null); 

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch notes from the server
    axios
      .get(`${env.BACKEND_URL}/notes/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, [accessToken]);

  const handleDelete = (noteId) => {
    axios
      .delete(`${env.BACKEND_URL}/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        console.log(`Note deleted successfully`);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId)); // Update UI
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (noteId) => {
    axios
      .patch(
        `${env.BACKEND_URL}/notes/${noteId}`,
        updatedData, // Send updated data to the server
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        console.log(`Note with ID ${noteId} updated successfully`);
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? { ...note, ...updatedData } : note
          )
        ); // Update UI
        setShowUpdateFields(false); // Hide update fields
        setEditingNoteId(null); // Reset editing note ID
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Welcome to Dashboard !!!</h2>

      {/* Render notes here */}
      <ul>
        {notes.length !== 0 ? (
          notes.map((note) => (
            <li key={note._id}>
              <p>Title: {note.title}</p>
              <p>Description: {note.desc}</p>
              <button
                onClick={() => {
                  setShowUpdateFields(true);
                  setEditingNoteId(note._id); // Set the ID of the note being edited
                  setUpdatedData({ title: note.title, desc: note.desc }); // Pre-fill the fields
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>You don&apos;t have any notes...</p>
        )}
      </ul>

      {/* Show update fields when editing a note */}
      {showUpdateFields && editingNoteId && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={updatedData.title}
            onChange={(e) =>
              setUpdatedData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedData.desc}
            onChange={(e) =>
              setUpdatedData((prev) => ({ ...prev, desc: e.target.value }))
            }
          />
          <button onClick={() => handleEdit(editingNoteId)}>Update</button>
        </div>
      )}

      <Link to={"/create-note"}>Create new Notes?</Link>
    </>
  );
};

export { Dashboard };

