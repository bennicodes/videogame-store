import { Link } from "react-router-dom";
import { getCartContext } from "../../context/cartContext";
import Button from "../Button/Button";
import styles from "./GameItem.module.css";

const GameItem = ({ game }) => {
  const { dispatch } = getCartContext();
  // Function to handle adding the game to the cart
  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: game });
  };
  return (
    <div className={styles.gameCard}>
      <div className={styles.imageContainer}>
        <img
          src={game.imageUrl}
          alt={game.title}
          className={styles.gameImage}
        />
      </div>
      {/* -------------- */}
      <h2 className={styles.gameTitle}>{game.title}</h2>
      {/* -------------- */}
      <p className={styles.gameGenre}>
        <b>Game genre:</b>
        {game.genre}
      </p>
      {/* -------------- */}
      <p className={styles.gameYear}>
        <b>Year:</b>
        {game.releaseYear}
      </p>
      {/* -------------- */}
      <p className={styles.gameRating}>
        <b>Rating:</b>
        {game.rating}
      </p>
      {/* -------------- */}
      <p className={styles.gamePrice}>
        <b>Price:</b>
        {game.price}
      </p>
      {/* -------------- */}
      <Link to={`/games/${game.id}`} className={styles.gameLink}>
        Details
      </Link>
      <Button className={styles.addToCartBtn} onClick={handleAddToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default GameItem;
