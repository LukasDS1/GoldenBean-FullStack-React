import { Link } from "react-router-dom";
import { NavBar } from "../pages/sharedComponents/NavBar";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <>
      <NavBar 
  onQuery={() => {}} 
  cart={[]} 
  showCart={false}
  increaseQty={() => {}} 
  decreaseQty={() => {}} 
/>


      <div
        className="min-vh-100 w-100"
        style={{
          backgroundImage: 'url(/src/assets/img/fondo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ minHeight: "80vh" }}
        >
          <h1 className="fw-bold display-3 text-white">GoldenBean</h1>

          <p className="lead text-white">
            Más que una cafetería, una tradición.
          </p>

          <p className="text-white">
            Disfruta el aroma del café recién tostado y vive la experiencia.
          </p>

          <Link to="/catalogo">
            <button className="btn btn-warning btn-lg mt-4 px-4">
              <i className="fa-solid fa-bag-shopping me-2"></i>
              Explorar Catálogo
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
