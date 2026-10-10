import { Trash2, Check, Circle } from "lucide-react";

function NoteCard({ note, onDelete, onToggleStatus }) {
  return (
    <article className="note-card">
      <div className="note-header">
        <h2>{note.title}</h2>
        <span className={`priority ${note.priority}`}>{note.priority}</span>
      </div>

      <p className="content">{note.content}</p>

      <div className="note-footer">
        <button
          className={`status-btn ${note.status}`}
          onClick={() => onToggleStatus(note)}
        >
          {note.status === "completed" ? <Check size={16} /> : <Circle size={16} />}
          {note.status}
        </button>

        <button className="delete-btn" onClick={() => onDelete(note.id)}>
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;