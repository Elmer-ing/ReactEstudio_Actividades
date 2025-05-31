import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Contador from "./Contador";

describe("Componente Contador", () => {
  it("muestra el contador inicial en 0", () => {
    render(<Contador />);
    expect(screen.getByText("Contador: 0")).toBeInTheDocument();
  });

  it("disminuye el contador al hacer clic en 'Aumentar'", () => {
    render(<Contador />);
    const botonAumentar = screen.getByText("Aumentar");
    fireEvent.click(botonAumentar);
    expect(screen.getByText("Contador: -1")).toBeInTheDocument();
  });

  it("aumenta el contador al hacer clic en 'Disminuir'", () => {
    render(<Contador />);
    const botonDisminuir = screen.getByText("Disminuir");
    fireEvent.click(botonDisminuir);
    expect(screen.getByText("Contador: 1")).toBeInTheDocument();
  });
});