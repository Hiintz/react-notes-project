import "./App.css";
import Button from "./components/Button/Button";
import { Loading } from "./components/Loading/Loading";
import { HeaderAside } from "./components/HeaderAside/HeaderAside";
import { useEffect, useState, useRef } from "react";
import dayNight from "./day-night.svg";
import dayNightLight from "./day-night-light.svg";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});
  const lastChangedData = useRef({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotes();
    fetchUser();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pendingChanges[selectedNoteId]) { // Vérifier si des changements sont en attente
        saveChanges(selectedNoteId); // Sauvegarder les changements
        setPendingChanges((prev) => ({ // Mettre à jour l'état des changements en attente
          ...prev, // Conserver les autres notes inchangées
          [selectedNoteId]: false, // Marquer les changements comme sauvegardés
        }));
      }
    }, 1000); // Attendre 1000 ms avant d'envoyer la requête

    return () => clearTimeout(timeout);
  }, [pendingChanges, selectedNoteId]);

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const data = await response.json();
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setNotes(data);
    setIsLoading(false);
  };

  const fetchUser = async () => {
    const response = await fetch("/profile");
    const user = await response.json();
    setUser(user);
  };

  const saveChanges = async (noteId) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note || !lastChangedData.current[noteId]) return;

    const response = await fetch(`/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lastChangedData.current[noteId]),
    });

    if (response.ok) {
      fetchNotes(); // Actualiser les notes après avoir sauvegardé les changements
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    lastChangedData.current[selectedNoteId] = {
      ...lastChangedData.current[selectedNoteId],
      [name]: value,
      date: new Date().toISOString(),
    };
    setPendingChanges((prev) => ({
      ...prev,
      [selectedNoteId]: true,
    }));
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
    setSelectedNoteId(data.id);
  };

  const deleteNote = async (noteId) => {
    const response = await fetch(`/notes/${noteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setNotes(notes.filter((note) => note.id !== noteId));
      // on se déselectionne
      setSelectedNoteId(null);
    }
  };

  const checkNote = async (noteId) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    const response = await fetch(`/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCheck: !note.isCheck }),
    });

    if (response.ok) {
      fetchNotes();
    }
  }

  const unCheckNote = async (noteId) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    const response = await fetch(`/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCheck: !note.isCheck }),
    });

    if (response.ok) {
      fetchNotes();
    }
  }

  const pinNote = async (noteId) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    const response = await fetch(`/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isPin: !note.isPin }),
    });

    if (response.ok) {
      fetchNotes();
    }
  }

  const unPinNote = async (noteId) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    const response = await fetch(`/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isPin: !note.isPin }),
    });

    if (response.ok) {
      fetchNotes();
    }
  }

  const filterNotes = (notes) => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  if (!isDarkMode) {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }

  return (
    <>
      <aside className={isDarkMode ? "Side" : "Side-light"}>
        <HeaderAside createNote={createNote} handleSearch={setSearchTerm} isDarkMode={isDarkMode}/>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {filterNotes(notes.filter((note) => note.isPin)).map((note) => (
              <Button
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                onDelete={() => deleteNote(note.id)}
                onCheck={() => checkNote(note.id)}
                onUnCheck={() => unCheckNote(note.id)}
                onPin={() => pinNote(note.id)}
                onUnPin={() => unPinNote(note.id)}
                selected={selectedNoteId === note.id}
                loading={pendingChanges[note.id]}
                isCheck={note.isCheck}
                isPin={note.isPin}
                isDarkMode={isDarkMode}
                className={isDarkMode ? `Note-button` : `Note-button-light`}
              >
                {note.title}
              </Button>
            ))}
            {notes.some((note) => note.isPin) && <hr />}
            {filterNotes(notes.filter((note) => !note.isPin)).map((note) => (
              <Button
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                onDelete={() => deleteNote(note.id)}
                onCheck={() => checkNote(note.id)}
                onUnCheck={() => unCheckNote(note.id)}
                onPin={() => pinNote(note.id)}
                onUnPin={() => unPinNote(note.id)}
                selected={selectedNoteId === note.id}
                loading={pendingChanges[note.id]}
                isCheck={note.isCheck}
                isPin={note.isPin}
                isDarkMode={isDarkMode}
                className={isDarkMode ? `Note-button` : `Note-button-light`}
              >
                {note.title}
              </Button>
            ))}
          </>
        )}
      </aside>
      <main className="Main">
        <div className={isDarkMode ? `UserName` : `UserName-light`}>{user && user.name}<br />
          {isDarkMode ? (
            <img src={dayNight} alt="Mode nuit" onClick={toggleDarkMode} className="dayNight" />
          ) : (
            <img src={dayNightLight} alt="Mode jour" onClick={toggleDarkMode} className="dayNight" />
          )}
        </div>
        {selectedNoteId && (
          <div>
            <h2>
              <input
                type="text"
                name="title"
                maxLength={30}
                value={
                  lastChangedData.current[selectedNoteId]?.title ||
                  notes.find((note) => note.id === selectedNoteId)?.title ||
                  ""
                }
                onChange={handleChange}
              />
            </h2>
            <textarea
              name="content"
              value={
                lastChangedData.current[selectedNoteId]?.content ||
                notes.find((note) => note.id === selectedNoteId)?.content ||
                ""
              }
              onChange={handleChange}
            />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
