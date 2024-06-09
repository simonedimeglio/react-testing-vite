import { useState } from "react";

export default function Contatore() {
  const [contatore, setContatore] = useState(0);

  function incrementa() {
    setContatore(contatore + 1);
  }

  function decrementa() {
    setContatore(contatore - 1);
  }

  return (
    <div>
      <h2>Valore del contatore: {contatore}</h2>
      <button onClick={incrementa}>Incrementa</button>
      <button onClick={decrementa}>Decrementa</button>
    </div>
  );
}
