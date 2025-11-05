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
  style={{
    height: "250px",
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  }}
/>
  )
}
