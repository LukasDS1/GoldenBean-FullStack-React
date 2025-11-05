import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { coffeeProps } from "../../interfaces/coffe.interfaces";
import { capitalizeFirst } from "../../helpers";
import { getCoffeById } from "../../actions/get-coffe-by-id.actions";
import { NavBar } from "../sharedComponents/NavBar"; 

export const CafeDetailComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coffe, setCoffe] = useState<coffeeProps | null>(null);
  const [loading, setLoading] = useState(true);

  const goBack = () => navigate(-1);

  useEffect(() => {
  if (!id) return;

  const fetchCoffeId = async () => {
    try {
      const coffeFound = await getCoffeById(Number(id));
      setCoffe(coffeFound); 
    } catch (error) {
      console.error("Error fetching coffee:", error);
      setCoffe(null);
    } finally {
      setLoading(false);
    }
  };

  fetchCoffeId();
}, [id]);

  if (loading) {
    return (
      <div className="container-fluid bg-black min-vh-100 d-flex flex-column justify-content-center align-items-center text-white">
        <div className="spinner-border text-warning"></div>
        <p className="mt-2">Cargando café...</p>
      </div>
    );
  }

  if (!coffe) {
    return (
      <div className="container-fluid bg-black min-vh-100 d-flex flex-column justify-content-center align-items-center text-white">
        <h2>Café no encontrado</h2>
        <button className="btn btn-warning mt-2" onClick={goBack}>
          <i className="fa-solid fa-arrow-left"></i> Volver
        </button>
      </div>
    );
  }

  // Mapear propiedades reales de tu API
  const coffeName = capitalizeFirst(coffe.nombre);
  const coffeDescription = coffe.descripcion;
  const coffeImg = coffe.imagen;
  const coffePrice = coffe.precioCLP;

  return (
  <div className="d-flex justify-content-center align-items-start p-4 min-vh-100">

    <div className="blog-box text-white w-100" style={{ maxWidth: "900px" }}>

      <button className="btn btn-warning mb-4" onClick={goBack}>
        <i className="fa-solid fa-arrow-left me-2"></i>
        Volver
      </button>

      <div className="row align-items-start">
        
        {/* Imagen */}
        <div className="col-lg-6 text-center mb-4">
          <img
            src={coffeImg}
            alt={coffeName}
            className="img-fluid rounded-3 shadow-lg"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>

        {/* Información */}
        <div className="col-lg-6 p-3 about-content">
          <h1 className="fw-bold text-warning mb-3">{coffeName}</h1>

          <h5 className="text-info mb-1">
            <i className="fa-solid fa-mug-hot me-2"></i>Descripción
          </h5>
          <p className="fst-italic">
            "{coffeDescription}"
          </p>

          <h5 className="text-success mb-1 mt-2">
            <i className="fa-solid fa-circle-info me-2"></i>Precio
          </h5>
          <p className="fw-bold fs-4">
            $ {coffePrice.toLocaleString("es-CL")} CLP
          </p>
        </div>

      </div>
    </div>
  </div>
);

};
