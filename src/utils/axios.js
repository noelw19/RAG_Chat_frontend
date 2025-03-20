import axios from "axios"

const BASE_URL = "http://localhost:3000/api";

let backend_caller = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export async function getUser() {
    try {
        let res = await backend_caller.get("/auth/profile");
        let user = res.data.data.user
        return user
    } catch (error) {
        console.log("Error in getUser: ", error)
        throw error
    }
}

export async function getDocs() {
    try {
        let res = await backend_caller.get("/documents/");
        let docs = res.data.data.documents
        return docs
    } catch (error) {
        console.log("Error in getDocs: ", error)
    }
}

export async function deleteDoc(id) {
    try {
        let res = await backend_caller.delete(`/documents/${id}`);
        let docs = res
        return docs
    } catch (error) {
        console.log("Error in getDocs: ", error)
        throw error
    }
}

export async function logout() {
    try {
        await backend_caller.post('/auth/logout', {})
    } catch (error) {
        console.log("Error logging out... ", error)
    }
}

export async function login(form) {
    try {
        let login_response = await backend_caller.post("/auth/login", form);
        return login_response
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function postDocument(formData) {
    let doc_response = await backend_caller.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data"}
    });
    return doc_response
}

export async function postChat(query, documentId, chatHistory) {
    let response = await backend_caller.post("/chat", {
        query,
        documentId,
        chatHistory
    });
    return response;
}

export async function postDeleteChat(threadId) {
    let response = await backend_caller.post("/chat/delete", {
        threadId
    });
    return response;
}