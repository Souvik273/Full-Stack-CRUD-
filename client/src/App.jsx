import { Route, Routes } from "react-router-dom"
import { LogIn } from "../components/user/Login"
import { SignUp } from "../components/user/SignUp"
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
