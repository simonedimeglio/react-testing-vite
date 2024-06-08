**Guida all'Installazione e Introduzione ai Test in React**

Il testing è una parte cruciale dello sviluppo software. Aiuta a garantire che il nostro codice funzioni come previsto e a prevenire bug prima che raggiungano gli utenti finali.

In questa guida, ci concentreremo sui test in React usando *React Testing Library*.

### Tipi di Test

1. **Unit Test:** Verificano il funzionamento di singoli componenti o funzioni.
2. **Integration Test:** Verificano come i diversi componenti interagiscono tra loro.
3. **End-to-End (E2E) Test:** Testano l'applicazione intera simulando il comportamento dell'utente.

### Strumenti di Testing

- **React Testing Library**: Una libreria per testare i componenti React in un modo che rispecchi l'uso reale da parte degli utenti.
- **Vitest**: Un test runner veloce e moderno, particolarmente adatto per progetti Vite.

## Configurazione di React Testing Library

### Usando create-react-app:

Create React App include già Jest e React Testing Library, quindi non è necessario installarli separatamente. Puoi iniziare subito a scrivere i test.

### Usando Vite:

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

Prima però, cerchiamo di conoscere (*almeno un minimo*) la sintassi che utilizzeremo per effettuare i test.

### Sintassi RTL

La sintassi del test che andremo a realizzare fa parte del framework di testing React Testing Library (RTL).

Questo framework è progettato per testare componenti React in modo efficace e intuitivo, concentrandosi sul comportamento dell'interfaccia utente piuttosto che sulla struttura interna del componente: il problema è che introduce ulteriore sintassi da conoscere!

Cerchiamo di approfondire le basi:

1. **render**: La funzione `render` viene utilizzata per renderizzare un componente React nel "contenitore" virtuale fornito da RTL. Questo simula il rendering del componente come verrebbe fatto nell'applicazione reale.

2. **screen**: L'oggetto `screen` contiene una serie di metodi per selezionare elementi dall'interfaccia utente renderizzata. Ad esempio, `screen.getByText` viene utilizzato per trovare un elemento che contiene un certo testo.

3. **fireEvent**: L'oggetto `fireEvent` viene utilizzato per simulare eventi come clic, inserimento di testo, cambiamenti di valore e così via sugli elementi dell'interfaccia utente. *Ad esempio, `fireEvent.click` simula un clic su un elemento*.

4. **test**: La funzione `test` è fornita da Jest, il framework di testing su cui si basa RTL. È utilizzata per definire un singolo test all'interno del file di test. Un test può contenere più step per verificare il comportamento del componente.

5. **expect**: La funzione `expect` viene utilizzata per fare asserzioni sui risultati del test. Ad esempio, `expect(element).toBeInTheDocument()` verifica che un certo elemento sia presente nell'interfaccia utente renderizzata.

6. **Espressioni regolari**: Le espressioni regolari (regex) sono utilizzate per definire pattern di ricerca all'interno del testo degli elementi dell'interfaccia utente. Ad esempio, `/valore del contatore: 0/i` è un'espressione regolare che corrisponde a qualsiasi testo che contiene "valore del contatore: 0", indipendentemente dalle maiuscole o minuscole.


Spoiler: Questi sono solo alcuni dei concetti principali presenti nella sintassi del test.

## Esempio Pratico: Testiamo un Componente React Semplice

Iniziamo con l'esempio più classico e "scolastico" possibile: il famosissimo contatore.

Consideriamo un componente React che rappresenta il sopra-citato contatore. Questo componente mostra un numero e offre pulsanti per incrementare e decrementare il suo valore.

1) **Iniziamo con la creazione del componente `Contatore.jsx` nella cartella `src/components`:

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
