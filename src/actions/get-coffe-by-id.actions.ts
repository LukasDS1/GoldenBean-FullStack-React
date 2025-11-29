import type { coffeeProps } from "../interfaces/coffe.interfaces";

export const getCoffeById = async (id: number): Promise<coffeeProps> => {
  const response = await fetch(`http://localhost:8080/api-v1/coffee/${id}`);

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

  const json = await response.json();
  return json.data;
};
