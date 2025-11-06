
interface Props {
    descripcion:string;
}

export const CardTextComponent = ({descripcion}:Props) => {
  return (
    <p className="card-text text-center text-warning"><i className=""></i>{ descripcion } </p>
  )
}
