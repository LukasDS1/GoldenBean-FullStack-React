
import { useCallback, useEffect , useState } from 'react';

import { NavBar , CardComponent } from './pages/coffesComponents/index.ts';

import { getCoffebyActions , getCoffeeByName } from './actions/index.ts';
         
import type { coffeeProps } from './interfaces/coffe.interfaces.ts';

import 'bootstrap/dist/css/bootstrap.min.css'

export const CoffeApp = () => {

  const [ coffes , setCoffe ] = useState<coffeeProps[]>([]);  
  const [ allCoffes , setAllCoffes ] = useState<coffeeProps[]>([]);

  useEffect(()=> {

    const fetchData = async() => {
      try{
        const data = await getCoffebyActions();

        setCoffe(data);
        setAllCoffes(data);
      }catch(error){
        console.log(`Error en fetchin data: ${ error }`);
      }
    }

    fetchData();
  },[]);

  const handleSearch = useCallback(async(query:string) => {
    query = query.trim().toLowerCase()

    if(query.length === 0){
      setCoffe(allCoffes);
      return
    }

    try {
    const results = await getCoffeeByName(query);
    console.log(results)
    if (results.length > 0) {
      setCoffe(results);
    } else {
      setCoffe([]);
    }
  } catch(error) {
    console.log(`Error en: ${error}`);
    setCoffe([]);
  }
}, [allCoffes]);
  
  
  return (
    <div 
      className="container-fluid min-vh-100"
      style={{
        backgroundImage: 'url(./src/assets/img/fondo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >      
      <div className="row">
        <NavBar onQuery={handleSearch} />        
        <CardComponent coffe={coffes} />
      </div>
    </div>
  )
}
