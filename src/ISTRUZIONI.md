# Configurazione di React Testing Library

### Usando create-react-app:

Create React App include già Jest e React Testing Library, quindi non è necessario installarli separatamente. Puoi iniziare subito a scrivere i test.

### Usando Vite (come in questo progetto):

Dobbiamo installare React Testing Library. Procedi con i seguenti passaggi.

1) **Installiamo Vitest, React Testing Library e jsdom**

```
npm install vitest @testing-library/react @testing-library/jest-dom jsdom
```

2) **Configuriamo Vitest**: Modifichiamo il file `vite.config.js` per includere la configurazione di Vitest.

```
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
```

3) **Inseriamo un nuovo file di setup per i test**

```
// src/setupTests.js
import "@testing-library/jest-dom";
```

4) **Aggiungiamo uno script nel `package.json` per eseguire i test**

```
{
  "scripts": {
    "test": "vitest"
  }
}
```

5) **Ora possiamo eseguire i test tramite il seguente comando:**

```
npm test
```

Dopo aver configurato il progetto, il prossimo passo sarà scrivere e eseguire i test. Inizieremo con un semplice esempio di componente React e il relativo test.
## Esempio Pratico: Testiamo un Componente React Semplice

Iniziamo con l'esempio più classico e "scolastico" possibile: il famosissimo contatore.

Consideriamo un componente React che rappresenta il sopra-citato contatore. Questo componente mostra un numero e offre pulsanti per incrementare e decrementare il suo valore.

1) **Iniziamo con la creazione del componente `Contatore.jsx` nella cartella `src/components/contatore`:

```
// components/Contatore.jsx
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

```

2) **Creiamo il file di testing relativo a questo componente, ovvero `Contatore.test.jsx`.**

```
// Importiamo alcune utility di testing da @testing-library/react
import { render, screen, fireEvent } from "@testing-library/react";

// Importiamo il componente Contatore che vogliamo testare
import Contatore from "./Contatore";

// Questo è un test che verifica se il contatore viene inizializzato correttamente con il valore 0
test("rende il contatore con valore iniziale 0", () => {
  // Renderizziamo il componente Contatore
  render(<Contatore />);

  // Cerchiamo un elemento nel documento che contiene il testo "Valore del contatore: 0"
  const contatoreElemento = screen.getByText(/valore del contatore: 0/i);

  // Verifichiamo che l'elemento sia presente nel documento
  expect(contatoreElemento).toBeInTheDocument();
});

// Questo test verifica se il contatore aumenta di uno quando viene premuto il pulsante "Incrementa"
test("incrementa il valore del contatore quando viene premuto il pulsante di incremento", () => {
  // Renderizziamo il componente Contatore
  render(<Contatore />);

  // Cerchiamo il pulsante "Incrementa" nel documento
  const pulsanteIncrementa = screen.getByText(/incrementa/i);

  // Simuliamo un click sul pulsante "Incrementa"
  fireEvent.click(pulsanteIncrementa);

  // Cerchiamo un elemento nel documento che contiene il testo "Valore del contatore: 1"
  // La sintassi con /.../ è una espressione regolare in JavaScript
  // NB: il /i indica CASE INSENSITIVE
  const contatoreElemento = screen.getByText(/valore del contatore: 1/i);

  // Verifichiamo che l'elemento sia presente nel documento
  expect(contatoreElemento).toBeInTheDocument();
});

// Questo test verifica se il contatore diminuisce di uno quando viene premuto il pulsante "Decrementa"
test("decrementa il valore del contatore quando viene premuto il pulsante di decremento", () => {
  // Renderizziamo il componente Contatore
  render(<Contatore />);

  // Cerchiamo il pulsante "Decrementa" nel documento
  const pulsanteDecrementa = screen.getByText(/decrementa/i);

  // Simuliamo un click sul pulsante "Decrementa"
  fireEvent.click(pulsanteDecrementa);

  // Cerchiamo un elemento nel documento che contiene il testo "Valore del contatore: -1"
  const contatoreElemento = screen.getByText(/valore del contatore: -1/i);

  // Verifichiamo che l'elemento sia presente nel documento
  expect(contatoreElemento).toBeInTheDocument();
});
```

3) **Lanciamo in terminale il comando per iniziare i test, ovvero `npm test`. Il risultato sarà il seguente:**

```
✓ src/components/Contatore.test.jsx (3)
✓ rende il contatore con valore iniziale 0
✓ incrementa il valore del contatore quando viene premuto il pulsante di incremento
✓ decrementa il valore del contatore quando viene premuto il pulsante di decremento

Test Files  1 passed (1)
Tests  3 passed (3)
Start at  19:36:26
Duration  135ms
```

### Componente Utenti

Per dimostrare un caso d'uso più realistico, abbiamo anche testato un componente `Utenti` che recupera una lista di utenti da un'API esterna e permette di filtrarli e selezionarli.

Il componente `Utenti.jsx` si occupa di:

1. Recuperare una lista di utenti dall'API "https://jsonplaceholder.typicode.com/users"
2. Consentire all'utente di filtrare la lista di utenti tramite un'input di ricerca
3. Evidenziare l'utente selezionato cambiando lo stile della relativa card

I test per questo componente, presenti in `Utenti.test.jsx`, coprono i seguenti casi:

1. Verifica che vengano renderizzati 10 utenti (il numero totale di utenti restituiti dall'API)
2. Verifica che la lista di utenti venga filtrata correttamente quando l'utente digita nell'input di ricerca
3. Verifica che la card dell'utente selezionato cambi di colore di sfondo
4. Verifica che solo una card alla volta abbia lo sfondo colorato (quando si seleziona un nuovo utente, la precedente card selezionata torna allo stile normale)

Per testare il recupero dei dati dall'API, abbiamo utilizzato la funzione `vi.spyOn` di Vitest per simulare la risposta di `fetch` e restituire dei dati fittizi. Questo approccio è utile per rendere i test indipendenti da servizi esterni.
