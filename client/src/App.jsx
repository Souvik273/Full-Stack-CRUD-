import { Route, Routes } from "react-router-dom"
import { CreateNote } from "../components/notes/CreateNote"
import PrivateRoute from "../components/PrivateRote"
import { Dashboard } from "../components/user/Dashboard"
import { LogIn } from "../components/user/Login"
import { SignUp } from "../components/user/SignUp"
function App() {

  return (
    <>
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path="/create-note" element={<PrivateRoute><CreateNote/></PrivateRoute>}/>
        </Routes>
    </>
  )
}

export default App
