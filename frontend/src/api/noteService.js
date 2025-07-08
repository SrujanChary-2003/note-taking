import api from "./api";

export const createNote = (content) => api.post("/notes", { content });
export const getNotes = () => api.get("/notes");
export const updateNote = (id, content) => api.put(`/notes/${id}`, { content });
export const deleteNote = (id) => api.delete(`/notes/${id}`);
