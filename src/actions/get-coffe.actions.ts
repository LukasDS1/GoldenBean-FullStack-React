import type { coffeeProps } from '../interfaces/coffe.interfaces';

export const getCoffebyActions = async (): Promise<coffeeProps[]> => {
  const response = await fetch(`http://localhost:8080/api-v1/coffee`);
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const json = await response.json();

  return json.data; // esto es así debido a la estructura del JSON
};