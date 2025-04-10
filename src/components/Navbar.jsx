import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getUser, logout } from "../utils/axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [path, setPath] = useState(null);
  let page = useRef()


  useEffect(() => {
    async function checkLoggedIn() {
      let user = await getUser();
      setUser(user);
    }
    checkLoggedIn()
    page.current = window.location.pathname;
    console.log(page.current)
    setPath(page.current)

  }, []);

    const handleLogout = async () => {
        await logout()
        setUser(null);
        window.location.href = "/";

    };

  return (
    <nav className="p-6 w-full bg-gray-900 text-white flex justify-between">
      <div className="flex gap-2">
        <Link to="/" className="text-xl font-bold">DocBot</Link>
        {user?.name && <p className="text-xl font-bold">- {user?.name}</p>}
      </div>
      <div>
        {!user ? (
          <>
            <Link to="/login" className="mx-2">Login</Link>
            <Link to="/register" className="mx-2">Register</Link>
          </>
        ) : (
          <>
            <Link to="/documents" className={`mx-2 ${path === "/documents" ? "bg-purp text-white hover:text-white cursor-default rounded-md p-2" : ""}`} onClick={() => {setPath("/documents")}}>Documents</Link>
            <Link to="/chat" className={`mx-2 ${path === "/chat" ? "bg-purp text-white rounded-md p-2 hover:text-white cursor-default" : ""}`} onClick={() => {setPath("/chat")}}>Chat</Link>
            <button onClick={handleLogout} className="ml-4">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
