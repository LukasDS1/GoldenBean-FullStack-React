import type { coffeeProps } from '../interfaces/coffe.interfaces';

export const getCoffebyActions = async (): Promise<coffeeProps[]> => {
  const response = await fetch(`http://localhost:3001/coffe`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data:coffeeProps[] = await response.json();

  return data; // esto es así debido a la estructura del JSON
};
