import React from 'react';
import { Card, Row, Col, Button, Form, CardBody, CardTitle } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

const ProductCard = (props) => {
    const product = props.product;
    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(product.id);
    console.log(cart.items);


  return (
    <>
        <div className='w-48 h-32 flex flex-col justify-center items-center bg-white rounded-lg'>
            <div className='font-bold text-2xl pb-2'>{product.title}</div>
            <div>${product.price}</div>
            { productQuantity > 0 ?
            <>
            <Form as={Row}>
              <Form.Label column='true' sm='6'>In Cart: {productQuantity}</Form.Label>
              <Col sm='6'  >
                <Button sm='6' onClick={()=>cart.addOneToCart(product.id)} className='mx-2' >+</Button>
                <Button sm='6' onClick={()=>cart.removeOneFromCart(product.id)} className='mx-2' >-</Button>
              </Col>
            </Form>
            <Button variant='danger' onClick={()=>cart.deleteFromCart(product.id)} className='my-2' >Remove from Cart</Button>
            </>
            :
            <Button variant='primary' onClick={()=>cart.addOneToCart(product.id)} >Add to Cart</Button>
            }
        </div>
      
    </>
  );
}

export default ProductCard;
