import { useState } from "react";
import { getCartContext } from "../../context/cartContext";
import Button from "../Button/Button";
import styles from "./Counter.module.css";

const Counter = ({ item }) => {
  const { dispatch } = getCartContext(); // Get cart items from context
  const handleIncrease = () => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch({ type: "DECREASE_QUANTITY", payload: item.id });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: item.id }); // Remove if quantity is 0
    }
  };

  return (
    <div className={styles.counterCard}>
      <Button
        ariaLabel="Decrease count"
        className={styles.decreaseButton}
        onClick={handleDecrease}
      >
        -
      </Button>
      <span className={styles.countDisplay}>{item.quantity}</span>
      <Button
        ariaLabel="Increase count"
        className={styles.increaseButton}
        onClick={handleIncrease}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
