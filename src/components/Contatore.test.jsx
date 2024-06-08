// src/components/Contatore.test.jsx

// Importiamo React e alcune utility di testing da @testing-library/react
import React from "react";
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
