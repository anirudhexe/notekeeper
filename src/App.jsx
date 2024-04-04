import { Home } from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import Notestate from "./context/notes/NoteState"
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert,setAlert]=useState(null);
  
  const showAlert=(message,type)=>{
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  
  return (
    <div>
      <Notestate>
        <BrowserRouter>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} ></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert}/>} ></Route>
              <Route path="/register" element={<SignUp showAlert={showAlert}/>} ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Notestate>
    </div>
  );
}

export default App;
