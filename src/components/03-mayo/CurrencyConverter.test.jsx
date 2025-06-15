import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import CurrencyConverter from "./CurrencyConverter";
import { vi } from "vitest";

// Simula respuestas de la API
function mockFetchSequence(...responses) {
  global.fetch = vi.fn();
  responses.forEach((res) => {
    global.fetch.mockResolvedValueOnce({
      ok: res.ok ?? true,
      json: async () => res.data,
    });
  });
}

describe("CurrencyConverter (aspectos principales funcionales)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza y realiza una conversión exitosa", async () => {
    mockFetchSequence(
      { data: { USD: "US Dollar", EUR: "Euro" } }, // monedas
      { data: { rates: { EUR: 2.5 } } } // resultado conversión
    );

    render(<CurrencyConverter />);

    // Espera a que se cargue el select de origen
    const fromSelect = await screen.findByLabelText(/^De$/);
    const toSelect = await screen.findByLabelText(/^A$/);

    // Asegura que existan opciones
    expect(
      within(fromSelect).getByRole("option", { name: "USD" })
    ).toBeInTheDocument();
    expect(
      within(toSelect).getByRole("option", { name: "EUR" })
    ).toBeInTheDocument();

    // Cambiar cantidad
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {
      target: { value: "2" },
    });

    // Ejecutar conversión
    fireEvent.click(screen.getByRole("button"));

    // Verifica resultado
    await waitFor(() => {
      expect(screen.getByText(/2 USD/)).toBeInTheDocument();
      expect(screen.getByText(/2.50 EUR/)).toBeInTheDocument();
    });
  });
});
