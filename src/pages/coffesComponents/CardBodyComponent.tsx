import { CardTitleComponent } from "./CardTitleComponent";
import { CardTextComponent } from "./CardTextComponent";
import { capitalizeFirst } from '../../helpers'
import type { coffeeProps } from "../../interfaces/coffe.interfaces"

interface Props {
    coffe:coffeeProps;
       addToCart: (item: coffeeProps) => void;}


export const CardBodyComponent = ({ coffe,addToCart }:Props) => {


  return (
    <div className="card-body text-center">
  <CardTitleComponent name={ capitalizeFirst(coffe.nombre) } />        
  <CardTextComponent descripcion={ capitalizeFirst(coffe.descripcion) } />

  <div className="d-flex justify-content-center gap-3 mt-3">
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