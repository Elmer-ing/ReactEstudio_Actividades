import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TMDBComponent from "./TMDBComponent";
import { vi } from "vitest";

// Simula fetch de la API de TMDB
function mockFetchMovies(results) {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      results,
    }),
  });
}

describe("TMDBComponent", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza y busca películas exitosamente", async () => {
    mockFetchMovies([
      {
        id: 1,
        title: "Matrix",
        poster_path: "/matrix.jpg",
        release_date: "1999-03-31",
        vote_average: 8.7,
        overview: "Un hacker descubre la verdad.",
      },
    ]);

    render(<TMDBComponent />);
    // Escribe una consulta válida
    fireEvent.change(screen.getByPlaceholderText(/Buscar películas/i), {
      target: { value: "Matrix" },
    });
    // Haz clic en buscar
    fireEvent.click(screen.getByRole("button", { name: /Buscar/i }));

    // Espera a que aparezca la película
    expect(await screen.findByText("Matrix")).toBeInTheDocument();
    expect(
      screen.getByText(/Un hacker descubre la verdad/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Estreno:/i)).toBeInTheDocument();
    expect(screen.getByText(/Valoración:/i)).toBeInTheDocument();
    expect(screen.getByAltText("Matrix")).toBeInTheDocument();
  });

  it("muestra mensaje de sin resultados", async () => {
    mockFetchMovies([]);
    render(<TMDBComponent />);
    fireEvent.change(screen.getByPlaceholderText(/Buscar películas/i), {
      target: { value: "zzzz" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Buscar/i }));
    expect(
      await screen.findByText(/No se encontraron resultados/i)
    ).toBeInTheDocument();
  });
});
