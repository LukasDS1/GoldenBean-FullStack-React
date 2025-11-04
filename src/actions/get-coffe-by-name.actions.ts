import type { coffeeProps } from '../interfaces/coffe.interfaces'; 

export const getCoffeeByName = async (query: string): Promise<coffeeProps[]> => {
  const encodedName = encodeURIComponent(query);

  const response = await fetch(`http://localhost:3001/coffe?nombre_like=${encodedName}`);

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

  return await response.json();
};

