import React from "react";
import { Button, Container, Navbar, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../CartContext";
import { CartProduct } from "./CartProduct";

const CustomNavbar = ({ handleLogout }) => {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Shopping Cart</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} items)</Button>
          <div className="mx-2">
            <Button
              onClick={handleLogout}
              className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success">Purchase Items!</Button>
            </>
          ) : (
            <h1>Shopping cert is empty!! </h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomNavbar;
