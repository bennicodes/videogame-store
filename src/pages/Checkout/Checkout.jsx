import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../../firebaseConfig";
import Button from "../../components/Button/Button";
import Counter from "../../components/Counter/Counter";
import Modal from "../../components/Modal/Modal";
import { getAuthContext } from "../../context/authContext";
import { getCartContext } from "../../context/cartContext";
import usePaymentValidation from "../../hooks/usePaymentValidation";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const [paymentValues, setPaymentValues] = useState({
    cardName: "",
    paymentMethod: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    billingAddress: "",
  });
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { cart, dispatch } = getCartContext();
  const { user } = getAuthContext();
  const { paymentErrors, validatePaymentForm } = usePaymentValidation();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    console.log(cart);

    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePaymentForm(paymentValues)) {
      console.log("Payment form is invalid");
      return;
    }

    const orderData = {
      userId: user?.uid,
      orderNumber: nanoid(10),
      cartItems: cart,
      totalPrice,
      paymentMethod: paymentValues.paymentMethod,
      billingAddress: paymentValues.billingAddress,
      createdAt: serverTimestamp(),
    };
    try {
      await addDoc(collection(database, "orders"), orderData);
      dispatch({ type: "CLEAR_CART" });
      setShowCheckoutModal(true);
      console.log("Order placed successfully");
      setPaymentValues({
        cardName: "",
        paymentMethod: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.checkoutContainer}>
        <div className={styles.purchaseOverviewContainer}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
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
                      <p>Total: ${item.price * item.quantity}</p>
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
            </div>
          )}
        </div>
        <div className={styles.paymentContainer}>
          <form className={styles.paymentForm} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Payment Details</h2>

            <label htmlFor="cardName" className={styles.label}>
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              className={styles.input}
              placeholder="John Smith"
              onChange={handleChange}
              value={paymentValues.cardName}
            />
            {paymentErrors && (
              <p className={styles.errorMessage}>{paymentErrors.cardName}</p>
            )}
            <label htmlFor="paymentMethod" className={styles.label}>
              Payment Method
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              className={styles.paymentSelect}
              onChange={handleChange}
              value={paymentValues.paymentMethod}
            >
              <option value="">Select Payment Method</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
            {paymentErrors && (
              <p className={styles.errorMessage}>
                {paymentErrors.paymentMethod}
              </p>
            )}
            <label htmlFor="cardNumber" className={styles.label}>
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className={styles.input}
              maxLength="16"
              placeholder="1234 5678 9012 3456"
              onChange={handleChange}
              value={paymentValues.cardNumber}
            />
            {paymentErrors && (
              <p className={styles.errorMessage}>{paymentErrors.cardNumber}</p>
            )}
            <div className={styles.cardDetails}>
              <label htmlFor="expiry" className={styles.label}>
                Expiry Date
              </label>
              <div className={styles.expiryContainer}>
                <input
                  type="text"
                  name="expiryMonth"
                  placeholder="MM"
                  className={styles.expiryInput}
                  onChange={handleChange}
                  value={paymentValues.expiryMonth}
                />
                <input
                  type="text"
                  name="expiryYear"
                  placeholder="YYYY"
                  className={styles.expiryInput}
                  onChange={handleChange}
                  value={paymentValues.expiryYear}
                />
              </div>

              <div className={styles.cvvContainer}>
                <label htmlFor="cvv" className={styles.label}>
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className={styles.input}
                  maxLength="3"
                  placeholder="123"
                  onChange={handleChange}
                  value={paymentValues.cvv}
                />
                {paymentErrors && (
                  <p className={styles.errorMessage}>{paymentErrors.cvv}</p>
                )}
              </div>
            </div>
            {paymentErrors && (
              <div>
                <span className={styles.errorMessage}>
                  {paymentErrors.expiryMonth}
                </span>
                &nbsp;
                <span className={styles.errorMessage}>
                  {paymentErrors.expiryYear}
                </span>
              </div>
            )}
            <label htmlFor="billingAddress" className={styles.label}>
              Billing Address
            </label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              placeholder="123 Main St, City, Country"
              className={styles.input}
              onChange={handleChange}
              value={paymentValues.billingAddress}
            />
            {paymentErrors && (
              <p className={styles.errorMessage}>
                {paymentErrors.billingAddress}
              </p>
            )}
            <button type="submit" className={styles.payButton}>
              Complete Purchase
            </button>
          </form>
        </div>
        {showCheckoutModal && (
          <Modal>
            <div className={styles.checkoutModalContent}>
              <h2>Order Confirmed ✅</h2>
              <p>
                Thank you for your purchase! A confirmation receipt has been
                sent to your email.
              </p>
              <p>Check your inbox for details on your order.</p>
              <Button
                onClick={() => {
                  setShowCheckoutModal(false);
                  navigate("/games");
                }}
                className={styles.closeCheckoutModal}
              >
                Close
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Checkout;
