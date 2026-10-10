import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import { createNote, deleteNote, getNotes, updateNote } from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getNotes();
      setNotes(data);
    } catch {
      setError("Backend is not running. Showing an empty notes list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const addNote = async (note) => {
    try {
      const created = await createNote(note);
      setNotes((current) => [created, ...current]);
      setShowForm(false);
    } catch {
      setError("Could not create the note.");
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((current) => current.filter((note) => note.id !== id));
    } catch {
      setError("Could not delete the note.");
    }
  };

  const toggleStatus = async (note) => {
    try {
      const updated = await updateNote(note.id, {
        status: note.status === "pending" ? "completed" : "pending"
      });
      setNotes((current) =>
        current.map((item) => (item.id === note.id ? updated : item))
      );
    } catch {
      setError("Could not update the note.");
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesFilter = filter === "all" || note.status === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">PERSONAL WORKSPACE</p>
          <h1>My Notes</h1>
          <p className="subtitle">Keep your tasks organized and focused.</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <Plus size={19} /> Add Note
        </button>
      </header>

      <section className="toolbar">
        <div className="filters">
          {["all", "pending", "completed"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="search">
          <Search size={18} />
          <input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {error && <div className="error">{error}</div>}

      <main className="notes-container">
        {loading ? (
          <div className="empty">
            <h2>Loading notes...</h2>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="empty">
            <h2>No notes found</h2>
            <p>Create a note to get started.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={removeNote}
              onToggleStatus={toggleStatus}
            />
          ))
        )}
      </main>

      {showForm && (
        <NoteForm
          onAdd={addNote}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;