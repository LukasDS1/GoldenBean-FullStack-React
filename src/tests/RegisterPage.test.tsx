import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import "@testing-library/jest-dom/vitest";

const mockRegister = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../pages/sharedComponents/NavBar", () => ({
  NavBar: () => <div data-testid="navbar"></div>
}));

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: {}, 
    logout: vi.fn()
  })
}));

vi.mock("../hooks/useAuthService", () => ({
  useAuth: () => ({
    register: mockRegister
  })
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const setup = () =>
  render(
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );

describe("RegisterPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("registra usuario exitosamente", async () => {
    mockRegister.mockResolvedValue({ ok: true });

    setup();

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

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
