import plusIcon from "./plus.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [pendingChanges, setPendingChanges] = useState(false);
  const lastChangedData = useRef(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pendingChanges) {
        saveChanges();
        setPendingChanges(false);
      }
    }, 1000); // Attendre 1000 ms avant d'envoyer la requête

    return () => clearTimeout(timeout);
  }, [pendingChanges]);

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const data = await response.json();
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setNotes(data);
    setIsLoading(false);
  };

  const saveChanges = async () => {
    if (!selectedNote || !lastChangedData.current) return;

    const response = await fetch(`/notes/${selectedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lastChangedData.current),
    });

    if (response.ok) {
      fetchNotes(); // Actualiser les notes après avoir sauvegardé les changements
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
    lastChangedData.current = {
      ...lastChangedData.current,
      [name]: value,
      date: new Date().toISOString(),
    };
    setPendingChanges(true); // Déclencher la sauvegarde différée des changements
  };

  const createNote = async () => {
    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nouvelle note",
        content: "",
        date: new Date().toISOString(),
      }),
    });
    const data = await response.json();
    setNotes([data, ...notes]);
  };

  return (
    <>
      <aside className="Side">
        <div className="Add-button">
          <img src={plusIcon} alt="Ajouter une note" onClick={createNote} />
        </div>
        {isLoading
          ? "Chargement…"
          : notes?.map((note) => (
              <button
                className={`Note-button ${selectedNote && selectedNote.id === note.id ? 'selected' : ''} ${pendingChanges && selectedNote && selectedNote.id === note.id ? 'loading' : ''}`}
                key={note.id}
                onClick={() => setSelectedNote(note)}
              >
                {note.title} {pendingChanges && selectedNote && selectedNote.id === note.id && <span className="loader"></span>}
              </button>
            ))}
      </aside>
      <main className="Main">
        {selectedNote && (
          <div>
            <h2>
              <input
                type="text"
                name="title"
                value={selectedNote.title}
                onChange={handleChange}
              />
            </h2>
            <textarea
              name="content"
              value={selectedNote.content}
              onChange={handleChange}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
