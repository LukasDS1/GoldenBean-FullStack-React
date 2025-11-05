interface Props {
    precioCLP:number;
}
export const CardPriceComponent = ({precioCLP}:Props) => {
  return (
    <p className="card-text text-center text-warning"><i className="fa-solid fa-coins"></i> Precio: { precioCLP } CLP</p>
  )
}