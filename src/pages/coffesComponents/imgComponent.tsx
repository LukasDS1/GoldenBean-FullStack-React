interface Props {
  imagen: string;
  nombre: string;
}

export const ImgComponent = ({ imagen, nombre }: Props) => {
  return (
    <img 
      src={imagen} 
      className="card-img-top" 
      alt={nombre} 
    />
  )
}
