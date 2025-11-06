import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';
import { NavBar } from './sharedComponents/NavBar';
import type { coffeeProps } from '../interfaces/coffe.interfaces';
import { createCoffee, deleteCoffee } from '../actions/admin.actions';
import './AdminPanelPage.css';
import { normalized } from '../helpers';

const API = 'http://localhost:3001';

export const AdminPanel: React.FC = () => {
  const [list, setList] = useState<coffeeProps[]>([]);
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState<number | ''>('');

  const load = async () => {
    const res = await fetch(`${API}/coffe`);
    const data = await res.json();
    setList(data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!nombre || !precio) return alert('Nombre y precio obligatorios');
    const newCoffee: Omit<coffeeProps, 'id'> = {
      nombre,
      nombre_normalizado : normalized(nombre),
      imagen: imagen || '/img/default.jpg',
      descripcion,
      precioCLP: Number(precio),
    };
    const res = await createCoffee(newCoffee);
    if (!res.ok) return alert(res.message);
    await load();
    setNombre(''); setImagen(''); setDescripcion(''); setPrecio('');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar café?')) return;
    const res = await deleteCoffee(id);
    if (!res.ok) return alert(res.message);
    await load();
  };

  return (
    <>
      <NavBar
        onQuery={() => {}}
        cart={[]}
        increaseQty={() => {}}
        decreaseQty={() => {}}
        clearCart={() => {}}
        showCart={false}
      />

      <Container className="admin-panel mt-4">
        <h2 className="text-center mb-4 text-light">Panel de Administración</h2>

        <Card className="admin-card shadow-lg p-4 mb-5">
          <h4 className="mb-3">Agregar nuevo café</h4>
          <Form className="admin-form">
            <Row>
              <Col md={3}>
                <Form.Control
                  placeholder="Nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="mb-2"
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  placeholder="Imagen (url)"
                  value={imagen}
                  onChange={e => setImagen(e.target.value)}
                  className="mb-2"
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  placeholder="Precio"
                  type="number"
                  value={precio}
                  onChange={e => setPrecio(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mb-2"
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  className="mb-2"
                />
              </Col>
              <Col md={1}>
                <Button variant="success" onClick={handleAdd} className="w-100">
                  Agregar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card className="admin-card shadow-lg p-4">
          <h4 className="mb-3">Lista de cafés</h4>
          <Table bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio (CLP)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id}>
                  <td>
                    <img src={c.imagen} alt={c.nombre} className="coffee-img" />
                  </td>
                  <td>{c.nombre}</td>
                  <td>{c.descripcion}</td>
                  <td>{c.precioCLP}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(c.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};
