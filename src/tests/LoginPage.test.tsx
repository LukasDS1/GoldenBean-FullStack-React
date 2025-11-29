import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LoginPage } from "../pages/loginPage.pages";
import "@testing-library/jest-dom/vitest";

vi.mock("../../components/sharedComponents/NavBar", () => ({
  NavBar: () => <div data-testid="navbar"></div>
}));

const mockLogin = vi.fn();

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

vi.mock("react-router-dom", () => ({
  Link: () => <div />,
  useNavigate: () => vi.fn()
}));

describe("LoginPage UI", () => {

  it("envía credenciales correctamente", async () => {
    mockLogin.mockResolvedValue({ ok: true, token: "123" });

    render(<LoginPage />);

    const usernameInput = document.querySelector('input[type="text"]');

    const passwordInput = document.querySelector('input[type="password"]');

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
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(
      screen.getByText(/todos los campos son obligatorios/i)
    ).toBeInTheDocument();
  });

});
