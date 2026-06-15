import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { subscribeNotesRefresh, notifyNotesRefresh } from "../utils/notesBus";

export default function useNotes(filters) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      Object.keys(filters || {}).forEach((k) => {
        const v = filters[k];
        if (v !== undefined && v !== null && v !== "") params[k] = v;
      });
      const res = await api.get("/notes", { params });
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    const unsub = subscribeNotesRefresh(() => fetchNotes());
    return () => unsub();
  }, [JSON.stringify(filters)]);

  const createNote = async (noteData) => {
    const res = await api.post("/notes", noteData);
    setNotes((prev) => [res.data, ...prev]);
    notifyNotesRefresh();
    return res.data;
  };

  const updateNote = async (id, updates) => {
    const res = await api.put(`/notes/${id}`, updates);
    setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    notifyNotesRefresh();
    return res.data;
  };

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
    notifyNotesRefresh();
  };

  const trashNote = (id) => updateNote(id, { status: "trash" });
  const archiveNote = (id) => updateNote(id, { status: "archived" });
  const restoreNote = (id) => updateNote(id, { status: "active" });
  const pinNote = (id, current) => updateNote(id, { isPinned: !current });
  const favoriteNote = (id, current) =>
    updateNote(id, { isFavorite: !current });

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    trashNote,
    archiveNote,
    restoreNote,
    pinNote,
    favoriteNote,
  };
}
