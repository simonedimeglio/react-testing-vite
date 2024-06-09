// Importa le funzioni necessarie da React Testing Library per eseguire i test
import { render, screen, fireEvent } from "@testing-library/react";
// Importa funzioni di utilità per i test da 'vitest'
import { beforeAll, afterAll, test, expect, vi } from "vitest";
// Importa il componente Utenti da testare
import Utenti from "./Utenti";

// Prima di tutti i test, mocka la funzione fetch per restituire 10 utenti fittizi
beforeAll(() => {
  vi.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
          { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" },
          { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net" },
          {
            id: 4,
            name: "Patricia Lebsack",
            email: "Julianne.OConner@kory.org",
          },
          {
            id: 5,
            name: "Chelsey Dietrich",
            email: "Lucio_Hettinger@annie.ca",
          },
          {
            id: 6,
            name: "Mrs. Dennis Schulist",
            email: "Karley_Dach@jasper.info",
          },
          { id: 7, name: "Kurtis Weissnat", email: "Telly.Hoeger@billy.biz" },
          {
            id: 8,
            name: "Nicholas Runolfsdottir V",
            email: "Sherwood@rosamond.me",
          },
          { id: 9, name: "Glenna Reichert", email: "Chaim_McDermott@dana.io" },
          {
            id: 10,
            name: "Clementina DuBuque",
            email: "Rey.Padberg@karina.biz",
          },
        ]),
    }),
  );
});

// Dopo tutti i test, ripristina global.fetch alla sua implementazione originale
afterAll(() => {
  global.fetch.mockRestore();
});

// Test per verificare se vengono renderizzati 10 utenti
test("renderizza 10 utenti", async () => {
  render(<Utenti />);
  // Attendi che vengano trovati tutti gli elementi "heading" di livello 3 (h3)
  const utenti = await screen.findAllByRole("heading", { level: 3 });
  // Verifica che ci siano 10 utenti renderizzati
  expect(utenti).toHaveLength(10);
});

// Test per verificare il filtro degli utenti in base all'input
test("filtra gli utenti sulla base degli input", async () => {
  render(<Utenti />);
  // Trova l'input di ricerca utilizzando il suo attributo placeholder
  const input = screen.getByPlaceholderText(/ricerca per nome/i);
  // Simula il cambiamento dell'input con il valore "Leanne"
  fireEvent.change(input, { target: { value: "Leanne" } });
  // Attendi che vengano trovati tutti gli elementi "heading" di livello 3 (h3)
  const utenti = await screen.findAllByRole("heading", { level: 3 });
  // Verifica che ci sia un solo utente renderizzato
  expect(utenti).toHaveLength(1);
  // Verifica che l'utente "Leanne Graham" sia presente nella lista
  expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
});

// Test per verificare il cambio di colore della card al click
test("il colore della card cambia al click", async () => {
  render(<Utenti />);
  // Trova la card contenente il testo "Leanne Graham"
  const card = await screen.findByText("Leanne Graham");
  // Simula il click sulla card
  fireEvent.click(card);
  // Verifica che la card abbia la classe "selezionato"
  expect(card.closest(".card")).toHaveClass("selezionato");
});

// Test per verificare che solo una card alla volta abbia lo sfondo colorato
test("solo una card alla volta ha lo sfondo colorato", async () => {
  render(<Utenti />);
  // Trova le cards contenenti i testi "Leanne Graham" ed "Ervin Howell"
  const card1 = await screen.findByText("Leanne Graham");
  const card2 = await screen.findByText("Ervin Howell");
  // Simula il click sulla prima card
  fireEvent.click(card1);
  // Verifica che la prima card abbia la classe "selezionato"
  expect(card1.closest(".card")).toHaveClass("selezionato");
  // Simula il click sulla seconda card
  fireEvent.click(card2);
  // Verifica che la seconda card abbia la classe "selezionato"
  expect(card2.closest(".card")).toHaveClass("selezionato");
  // Verifica che la prima card non abbia più la classe "selezionato"
  expect(card1.closest(".card")).not.toHaveClass("selezionato");
});
