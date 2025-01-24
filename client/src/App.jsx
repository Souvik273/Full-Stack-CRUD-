import {Routes,Route } from "react-router-dom"
import { LogIn } from "../components/Login"
import { SignUp } from "../components/SignUp"
function App() {

  return (
    <>
        <Routes>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    </>
  )
}

export default App
