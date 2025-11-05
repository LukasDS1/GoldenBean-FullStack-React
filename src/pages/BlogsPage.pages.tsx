import { NavBar } from "./sharedComponents/NavBar";
import { Footer } from "./sharedComponents/Footer";
import "./BlogsPage.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


export const BlogsPage = () => {
  return (
    <>
      {/* NAVBAR */}
      <NavBar 
        onQuery={() => {}} 
        cart={[]} 
        showCart={false} 
        increaseQty={() => {}} 
        decreaseQty={() => {}} 
        clearCart={() => {}} 
      />

      <div className="blogs-bg min-vh-100 w-100">

        <section className="container pt-5 mb-5">
          <h1 className="titulo text-center mb-4 text-white">Blogs</h1>
          <h2 className="titulo titulo2 text-center text-warning">Noticias Cafeteras</h2>

          {/* CAROUSEL */}
          <div id="blogsCarrusel" className="carousel slide">
            <div className="carousel-inner">

              {/* Noticia 1 */}
              <div className="carousel-item active">
                <div className="row justify-content-center">
                  <article className="col-lg-8 col-md-10 col-sm-12 text-white letras">
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
              </div>

              {/* Noticia 2 */}
              <div className="carousel-item">
                <div className="row justify-content-center">
                  <article className="col-lg-8 col-md-10 col-sm-12 text-white letras">
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
              </div>

              {/* Noticia 3 */}
              <div className="carousel-item">
                <div className="row justify-content-center">
                  <article className="col-lg-8 col-md-10 col-sm-12 text-white letras">
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

            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#blogsCarrusel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#blogsCarrusel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
