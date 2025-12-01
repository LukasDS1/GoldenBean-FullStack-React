import { describe, it, expect } from "vitest";
import { capitalizeFirst, normalized, updateArray } from "../helpers/index";

describe("capitalizeFirst", () => {
  it("capitaliza solo la primera letra y el resto en minúsculas", () => {
    expect(capitalizeFirst("lUkA")).toBe("Luka");
  });

  it("devuelve string vacío si el input es vacío", () => {
    expect(capitalizeFirst("")).toBe("");
  });
});

describe("normalized", () => {
  it("elimina tildes y normaliza el texto", () => {
    expect(normalized("café")).toBe("cafe");
  });

  it("hace trim correctamente", () => {
    expect(normalized("   hola   ")).toBe("hola");
  });
});

describe("updateArray", () => {
  it("si el ítem ya está primero, retorna el array tal cual", () => {
    const prev = ["hola", "test", "algo"];
    expect(updateArray(prev, "hola")).toEqual(prev);
  });

    it("mueve el ítem al inicio pero NO elimina duplicados (comportamiento actual)", () => {
    const prev = ["test", "hola", "test", "algo"];

  // El item "hola" va al inicio, pero "test" queda duplicado
  expect(updateArray(prev, "hola")).toEqual(["hola", "test", "test", "algo"]);
});


  it("limita el array a máximo 7 elementos", () => {
    const prev = ["a","b","c","d","e","f","g","h"];
    const res = updateArray(prev, "x");

    expect(res.length).toBe(7);
    expect(res[0]).toBe("x");
  });
});
