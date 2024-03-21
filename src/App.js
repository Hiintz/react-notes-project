import plusIcon from "./plus.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "./components/Button/Button";

// Cycle de vie du composant App :
// Initialement : `notes` vaut `null`, donc pas d'affichage dans le header
// Après le rendu initial : lancement de la requête au serveur (GET /notes)
// À la réponse du serveur : `notes` devient la réponse du serveur, rafraîchissement de l'affichage

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState(null);

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const data = await response.json();
    // on trie les notes par date décroissante
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    setNotes(data);
    setIsLoading(false);
  };

  const createNote = async () => {
    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Nouvelle note", 
      content: "",
      date: new Date().toISOString(),
    }),
    });
    const data = await response.json();

    // on ajoute la nouvelle note à la liste des notes, au début
    setNotes([data, ...notes]);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <aside className="Side">
        <div className="Add-button">
          <img src={plusIcon} alt="Ajouter une note" onClick={createNote}/>
        </div>
        
        {isLoading
          ? "Chargement…"
          : notes?.map((note) => (
              <button className="Note-button" key={note.id}>
                {note.title}
              </button>
            ))}
      </aside>
      <main className="Main"></main>
    </>
  );
}

export default App;