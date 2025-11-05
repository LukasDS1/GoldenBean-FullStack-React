import type { coffeeProps } from '../interfaces/coffe.interfaces'; 
import { capitalizeFirst } from '../helpers/capitalize-first.helpers'

export const getCoffeeByName = async (query: string): Promise<coffeeProps[]> => {
  const capitalized = capitalizeFirst(query);
  const encodedName = encodeURIComponent(capitalized);
  
  const response = await fetch(`http://localhost:3001/coffe?nombre_like=${encodedName}`);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  
  const data:coffeeProps[] = await response.json();

  console.log(data)

  return data; 
  
};

