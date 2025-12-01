import { describe, it, expect, vi, beforeEach } from "vitest";
import { createCoffee , deleteCoffee } from "../actions/admin.actions";

vi.mock("../actions/auth.actions", () => ({
  getCurrentUser: vi.fn(),
}));

globalThis.fetch = vi.fn();

import { getCurrentUser } from "../actions/auth.actions";
import { getCoffeById } from "../actions/get-coffe-by-id.actions";
import { normalized } from "../helpers/normalize.helpers";
import { getCoffeeByName } from "../actions/get-coffe-by-name.actions";
import { getCoffebyActions } from "../actions/get-coffe.actions";
import { payRequest } from "../actions/pay.actions";

describe("createCoffee action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("crea un café si el usuario es admin", async () => {
    (getCurrentUser as any).mockResolvedValue({ isAdmin: true });

    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { id: 1, nombre: "Latte" } })
    });

    const coffee = {
      nombre: "Latte",
      descripcion: "desc",
      precioCLP: 2000,
      imagen: "img.jpg",
      nombreNormalizado: "latte"
    };

    const res = await createCoffee(coffee);

    expect(fetch).toHaveBeenCalledOnce();
    expect(res.ok).toBe(true);
    expect(res.message).toBe("Café creado exitosamente");
    expect(res.data).toEqual({ id: 1, nombre: "Latte" });
  });

  it("retorna error si el usuario NO es admin", async () => {
    (getCurrentUser as any).mockResolvedValue({ isAdmin: false });

    const coffee = {
      nombre: "Americano",
      descripcion: "desc",
      precioCLP: 1500,
      imagen: "img.jpg",
      nombreNormalizado: "americano"
    };

    const res = await createCoffee(coffee);

    // el fetch no debe ejecutarse
    expect(fetch).not.toHaveBeenCalled();

    expect(res.ok).toBe(false);
    expect(res.message).toBe("No autorizado: solo administradores pueden crear cafes");
  });
});

describe("deleteCoffee", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna error si el usuario NO es admin", async () => {
    (getCurrentUser as any).mockResolvedValue({ isAdmin: false });

    const res = await deleteCoffee(1);

    expect(fetch).not.toHaveBeenCalled();
    expect(res.ok).toBe(false);
    expect(res.message).toBe("No autorizado: solo administradores pueden eliminar cafés");
  });

  it("elimina café correctamente cuando el usuario es admin", async () => {
    (getCurrentUser as any).mockResolvedValue({ isAdmin: true });

    (fetch as any).mockResolvedValue({ ok: true });

    const res = await deleteCoffee(5);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api-v1/coffee/5", {
      method: "DELETE",
    });

    expect(res.ok).toBe(true);
    expect(res.message).toBe("Café eliminado exitosamente");
  });
});

describe("getCoffeById", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("retorna el café cuando la petición es exitosa", async () => {
    const mockData = { data: { id: 1, nombre: "Americano" } };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData)
    }) as any;

    const result = await getCoffeById(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api-v1/coffee/1");
    expect(result).toEqual(mockData.data);
  });

  it("lanza error si el response no es ok", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    }) as any;

    await expect(getCoffeById(1))
      .rejects
      .toThrow("Error HTTP: 500");
  });

});

vi.mock("../helpers/normalize.helpers", () => ({
  normalized: vi.fn()
}));

describe("getCoffeeByName", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("retorna una lista de cafés cuando la petición es exitosa", async () => {
    (normalized as any).mockReturnValue("americano");

    const mockData = { data: [{ id: 1, nombre: "Americano" }] };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData)
    }) as any;

    const result = await getCoffeeByName("AMÉRICANO");

    expect(normalized).toHaveBeenCalledWith("AMÉRICANO");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api-v1/coffee/findByNormalized?nombreNormalizado=americano"
    );
    expect(result).toEqual(mockData.data);
  });

  it("lanza error cuando response.ok es false", async () => {
    (normalized as any).mockReturnValue("latte");

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    }) as any;

    await expect(getCoffeeByName("Latte"))
      .rejects
      .toThrow("Error HTTP: 404");
  });

});

describe("getCoffebyActions", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("retorna una lista de cafés cuando la petición es exitosa", async () => {
    const mockData = { data: [{ id: 1, nombre: "Latte" }] };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData)
    }) as any;

    const result = await getCoffebyActions();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api-v1/coffee");
    expect(result).toEqual(mockData.data);
  });

  it("lanza error cuando la petición falla", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    }) as any;

    await expect(getCoffebyActions())
      .rejects
      .toThrow("Error HTTP: 500");
  });

});

describe("payRequest", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("envía el pago correctamente y retorna el JSON", async () => {
    const mockResponse = { status: "ok" };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse)
    }) as any;

    const email = "test@mail.com";
    const cart = [
      { id: 1, nombre: "Latte", quantity: 2, precioCLP: 2500 }
    ];

    const result = await payRequest(email, cart);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8081/api-v1/pay",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          items: [
            {
              coffeeId: 1,
              coffeeName: "Latte",
              quantity: 2,
              priceCLP: 2500
            }
          ]
        })
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("lanza error si la transacción falla (res.ok = false)", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false
    }) as any;

    await expect(payRequest("test@mail.com", []))
      .rejects
      .toThrow("Error en la transacción");
  });

});
