import { NavBar } from "./sharedComponents/NavBar";
import "./BlogsPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const AboutPage = () => {
  return (
    <>
      <NavBar 
        onQuery={() => {}} 
        cart={[]} 
        showCart={false} 
        increaseQty={() => {}} 
        decreaseQty={() => {}} 
        clearCart={() => {}} 
      />

      <div className="blogs-bg min-vh-100 w-100 d-flex justify-content-center align-items-start p-4">
        <div className="blog-box">

          <h1 className="titulo text-center mb-4 text-white">Acerca de Nosotros</h1>

          <div className="about-content text-white letras">
            <p>
              GoldenBean surgió de una esquina olvidada, transformada por la promesa de un aroma profundo y un
              calor reconfortante. Sus paredes, vestidas de ladrillo y madera curtida, atesoran el eco
              silencioso de granos tostados con esmero, un proceso que se repite cada mañana con precisión
              ritual.
            </p>

            <p>
              Hoy, ese rincón ya no está olvidado. Se ha convertido en un referente silencioso pero esencial,
              un lugar de renombre que atrae a quienes buscan autenticidad en cada sorbo. Su fama no se
              anuncia con ruido, sino que se expande con el mismo aroma que una vez lo fundó: el olor
              inconfundible del café recién tostado que ahora impregna no solo el local, sino también la
              memoria del barrio.
            </p>

            <p>
              Esta reputación se sustenta en una selección impecable de productos premium. Cada grano proviene
              de microlotes cuidadosamente elegidos por su perfil de sabor único y su trazabilidad ética.
              La carta, concisa pero exquisita, ofrece desde un espresso balanceado y complejo hasta métodos de
              filtro que destacan notas frutales y florales.
            </p>

            <p>
              Acompañando la experiencia, se sirven delicias de pastelería fina, horneadas diariamente con
              ingredientes superiores, que dialogan en armonía con la taza principal.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};
