import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.svg";
import NoteEditor from "../../components/NoteEditor";

interface User {
  name: string;
  email: string;
}

interface Note {
  _id: string;
  content: string;
}
const BASEURL = import.meta.env.VITE_BACKEND_URL;

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${BASEURL}/api/notes`, {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleSaveNote = async (content: string) => {
    try {
      if (editingNote) {
        const res = await axios.put(
          `${BASEURL}/api/notes/${editingNote._id}`,
          { content },
          { withCredentials: true }
        );
        setNotes((prev) =>
          prev.map((note) => (note._id === editingNote._id ? res.data : note))
        );
      } else {
        const res = await axios.post(
          `${BASEURL}/api/notes`,
          { content },
          { withCredentials: true }
        );
        setNotes([...notes, res.data]);
      }
      setShowEditor(false);
    } catch (err) {
      console.error("Failed to save note", err);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`${BASEURL}/api/notes/${id}`, {
        withCredentials: true,
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const handleSignOut = async () => {
    await axios.post(
      `${BASEURL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="lg:h-[60px]" />
          <h1 className="lg:text-3xl md:text-2xl font-medium">Dashboard</h1>
        </div>
        <button
          onClick={handleSignOut}
          className="text-blue-500 hover:underline md:text-xl lg:text-1xl px-4 py-3 bg-stone-100"
        >
          Sign out
        </button>
      </div>

      {/* Welcome */}
      {user && (
        <div className="bg-gray-100 p-4 rounded shadow-sm mb-6 text-center md:text-left lg:h-[100px] ">
          <h2 className="font-semibold lg:text-1xl md:text-1xl sm:text-1xl mb-3">
            Welcome, {user.name} !
          </h2>
          <p className="lg:text-1xl md:text-0.5 text-gray-700">
            Email: {user.email}
          </p>
        </div>
      )}

      {/* Create Note */}
      <div className="flex justify-center md:justify-start mb-6">
        <button
          onClick={handleCreateNote}
          className="bg-blue-600 hover:bg-blue-700 text-white lg:text-1xl sm:text-xl md:text-1xl px-6 py-2 rounded"
        >
          Create Note
        </button>
      </div>

      {/* Notes List */}
      <div>
        <h3 className="text-md font-semibold mb-3">Notes</h3>
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center bg-white border px-4 py-2 rounded shadow-sm"
            >
              <p>{note.content}</p>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditNote(note)}
                  className="text-green-500 hover:text-green-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <NoteEditor
          initialContent={editingNote?.content || ""}
          onSave={handleSaveNote}
          onCancel={() => setShowEditor(false)}
        />
      )}
    </div>
  );
};

export default Home;
