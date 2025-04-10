import React, { useEffect, useState } from "react";
import { messageFormatter } from "../lib/utils";
import { getDocs, getUser, postChat, postDeleteChat } from "../utils/axios";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


const Chat = () => {
    const [documentId, setDocumentId] = useState("");
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentMessageId, setCurrentMessageId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [docs, setDocs] = useState([]);
    const [threads, setThreads] = useState([]);
    // defined when a message thread is set, so user cannot change the doc id in existing message
    const [docSet, setDocSet] = useState(false);
    const [selectedThread, setSelectedThread] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);



    useEffect(() => {

        async function getUserData() {
            // get user messages and validate logged in
            let user = await getUser();
            let messageNames = user.messages
            setThreads(messageNames)

            // get user documents
            let docs = await getDocs();
            setDocs(docs);
        }

        getUserData()

    }, [])

    const handleDeleteThread = async () => {

        let res = await postDeleteChat(currentMessageId)
        console.log(res.ok, res)
        if (res.statusText === "OK") {
            setDeleteMessage(res.data.status)
            setTimeout(() => {
                window.location.href = "/chat"
            }, 2000)
        } else {
            setDeleteMessage(res.data.status)
        }

    }

    const handleSendMessage = async (event) => {
        event.preventDefault();

        if (!query.trim() || !documentId.trim()) {
            alert("Please enter both a query and document ID.");
            return;
        }

        const userMessage = { role: "user", text: query };
        setLoading(true);

        try {
            const response = await postChat(userMessage, documentId, messages);
            let data = response.data.data;
            setMessages((prev) => [...prev, data.query, data.response]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [...prev, { role: "ai", text: "Error getting response." }]);
        } finally {
            // get user documents
            let user = await getUser();
            let messageNames = user.messages
            setThreads(messageNames)
            setQuery("");
            setLoading(false);
        }
    };

    useEffect(() => {
        // if null this is new message
        if (selectedThread === null && !documentId) return

        let freshChat = threads.filter((_, i) => i === selectedThread)[0]
        let selectedDocument = docs.filter((doc) => doc._id === freshChat.documentId)[0]
        if (!freshChat || !selectedDocument) return;

        setDocumentId(selectedDocument._id)
        setDocSet(true)
        setMessages(JSON.parse(freshChat.messages))
    }, [selectedThread])

    console.log()
    return (
        <div className="flex h-auto bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 h-fit bg-white border-r border-gray-200 p-4">
                <h2 className="text-xl font-semibold mb-4">Message Threads</h2>
                <div className="space-y-2">
                    {threads.map((thread, index) => {
                            console.log(selectedThread, index);
                        return (
                            <div key={thread._id} className={`flex items-center justify-between p-3 rounded-md ${selectedThread === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"} hover:bg-blue-500 hover:text-white transition cursor-pointer`}
                                onClick={() => { setCurrentMessageId(thread._id); setSelectedThread(index) }}
                            >
                                <div className="flex items-center">
                                    <span className="text-xs font-semibold uppercase bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                                        {thread.type}
                                    </span>
                                    <span className="text-sm">{thread.name}</span>
                                </div>
                                <button
                                    onClick={() => { }}
                                    className={` ${selectedThread === index ? "text-white hover:text-red-500" : " text-red-500 hover:text-white"}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <div className="w-1/4 h-fit bg-white shadow-lg p-4 flex flex-col">
                        <h2 className="text-lg font-semibold mb-4">Message Threads</h2>
                        <div className="flex flex-col space-y-2">
                            {!threads[0] ? <p className="w-full flex justify-center mt-10">No Messages</p> : null}
                            {threads.map((thread, index) => (
                                <button
                                    key={index}
                                    className={`p-2 rounded-lg text-left ${selectedThread === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"} hover:bg-blue-500 hover:text-white transition`}
                                    onClick={() => { setCurrentMessageId(thread._id); setSelectedThread(index) }}
                                >
                                    {thread.name}
                                </button>
                            ))}
                        </div>
                    </div> */}

            < div className="flex-1 flex flex-col items-center justify-start p-3" >
                <h1 className="text-3xl font-bold mb-2">Chat with DocBot</h1>

                <div className="w-4/5 max-w-3xl mt-2 flex mb-4">
                    <button
                        className={`bg-blue-600 text-white px-4 py-2 rounded-l-md ${currentMessageId ? "hover:bg-blue-700" : "bg-gray-400"} transition`}
                        disabled={!currentMessageId}
                        onClick={() => {
                            handleDeleteThread()
                        }}
                    >
                        {deleteMessage ? deleteMessage : "Delete Thread"}
                    </button>
                    <select
                        id="docSelector"
                        value={documentId}
                        onChange={(e) => { setDocumentId(e.target.value) }}
                        className="flex-1 p-2 border border-gray-300 text-white"
                        disabled={docSet}
                    >
                        <option value="" disabled>Select a Document</option>
                        {docs.map((doc, index) => (
                            <option key={index} value={doc["_id"]}>{doc.title}</option>
                        ))}
                    </select>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
                        onClick={() => {
                            setMessages([]);
                            setDocSet(false);
                            setDocumentId("");
                            setSelectedThread(null)
                            setCurrentMessageId(null);
                        }}
                    >
                        New Message
                    </button>
                </div>

                {/* Chat Box */}
                < div className="w-4/5 max-w-3xl bg-white shadow-lg rounded-lg p-6 h-[60vh] overflow-y-auto" >
                    {
                        messages.length === 0 && (
                            <p className="text-gray-500 text-center">Start chatting with DocBot...</p>
                        )
                    }
                    {
                        messages.map((msg, index) => {
                            let msgObj = msg
                            if (typeof msg === "string") {
                                msgObj = messageFormatter(msg, index)
                            }
                            return (
                                <div
                                    key={index}
                                    className={`flex ${msgObj.role === "user" ? "justify-end" : "justify-start"} mb-2`}
                                >
                                    <div
                                        className={`${msgObj.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"} rounded-lg p-3 max-w-xs md:max-w-sm list-disc`}
                                    >
                                        <Markdown remarkPlugins={[remarkGfm]}>{msgObj.text}</Markdown>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {loading && <p className="text-center text-gray-400">Thinking...</p>}
                </div>

                {/* Inputs */}
                <form onSubmit={handleSendMessage} className="w-4/5 max-w-3xl mt-4">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-l-md text-white"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
                            disabled={loading}
                        >
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
