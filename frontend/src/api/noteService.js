import api from "./api";

export const createNote = (content) => api.post("/api/notes", { content });
export const getNotes = () => api.get("/api/notes");
export const updateNote = (id, content) =>
  api.put(`/api/notes/${id}`, { content });
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);
