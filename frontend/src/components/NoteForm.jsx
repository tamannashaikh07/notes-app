import { useState } from "react";
import { X } from "lucide-react";

function NoteForm({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("medium");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ title: title.trim(), content: content.trim(), priority, status: "pending" });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <p className="eyebrow">NEW NOTE</p>
            <h2>Create Note</h2>
          </div>
          <button className="icon-btn" onClick={onClose}><X /></button>
        </div>

        <form onSubmit={submit}>
          <label>Title</label>
          <input
            autoFocus
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Content</label>
          <textarea
            rows="5"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;