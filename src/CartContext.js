import {createContext, useState } from 'react';
import { productsArray, getProductData } from './productStores';
//context(cart,add to cart, remove cart)
//provider => gives your react app access to all the things in your context

export const CartContext = createContext({ //Cart context is created using createContext
  items:[],
  getProductQuantity:()=>{},
  addOneToCart:()=>{},
  removeOneFromCart:()=>{},
  deleteFromCart:()=>{},
  getTotalCost:()=>{},

});

export function CartProvider({children}){
  const [cartProducts, setCartProducts]=useState([]);

  function getProductQuantity(id){
    const quantity = cartProducts.find( product => product.id === id)?.quantity;
    if (quantity === undefined){
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id){
    const quantity = getProductQuantity(id);
    if (quantity === 0) { // Product is not in cart
      // Add the product to the cart with quantity 1
      setCartProducts([
        ...cartProducts, //spread operator  creates a copy of the current cartProducts array.
        {
          id: id,
          quantity: 1
        }
      ]);
    } else { // Product is already in cart
      // Update the quantity of the product in the cart
      setCartProducts(
        cartProducts.map(product =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 } // If statement is true
            : product // If statement is false
        )
      );
    }}

    function removeOneFromCart(id){
      const quantity=getProductQuantity(id);

      if(quantity === 1){
        deleteFromCart(id);
      }else{
        setCartProducts(
          cartProducts.map(
            product=>
            product.id===id
            ?{...product,quantity:product.quantity-1} //if statement is true
            :product                                //if statement is false
  
          ))
      }}

    function deleteFromCart(id){
      //if an object meets a condition, the filter add the object to array
      setCartProducts(
        cartProducts=>
        cartProducts.filter(currentProduct=>{   
          return currentProduct.id!==id;
        })
        //filter method create a new array containing all the 
        // elements whose id != to the deleting element id & update the state with new array
      )
    }

    function getTotalCost(){
      let totalCost=0;
      cartProducts.map((cartItem)=>{ //Each element in the cartProducts represents a "cartItem."
        const productData = getProductData(cartItem.id);
        totalCost+=(productData.price*cartItem.quantity);      
      }); return totalCost;

    }

  const contextValue={
    items:cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  
  }


  return (
    <CartContext.Provider value={contextValue}>
        {children}
    </CartContext.Provider>
)
}

export default CartProvider;