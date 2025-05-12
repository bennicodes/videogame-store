import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Counter from "../../components/Counter/Counter";
import Modal from "../../components/Modal/Modal";
import { getAuthContext } from "../../context/authContext";
import { getCartContext } from "../../context/cartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, dispatch } = getCartContext();
  const { user } = getAuthContext();
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      setShowRedirectModal(true);
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const totalPrice = useMemo(() => {
    console.log(cart);

    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);
  console.log(totalPrice);

  return (
    <div className={styles.cartContainer}>
      {cart.length === 0 ? (
        <p className={styles.emptyCard}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartListContainer}>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.gameImage}
                />
                <div className={styles.gameDetails}>
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Total: ${item.price * item.quantity.toFixed(2)}</p>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    className={styles.removeButton}
                  >
                    Remove{" "}
                  </Button>
                </div>
                <div className={styles.quantity}>
                  <Counter className={styles.itemCount} item={item} />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.totalContainer}>
            <p className={styles.totalAmount}>Total: {`$${totalPrice}`}</p>
          </div>
          <Button className={styles.toCheckoutLink} onClick={handleCheckout}>
            To Checkout
          </Button>
          {showRedirectModal && (
            <Modal>
              <div className={styles.redirectModalContent}>
                <p>
                  In order to complete your purchase you need to sign in. If you
                  already have an account please click on the "Go to sign-in
                  page". Otherwise, click on "Go to sign-up" to create a an
                  account. Once signed in, you'll be automatically redirected to
                  checkout.
                </p>
                <div className={styles.redirectLinksContainer}>
                  <Link to="/sign-in" className={styles.redirectLink}>
                    Go to sign-in page
                  </Link>
                  <Link to="/sign-up" className={styles.redirectLink}>
                    Go to sign-up page
                  </Link>
                </div>
                <Button
                  onClick={() => setShowRedirectModal(false)}
                  className={styles.closeModalButton}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
