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
    <div className="card-body">
        <CardTitleComponent name={ capitalizeFirst(coffe.nombre) } />        
        <CardTextComponent  descripcion={ capitalizeFirst(coffe.descripcion) } />
        <a           
          className="btn btn-primary text-center"
          onClick={ () => {
            handleShowRobot(coffe)
          }}
          >
            <i className="fa-solid fa-eye"></i> Ver mas...
          
        </a>
    </div>
  )
}