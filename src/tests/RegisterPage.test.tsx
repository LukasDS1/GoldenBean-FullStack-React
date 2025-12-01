import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import "@testing-library/jest-dom/vitest";

// Mock de función register (la que envía datos al backend)
const mockRegister = vi.fn();

// Mock de useNavigate para verifica si redirige
const mockNavigate = vi.fn();

// Mock de navbar para no renderizar completamente
vi.mock("../pages/sharedComponents/NavBar", () => ({
  NavBar: () => <div data-testid="navbar"></div>
}));

// Mock de AuthContext porque la página de register lo usa
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: {}, 
    logout: vi.fn()
  })
}));

// Mock de useAuthService, aquí se reemplaza la función de arriba
vi.mock("../hooks/useAuthService", () => ({
  useAuth: () => ({
    register: mockRegister
  })
}));

// Mock de useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// función para renderizar el componente envuelto en BrowserRouter
const setup = () =>
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );

describe("RegisterPage", () => {
  // Antes de cada test, limpiar mocks para evitar fallos
  beforeEach(() => vi.clearAllMocks());

  it("registra usuario exitosamente", async () => {
    // Simula caso donde backend responde correctamente
    mockRegister.mockResolvedValue({ ok: true });

    setup(); // se renderiza el componente

    // Se llenan los formularios
    fireEvent.change(document.querySelector("input[name='username']")!, {
      target: { value: "luka" }
    });

    fireEvent.change(document.querySelector("input[name='email']")!, {
      target: { value: "luka@mail.com" }
    });

    fireEvent.change(document.querySelector("input[name='password']")!, {
      target: { value: "1234" }
    });

    fireEvent.change(document.querySelector("input[name='confirmPass']")!, {
      target: { value: "1234" }
    });

    // Se hace click en registrarse
    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    // Se espera a que el registro haya terminado
    await waitFor(() => {
      // Si todo funciona, debe llamar a navigate
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
