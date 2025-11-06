import { normalized } from '../helpers/normalize.helpers';
import type { coffeeProps } from '../interfaces/coffe.interfaces'; 


export const getCoffeeByName = async (query: string): Promise<coffeeProps[]> => {
  const normalize = normalized(query)
  const encodedName = encodeURIComponent(normalize);
  console.log(normalize)
  const response = await fetch(`http://localhost:3001/coffe?nombre_normalizado_like=${encodedName}`);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  
  const data:coffeeProps[] = await response.json();

  return data; 
  
};

