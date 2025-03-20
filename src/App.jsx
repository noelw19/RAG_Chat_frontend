import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/protectedRoute";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import { getUser } from "./utils/axios";
import { useEffect, useState } from "react";

function App() {
  let [user, setUser] = useState(null)
  useEffect(() => {
    (async() => {
      try {
        let user = await getUser();
        setUser(user)
      } catch (error) {
        console.log(error)
        setUser("ERROR")
      }
    })()
  },[])

  return (
    ( <Router>
      <div className=" bg-gray-100 text-gray-900 main h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/documents" element={<ProtectedRoute user={user}><Documents /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute user={user}><Chat /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>)
  );
}

export default App;
