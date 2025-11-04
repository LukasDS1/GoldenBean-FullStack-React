import type { coffeeProps } from "../interfaces/coffe.interfaces";

export const getCoffeById = async (id: number): Promise<coffeeProps> => {
  const response = await fetch(`http://localhost:3001/coffe/${id}`);

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

  return await response.json();
};
