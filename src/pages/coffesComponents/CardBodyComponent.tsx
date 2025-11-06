import { CardTitleComponent } from "./CardTitleComponent";
import { CardTextComponent } from "./CardTextComponent";
import { capitalizeFirst } from '../../helpers'
import type { coffeeProps } from "../../interfaces/coffe.interfaces"
import { useNavigate } from "react-router-dom";
import {CardPriceComponent} from "./CardPriceComponent";


interface Props {
    coffe:coffeeProps;
       addToCart: (item: coffeeProps) => void;
}

export const CardBodyComponent = ({ coffe,addToCart }:Props) => {
 const navigate = useNavigate();

  return (
    <div className="card-body text-center">
  <CardTitleComponent name={ capitalizeFirst(coffe.nombre) } />        
  <CardTextComponent descripcion={ capitalizeFirst(coffe.descripcion) } />
  <CardPriceComponent precioCLP={coffe.precioCLP} />

  <div className="d-flex justify-content-center gap-3 mt-3">
    <button
          className="btn btn-primary"
          onClick={() => navigate(`/cafe/${coffe.id}`)}
        >
          <i className="fa-solid fa-eye"></i> Ver más
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