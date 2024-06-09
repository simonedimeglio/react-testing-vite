# Il Testing in React

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

## Sintassi RTL

La sintassi del test che andremo a realizzare fa parte del framework di testing React Testing Library (RTL).

Questo framework è progettato per testare componenti React in modo efficace e intuitivo, concentrandosi sul comportamento dell'interfaccia utente piuttosto che sulla struttura interna del componente: il problema è che introduce ulteriore sintassi da conoscere!

Cerchiamo di approfondire le basi:

1. **render**: La funzione `render` viene utilizzata per renderizzare un componente React nel "contenitore" virtuale fornito da RTL. Questo simula il rendering del componente come verrebbe fatto nell'applicazione reale.

2. **screen**: L'oggetto `screen` contiene una serie di metodi per selezionare elementi dall'interfaccia utente renderizzata. Ad esempio, `screen.getByText` viene utilizzato per trovare un elemento che contiene un certo testo.

3. **fireEvent**: L'oggetto `fireEvent` viene utilizzato per simulare eventi come clic, inserimento di testo, cambiamenti di valore e così via sugli elementi dell'interfaccia utente. *Ad esempio, `fireEvent.click` simula un clic su un elemento*.

4. **test**: La funzione `test` è fornita da Jest, il framework di testing su cui si basa RTL. È utilizzata per definire un singolo test all'interno del file di test. Un test può contenere più step per verificare il comportamento del componente.

5. **expect**: La funzione `expect` viene utilizzata per fare asserzioni sui risultati del test. Ad esempio, `expect(element).toBeInTheDocument()` verifica che un certo elemento sia presente nell'interfaccia utente renderizzata.

6. **Espressioni regolari**: Le espressioni regolari (regex) sono utilizzate per definire pattern di ricerca all'interno del testo degli elementi dell'interfaccia utente. Ad esempio, `/valore del contatore: 0/i` è un'espressione regolare che corrisponde a qualsiasi testo che contiene "valore del contatore: 0", indipendentemente dalle maiuscole o minuscole.

### Rendering dei Componenti

Per testare un componente, è necessario prima renderizzarlo nel contenitore virtuale fornito da RTL. Questo viene fatto utilizzando la funzione `render`:

```
import { render } from '@testing-library/react';
import MioComponente from './MioComponente';

render(<MioComponente />);
```

### Selezionare gli elementi dell'interfaccia utente

Dopo aver reso il componente, possiamo selezionare gli elementi dell'interfaccia utente utilizzando l'oggetto `screen`. RTL fornisce diverse query per selezionare gli elementi in base al loro testo, ruolo, attributi, stato, ecc.

Alcune delle query più comuni sono:

- `getByText`: Seleziona un elemento in base al suo testo visibile.
- `getByRole`: Seleziona un elemento in base al suo ruolo accessibile (ad es. "button", "heading", "link", ecc.).
- `getByLabelText`: Seleziona un elemento form in base al testo dell'etichetta associata.
- `getByPlaceholderText`: Seleziona un elemento form in base al testo del placeholder.
- `getByAltText`: Seleziona un elemento immagine in base al testo alternativo.

Esempio:

```
import { screen } from '@testing-library/react';

const buttonElement = screen.getByText('Click me');
const headingElement = screen.getByRole('heading', { level: 1 });
```

### Interagire con gli elementi

Dopo aver selezionato gli elementi dell'interfaccia utente, è possibile interagire con essi utilizzando la funzione `fireEvent`.

Questa funzione simula eventi come clic, inserimento di testo, cambiamenti di valore, ecc.

```
import { fireEvent } from '@testing-library/react';

const inputElement = screen.getByLabelText('Nome');
fireEvent.change(inputElement, { target: { value: 'John Doe' } });

const buttonElement = screen.getByText('Invia');
fireEvent.click(buttonElement);
```

### Effettuare "asserzioni"

Dopo aver interagito con il componente, è necessario verificare che il suo comportamento sia corretto.

Questo viene fatto utilizzando la funzione `expect` fornita da Jest.

```
import { screen } from '@testing-library/react';

const messageElement = screen.getByText('Benvenuto, John Doe!');
expect(messageElement).toBeInTheDocument();
```

### Mock delle chiamate API

Se il componente da testare effettua chiamate API, è possibile utilizzare la funzione `jest.mock` o `vi.mock` (in Vitest) per simulare le risposte dell'API.

```
// Esempio con vi.mock per progetti realizzati con Vite
import { vi } from 'vitest';

vi.mock('./api', () => ({
  fetchData: () => Promise.resolve({ data: 'mock data' }),
}));
```

### Test asincroni

Se il componente da testare ha effetti collaterali asincroni (come le chiamate API), è necessario attendere che questi effetti vengano completati prima di effettuare le asserzioni. Questo può essere fatto utilizzando le utility `waitFor`, `findBy` o `await`.

```
import { screen, waitFor } from '@testing-library/react';

await waitFor(() => {
  const loadingElement = screen.queryByText('Loading...');
  expect(loadingElement).not.toBeInTheDocument();
});
```

### Best practice: la pulizia dopo i test

È buona norma pulire gli effetti collaterali dopo ogni test per evitare interferenze tra i diversi test. Questo può essere fatto utilizzando la funzione `cleanup` fornita da RTL.

```
import { cleanup } from '@testing-library/react';

afterEach(cleanup);
```

Ovviamente questa mia mini-guida copre i concetti chiave di React Testing Library.

Per approfondimenti e casi d'uso più specifici, l'ovvio consiglio è quello di fare riferimento alla [documentazione ufficiale](https://testing-library.com/docs/react-testing-library/intro/) della libreria.
