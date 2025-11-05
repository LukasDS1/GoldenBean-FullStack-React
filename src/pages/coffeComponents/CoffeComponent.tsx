import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import type { coffeeProps } from "../../interfaces/coffe.interfaces";
import { capitalizeFirst } from "../../helpers";
import { getCoffeById } from "../../actions/get-coffe-by-id.actions";

export const CoffeComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coffe, setCoffe] = useState<coffeeProps | null>(null);
  const [loading, setLoading] = useState(true);

  const goBack = () => {    
    navigate(-1);
  }

  useEffect(() => {
    if (id) {
      const fetchCoffeId = async (coffeId: number) => {
        try {
          const coffeFound = await getCoffeById(coffeId);
          const coffe = coffeFound;          
          setCoffe(coffe || null);
        } catch (error) {
          console.error(" Error fetching coffe:", error);
          setCoffe(null);
        } finally {
          setLoading(false);
        }
      }

      const numericId = parseInt(id, 10);
      if (!isNaN(numericId)) {
        fetchCoffeId(numericId);
      } else {
        console.error(" ID inválido:", id);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [id]);

  // Estado de carga
  if (loading) {
    return (
      <div className="container-fluid bg-black min-vh-100">
        <div className="row">
          <div className="col-12 text-center text-white p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando robot...</p>
          </div>
        </div>
      </div>
    );
  }

  // Validar que cafe existe después de la carga
  if (!coffe) {
    return (
      <div className="container-fluid bg-black min-vh-100">
        <div className="row">
          <div className="col-12 text-center text-white p-4">
            <h2>cafe no encontrado</h2>
            <p>No se pudo cargar la información del robot.</p>
            <button
              className="btn btn-primary mt-1"
              onClick={goBack}
            >
              <i className="fa-solid fa-backward"></i> Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  const coffeId = coffe.id ? (coffe.id) : 'No especificado';
  const coffeName = coffe.nombre ? capitalizeFirst(coffe.nombre) : 'Nombre no disponible';
  const coffeDescription = coffe.descripcion || 'Sin description disponible';
  const coffeImg = coffe.imagen || 'https://via.placeholder.com/150';
  const coffePrice = coffe.precioCLP || 'Sin información adicional';

  return (
    <div className="container-fluid bg-black text-white min-vh-100 py-4">      
      <div className="row mb-4">
        <div className="col-12 text-center">
          <button
            className="btn btn-primary"
            onClick={ goBack }
          >
            <i className="fa-solid fa-arrow-left me-2"></i> 
              Volver a la lista
          </button>
        </div>
      </div>
      <div className="row align-items-start">        
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <div className="text-center">
            <img 
              alt={coffeName}
              className="img-fluid rounded-3 shadow-lg"
            />
          </div>
          <div className="text-center mt-5">
             <h5 className="text-warning mb-3">
                <i className="fa-solid fa-gamepad me-2"></i>
                Sprite
              </h5>
            <img 
              alt={coffeName}
              className="img-fluid rounded-3 shadow-lg"
              src={coffe.imagen}
              style={{ maxHeight: '200px', objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="p-3">
       
            <h1 className="display-4 fw-bold text-primary mb-4">{coffeName}</h1>

            <div className="mb-4">
              <h5 className="text-info">
                <i className="fa-solid fa-quote-left me-2"></i>
                Frase
              </h5>
              <blockquote className="blockquote fs-5 fst-italic text-light">
                "{coffeDescription}"
              </blockquote>
            </div>

             {/* Imagen */}
            <div className="mb-4">
              <h5 className="text-info">
                <i className="fa-solid fa-quote-left me-2"></i>
                Imagen
              </h5>
              <blockquote className="blockquote fs-5 fst-italic text-light">
                "{coffeImg}"
              </blockquote>
            </div>

            {/* Información adicional */}
            <div className="mb-4">
              <h5 className="text-success">
                <i className="fa-solid fa-circle-info me-2"></i>
                Información
              </h5>
              <p className="fs-6 text-light">{coffePrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};