import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    setIsLoading(true);
    const response = await fetch('/notes');
    const data = await response.json();

    setNotes(data);
    setIsLoading(false);
  }

  useEffect(() => {
    
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Notes App</h1>
        <p>Welcome to the notes app!</p>
        {isLoading ? (
          <div>
            <p>Chargement ...</p>
          </div>
        ) : (
          <ul>
            {notes.map(note => (
              <li key={note.id}>{note.title}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
