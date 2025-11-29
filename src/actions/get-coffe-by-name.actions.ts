import { normalized } from '../helpers/normalize.helpers';
import type { coffeeProps } from '../interfaces/coffe.interfaces'; 


export const getCoffeeByName = async (query: string): Promise<coffeeProps[]> => {
  const normalize = normalized(query)
  const encodedName = encodeURIComponent(normalize);
  const response = await fetch(`http://localhost:8080/api-v1/coffee/findByNormalized?nombreNormalizado=${encodedName}`);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  
  const json = await response.json();

  return json.data; 
  
};

