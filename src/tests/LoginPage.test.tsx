import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginPage } from "../pages/loginPage.pages";
import "@testing-library/jest-dom/vitest";

// Mock del navbar para no renderizar completamente
vi.mock("../../components/sharedComponents/NavBar", () => ({
  NavBar: () => <div data-testid="navbar"></div>
}));

// Mock de login
const mockLogin = vi.fn();

// Se reemplaza mock de login
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

// Mock de useNavigate para evitar navegación real
vi.mock("react-router-dom", () => ({
  Link: () => <div />,
  useNavigate: () => vi.fn()
}));

describe("LoginPage UI", () => {

  it("envía credenciales correctamente", async () => {
    // Simula respuesta exitosa
    mockLogin.mockResolvedValue({ ok: true, token: "123" });

    // Renderiza página
    render(<LoginPage />);

    // Obtiene input 
    const usernameInput = document.querySelector('input[type="text"]');

    const passwordInput = document.querySelector('input[type="password"]');

    // Simula escribir en el input
    fireEvent.change(usernameInput!, {
      target: { value: "luka" }
    });

    fireEvent.change(passwordInput!, {
      target: { value: "1234" }
    });

    fireEvent.click(
      screen.getByRole("button", { name: /entrar/i })
    );

    expect(mockLogin).toHaveBeenCalledWith({
      username: "luka",
      password: "1234",
    });
  });

  it("muestra error si falta un campo", () => {
    // Renderiza
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
    
    // Debe aparecer mensaje de error
    expect(
      screen.getByText(/todos los campos son obligatorios/i)
    ).toBeInTheDocument();
  });

});
