import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to <span className="text-blue-600">DocBot</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A minimalistic platform for **secure document uploads and AI-powered chat**.
        </p>

        <div className="mt-6 space-x-4">
          <Link to="/register" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Get Started
          </Link>
          <Link to="/login" className="px-6 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100">
            Login
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-xl font-semibold text-gray-800">Secure Uploads</h3>
            <p className="text-gray-600">Upload and manage your documents securely.</p>
          </div>

          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-xl font-semibold text-gray-800">AI Chat</h3>
            <p className="text-gray-600">Interact with our AI assistant using your documents.</p>
          </div>

          <div className="p-4 bg-white shadow rounded-md">
            <h3 className="text-xl font-semibold text-gray-800">Minimalistic UI</h3>
            <p className="text-gray-600">A clean and distraction-free experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
