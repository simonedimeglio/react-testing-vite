// src/components/Utenti.jsx
import { useState, useEffect } from "react";
import "./Utenti.css";

export default function Utenti() {
  const [listaUtenti, setListaUtenti] = useState([]);
  const [valoreRicerca, setValoreRicerca] = useState("");
  const [utenteSelezionato, setUtenteSelezionato] = useState(null);

  useEffect(() => {
    async function fetchUtenti() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      setListaUtenti(data);
    }
    fetchUtenti();
  }, []);

  function gestisciRicerca(e) {
    setValoreRicerca(e.target.value);
  }

  function gestisciClick(id) {
    setUtenteSelezionato(id);
  }

  const listaUtentiFiltrati = listaUtenti.filter((utente) =>
    utente.name.toLowerCase().includes(valoreRicerca.toLowerCase()),
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Ricerca per nome"
        value={valoreRicerca}
        onChange={gestisciRicerca}
        className="ricerca"
      />
      <div>
        {listaUtentiFiltrati.map((utente) => (
          <div
            key={utente.id}
            onClick={() => gestisciClick(utente.id)}
            className={`card ${utenteSelezionato === utente.id ? "selezionato" : ""}`}
          >
            <h3>{utente.name}</h3>
            <p>{utente.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
