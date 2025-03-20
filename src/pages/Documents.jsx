import React, { useEffect, useState } from "react";
import { deleteDoc, getDocs, postDocument } from "../utils/axios";

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async() => {
      let docs = await getDocs();
      console.log(docs);
      setDocuments(docs)
    })()
  },[])

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = [
        "text/plain", 
        "application/pdf", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
        "application/msword"
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type! Please upload a .txt, .pdf, or .docx file.");
        return;
      }

      setSelectedFile(file);
      setMessage(""); // Reset message on new file selection
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !title || !description) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await postDocument(formData)
      console.log(response)

      setMessage("Upload successful!");
      setSelectedFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async(id) => {
    try {
      let response = await deleteDoc(id)
      console.log(response)
      setDocuments(documents.filter(doc => doc._id !== id));
      setMessage('Document deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.log(error)
      setMessage('There was an issue deleting the document!');

    }
  };

  return (
  <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 h-fit bg-white border-r border-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <div className="space-y-2">
          {documents.map(doc => (
            <div key={doc._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center">
                <span className="text-xs font-semibold uppercase bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                  {doc.type}
                </span>
                <span className="text-sm">{doc.title}</span>
              </div>
              <button 
                onClick={() => handleDelete(doc._id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          
          {documents.length === 0 && (
            <p className="text-gray-500 text-sm italic">No documents yet</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
          
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-3 text-white"
            required
          />
          
          {/* Description Input */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-3 text-white"
            required
          />
          
          {/* File Input */}
          <label className="relative cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition block text-center">
            Select File
            <input
              type="file"
              accept=".txt, .pdf, .docx, .doc"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
          
          {/* Display Selected File Name */}
          {selectedFile && <p className="text-gray-600 mt-2">Selected: {selectedFile.name}</p>}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
          
          {/* Status Message */}
          {message && (
            <p className={`mt-3 text-center text-sm font-medium ${message.includes('deleted') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>


//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>

//       {/* Title Input */}
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-md mb-3 text-white"
//         required
//       />

//       {/* Description Input */}
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded-md mb-3 text-white"
//         required
//       />

//       {/* File Input */}
//       <label className="relative cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition block text-center">
//         Select File
//         <input 
//           type="file" 
//           accept=".txt, .pdf, .docx, .doc" 
//           onChange={handleFileChange} 
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-white"
//         />
//       </label>

//       {/* Display Selected File Name */}
//       {selectedFile && <p className="text-gray-600 mt-2">Selected: {selectedFile.name}</p>}

//       {/* Submit Button */}
//       <button 
//         type="submit"
//         className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
//         disabled={loading}
//       >
//         {loading ? "Uploading..." : "Submit"}
//       </button>

//       {/* Status Message */}
//       {message && <p className="mt-3 text-center text-sm font-medium">{message}</p>}
//     </form>
  );
};


export default Documents;
