import { useEffect, useState , type KeyboardEvent } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

interface Props {
  onQuery: (query:string) => void;  
}

export const NavBar = ({ onQuery }:Props) => {

  const [ query , setQuery ] = useState('');

  useEffect(()=> {
    const timeOutId = setTimeout(()=> {
      onQuery(query);
     },2000)

     return () => {
       clearTimeout(timeOutId);
     }

  },[query,onQuery])

  const handleSearch = () => {
    onQuery(query)
  }

  const handleKeyDown = (event:KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    <Navbar expand="lg" bg="black" variant="dark" className="border-bottom border-secondary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          <i className="fa-solid fa-mug-saucer me-2"></i>
          Golden Bean
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          
          <Nav className="me-auto">

            {/*catálogo */}
            <Nav.Link as={Link} to="/catalogo" className="text-white">
              <i className="fa-solid me-1"></i>
              Catalogo
            </Nav.Link>

            {/* Puedes poner otra página luego o quitarlo */}
            <Nav.Link as={Link} to="/" className="text-white">
              <i className="fa-solid fa-link me-1"></i>
              Link
            </Nav.Link>

            {/* Dropdown de ejemplo */}
            <NavDropdown 
              title={
                <span className="text-white">
                  <i className="fa-solid fa-list me-1"></i>
                  Sagas
                </span>
              } 
              id="basic-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#" className="text-white">
                Megaman Clásico
              </NavDropdown.Item>
              <NavDropdown.Item href="#" className="text-white">
                Megaman X
              </NavDropdown.Item>
              <NavDropdown.Divider className="bg-secondary" />
              <NavDropdown.Item href="#" className="text-white">
                Otras Sagas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Ingresa un valor"
              className="me-2 bg-dark text-white border-secondary"
              aria-label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <Button 
              onClick={handleSearch}
              variant="outline-light"
              className="border-secondary text-white"
            >
              <i className="fa-solid fa-magnifying-glass me-1"></i>
              Buscar
            </Button>

            <Button
              onClick={handleSearch}
              variant="outline-light"
              className="border-secondary text-white ms-2"
            >
              <i className="fa-solid fa-cart-shopping me-1"></i>
              Carrito
            </Button>

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
