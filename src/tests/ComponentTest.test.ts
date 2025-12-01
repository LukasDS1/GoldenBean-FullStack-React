import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "../hooks/useAuthService";
import { registerUser, loginUser } from "../service/authService";
import type { RegisterRequest, loginRequest } from "../interfaces/auth.interfaces";

// Mock completo del service
vi.mock("../service/authService", () => ({
  registerUser: vi.fn(),
  loginUser: vi.fn(),
}));

vi.mock("../hooks/useAuthService", () => {
  return {
    useAuth: () => ({
      register: async (data: RegisterRequest) => registerUser(data),
      login: async (data: loginRequest) => loginUser(data),
    }),
  };
});

describe("useAuth - register & login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("register debe llamar registerUser con los datos correctos", async () => {
    const mockResponse = { ok: true, message: "Registrado" };
    (registerUser as any).mockResolvedValue(mockResponse);

    const { register } = useAuth();

    const data: RegisterRequest = {
      username: "luka",
      email: "test@test.com",
      password: "1234",
    };

    const res = await register(data);

    expect(registerUser).toHaveBeenCalledWith(data);
    expect(res).toEqual(mockResponse);
  });

  it("register debe devolver el error si registerUser falla", async () => {
    const mockResponse = { ok: false, message: "Error en backend" };
    (registerUser as any).mockResolvedValue(mockResponse);

    const { register } = useAuth();

    const data: RegisterRequest = {
      username: "luka",
      email: "test@test.com",
      password: "1234",
    };

    const res = await register(data);

    expect(res).toEqual(mockResponse);
  });


  it("login debe llamar loginUser con los datos correctos", async () => {
    const mockResponse = { ok: true, token: "abc123" };
    (loginUser as any).mockResolvedValue(mockResponse);

    const { login } = useAuth();

    const data: loginRequest = {
      username: "luka",
      password: "1234",
    };

    const res = await login(data);

    expect(loginUser).toHaveBeenCalledWith(data);
    expect(res).toEqual(mockResponse);
  });

  it("login debe devolver error si loginUser falla", async () => {
    const mockResponse = { ok: false, message: "Credenciales inválidas" };
    (loginUser as any).mockResolvedValue(mockResponse);

    const { login } = useAuth();

    const data: loginRequest = {
      username: "luka",
      password: "1234",
    };

    const res = await login(data);

    expect(res).toEqual(mockResponse);
  });
});
