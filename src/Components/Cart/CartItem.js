import React, { useContext } from "react";
import classes from "./CartItem.module.css";
import axios from "axios";
import CartContext from "../Store/cart-context";

const CartItems = (props) => {
  let emailId = localStorage.getItem("email").replace(".", "").replace("@", "");
  const cartCntx = useContext(CartContext);

  const onRemoveHandler = (event) => {
    cartCntx.removeItem(props.id);
    const id = props._id;

    axios.delete(
      `https://crudcrud.com/api/c7a83aeaf6c64ce78b371ea4eebf611b/Cart${emailId}/${id}`
    );
  };

  return (
    <ul>
      <li id={`cart-item-${props.id}`}>
        <h2 className={classes.title}>{props.title}</h2>
        <img src={props.img} alt="icon" className={classes.img}></img>
        <span className={classes.price}> Rs.{props.price}</span>
        <span className={classes.quantity}> x {props.quantity}</span>
        <button className={classes.button} onClick={onRemoveHandler}>
          -
        </button>
      </li>
    </ul>
  );
};
export default CartItems;