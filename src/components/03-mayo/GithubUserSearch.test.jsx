import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GithubUserSearch from "./GithubUserSearch";
import { vi } from "vitest";

// Simula fetch de la API de GitHub
function mockFetchGithubUsers(users) {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      items: users,
    }),
  });
}

describe("GithubUserSearch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza y busca usuarios exitosamente", async () => {
    // Simula respuesta de la API con un usuario
    mockFetchGithubUsers([
      {
        id: 1,
        login: "octocat",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
        html_url: "https://github.com/octocat",
      },
    ]);

    render(<GithubUserSearch />);
    // Escribe una consulta válida (3+ caracteres)
    fireEvent.change(screen.getByPlaceholderText(/al menos 3 caracteres/i), {
      target: { value: "oct" },
    });

    // Espera a que aparezca el usuario en la lista
    expect(await screen.findByText("octocat")).toBeInTheDocument();
    // Verifica que el enlace y el avatar estén presentes
    expect(screen.getByRole("link", { name: "octocat" })).toHaveAttribute(
      "href",
      "https://github.com/octocat"
    );
    expect(screen.getByAltText(/Avatar de octocat/)).toBeInTheDocument();
  });

  it("muestra mensaje de sin resultados", async () => {
    mockFetchGithubUsers([]);
    render(<GithubUserSearch />);
    fireEvent.change(screen.getByPlaceholderText(/al menos 3 caracteres/i), {
      target: { value: "zzz" },
    });
    // Espera a que aparezca el mensaje de sin resultados
    expect(
      await screen.findByText(/No se encontraron usuarios/i)
    ).toBeInTheDocument();
  });
});
