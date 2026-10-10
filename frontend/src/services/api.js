import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

export const getNotes = async () => (await api.get("/notes")).data;
export const createNote = async (note) => (await api.post("/notes", note)).data;
export const updateNote = async (id, note) => (await api.patch(`/notes/${id}`, note)).data;
export const deleteNote = async (id) => (await api.delete(`/notes/${id}`)).data;