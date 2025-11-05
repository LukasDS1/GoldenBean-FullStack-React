
import { CardBodyComponent } from "./CardBodyComponent";
import type { coffeeProps } from "../../interfaces/coffe.interfaces"
import { ImgComponent } from "./imgComponent";
interface Props {
  coffe: coffeeProps[];
  addToCart: (item: coffeeProps) => void;
}

export const CardComponent = ({ coffe,addToCart }:Props) => {


  const coffeArray = Array.isArray(coffe) ? coffe : [coffe]

    return (
    <>
      {
        coffeArray.map((coffe) => (
          <div key={coffe.id} className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12 mb-4 mt-2">
            <div 
              className="card h-100 text-white"
              style={{
                backgroundColor: 'rgba(33, 37, 41, 0.7)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <ImgComponent imagen={coffe.imagen} nombre={coffe.nombre} />

              <CardBodyComponent coffe={coffe} addToCart={addToCart} />

            </div>
          </div>
        ))}
    </>
  )
}
