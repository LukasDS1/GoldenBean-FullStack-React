import { useEffect, useState , type KeyboardEvent } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import type { CartItem } from "../../interfaces/cart.interfaces";
import { CartModal} from "../cartComponent/cartModal";


interface Props {
  onQuery: (query:string) => void;  
  cart: CartItem[];
  showCart?: boolean;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
}

export const NavBar = ({ onQuery, cart, showCart = true, increaseQty, decreaseQty }: Props) => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onQuery(query);
    }, 2000);

    return () => clearTimeout(timeOutId);
  }, [query, onQuery]);

  const handleSearch = () => onQuery(query);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <Navbar expand="lg" bg="black" variant="dark" className="border-bottom border-secondary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
            <i className="fa-solid fa-mug-saucer me-2"></i>
            Golden Bean
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/catalogo" className="text-white">
                Catalogo
              </Nav.Link>

              <Nav.Link as={Link} to="/" className="text-white">
                Link
              </Nav.Link>

              <NavDropdown 
                title={<span className="text-white"><i className="fa-solid fa-list me-1"></i>Sagas</span>}
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item className="text-white">Megaman Clásico</NavDropdown.Item>
                <NavDropdown.Item className="text-white">Megaman X</NavDropdown.Item>
                <NavDropdown.Divider className="bg-secondary" />
                <NavDropdown.Item className="text-white">Otras Sagas</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Ingresa un valor"
                className="me-2 bg-dark text-white border-secondary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <Button onClick={handleSearch} variant="outline-light" className="border-secondary text-white">
                <i className="fa-solid fa-magnifying-glass me-1"></i>
                Buscar
              </Button>

              {/* BOTÓN CARRITO */}
              <Button
                onClick={() => setShowModal(true)}
                variant="outline-light"
                className="border-secondary text-white ms-2 position-relative"
              >
                <i className="fa-solid fa-cart-shopping me-1"></i>
                Carrito

                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ⬇️ AGREGA ESTO DESPUÉS DEL RETURN */}
      <CartModal 
        show={showModal}
        onClose={() => setShowModal(false)}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />
    </>
  );
};
