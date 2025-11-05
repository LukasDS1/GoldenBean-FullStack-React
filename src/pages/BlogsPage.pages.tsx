import { NavBar } from "./sharedComponents/NavBar";
import "./BlogsPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const BlogsPage = () => {
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
        {/* ✅ CONTENEDOR COMPLETO */}
        <div className="blog-box">

          <h1 className="titulo text-center mb-3 text-white">Blogs</h1>
          <h2 className="titulo titulo2 text-center text-warning mb-4">Noticias Cafeteras</h2>

          <div id="blogsCarrusel" className="carousel slide blog-carousel">
            <div className="carousel-inner">

              <div className="carousel-item active">
                <article className="text-white letras">
                  <p>
                    En el sótano polvoriento de la cafetería Golden Bean, un grupo de científicos desconocidos
                    logró crear un café tan potente que no solo despierta — te pone a bailar cumbia camino al trabajo.
                  </p>
                  <p>
                    Catadores describen la experiencia como "un concierto de rock en el cerebro con olor a espresso".
                  </p>
                  <p>
                    Los inventores afirman que aumenta productividad y creatividad al nivel de querer fundar startups de calcetines inteligentes.
                  </p>
                </article>
              </div>

              <div className="carousel-item">
                <article className="text-white letras">
                  <p>
                    En el Golden Bean apareció la "taza infinita": por más que bebas, nunca se vacía.
                  </p>
                  <p>
                    Científicos dicen que mezcla café, vapor y magia estadística.
                  </p>
                  <p>
                    Advertencia: riesgo de energía inagotable y conversaciones eternas.
                  </p>
                </article>
              </div>

              <div className="carousel-item">
                <article className="text-white letras">
                  <p>
                    Los devs del Golden Bean confesaron ser Reploids reciclados de MegaMan X.  
                    Se alimentan de café ilimitado.
                  </p>
                  <p>
                    Uno se transforma en CoffeeMan.EXE y dispara espresso cuando hay bugs.
                  </p>
                  <p>
                    Si escuchas música 8-bits en la web… prepárate para luchar contra 404Man.
                  </p>
                </article>
              </div>

            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#blogsCarrusel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#blogsCarrusel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
