import { useNavigate } from "react-router-dom";

import { CardTitleComponent } from "./CardTitleComponent";
import { CardTextComponent } from "./CardTextComponent";

import { capitalizeFirst } from '../../helpers'

import type { coffeeProps } from "../../interfaces/coffe.interfaces"

interface Props {
    coffe:coffeeProps;
}

export const CardBodyComponent = ({ coffe }:Props) => {

  const navigate = useNavigate();

  const handleShowRobot = ( robot:coffeeProps ) => {
    
    console.log("Entra en en handleShowRobot");
    navigate(`/robot-component/${robot.id}`);
  }

  return (
    <div className="card-body text-center">
  <CardTitleComponent name={ capitalizeFirst(coffe.nombre) } />        
  <CardTextComponent descripcion={ capitalizeFirst(coffe.descripcion) } />

  <div className="d-flex justify-content-center gap-3 mt-3">
    <button
      className="btn btn-primary"
      onClick={() => handleShowRobot(coffe)}
    >
      <i className="fa-solid fa-eye"></i> Ver mas...
    </button>

    <button
      className="btn btn-success"
      onClick={() => handleShowRobot(coffe)}
    >
      <i className="fa-solid fa-basket-shopping"></i> Comprar
    </button>
  </div>
</div>


  )
}