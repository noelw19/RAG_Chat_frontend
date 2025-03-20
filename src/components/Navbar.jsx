import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser, logout } from "../utils/axios";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkLoggedIn() {
      let user = await getUser();
      setUser(user);
    }
    checkLoggedIn()
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
            <Link to="/documents" className="mx-2">Documents</Link>
            <Link to="/chat" className="mx-2">Chat</Link>
            <button onClick={handleLogout} className="ml-4">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
