import { Route, Routes } from "react-router-dom"
import { CreateNote } from "../components/notes/CreateNote"
import { LogIn } from "../components/user/Login"
import { SignUp } from "../components/user/SignUp"
function App() {

  return (
    <>
        <Routes>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/create-note" element={<CreateNote/>}/>
        </Routes>
    </>
  )
}

export default App
