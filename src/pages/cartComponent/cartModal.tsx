import { Modal, Button } from "react-bootstrap";
import type { CartItem } from "../../interfaces/cart.interfaces";

interface Props {
  show: boolean;
  onClose: () => void;
  cart: CartItem[];
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  clearCart: () => void;
}

export const CartModal = ({ show, onClose, cart,increaseQty, decreaseQty,clearCart  }: Props) => {

  const total = cart.reduce((acc, item) => acc + item.precioCLP * item.quantity, 0);

  return (
    <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Carrito</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-white">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito </p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom border-secondary">
                  <img 
      src={item.imagen} 
      alt={item.nombre}
      style={{
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "8px",
        marginRight: "12px"
      }}
    />
              <div>
                <h5 className="m-0">{item.nombre}</h5>
                <small>${item.precioCLP}</small>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline-light"
                  onClick={() => decreaseQty(item.id)}
                >
                  –
                </Button>

                <span className="fw-bold">{item.quantity}</span>

                <Button 
                  size="sm" 
                  variant="outline-light"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </Button>
              </div>

              <div className="fw-bold">
                ${item.precioCLP * item.quantity}
              </div>

            </div>
          ))
        )}

        {cart.length > 0 && (
          <h4 className="mt-3 text-end">Total: ${total}</h4>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="secondary" onClick={() =>  {alert("Operación cancelada"); onClose(); clearCart();}}>
          Cancelar
        </Button>
        <Button variant="success" disabled={cart.length === 0}
          onClick={() => {alert("Transacción realizada con éxito!"); 
            clearCart();        
            onClose();         
          }}
        >
          Pagar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
