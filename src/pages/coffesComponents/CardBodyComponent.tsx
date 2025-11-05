import { useNavigate } from "react-router-dom";

import { CardTitleComponent } from "./CardTitleComponent";
import { CardTextComponent } from "./CardTextComponent";

import { capitalizeFirst } from '../../helpers'

import type { coffeeProps } from "../../interfaces/coffe.interfaces"

interface Props {
    coffe:coffeeProps;
       addToCart: (item: coffeeProps) => void;}


export const CardBodyComponent = ({ coffe,addToCart }:Props) => {

  const navigate = useNavigate();

  const handleShowCoffe = ( coffe:coffeeProps ) => {
    
    console.log("Entra en en handleShowCoffe");
    navigate(`/coffe/${coffe.id}`);
  }

  return (
    <div className="card-body text-center">
  <CardTitleComponent name={ capitalizeFirst(coffe.nombre) } />        
  <CardTextComponent descripcion={ capitalizeFirst(coffe.descripcion) } />

  <div className="d-flex justify-content-center gap-3 mt-3">
    <button
      className="btn btn-primary"
      onClick={() => handleShowCoffe(coffe)}
    >
      <i className="fa-solid fa-eye"></i> Ver mas...
    </button>

    <button
      className="btn btn-success"
      onClick={() => addToCart(coffe)}
    >
      <i className="fa-solid fa-basket-shopping"></i> Comprar
    </button>
  </div>
</div>


  )
}