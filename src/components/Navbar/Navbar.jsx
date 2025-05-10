import { faBars, faCartPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { getAuthContext } from "../../context/authContext";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = getAuthContext();
  return (
    <nav className={styles.navbar}>
      {/* -------------------------- */}
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <img
            src="/icons/playstation-controller.svg"
            alt="Playstation controller logo"
          />
        </div>
        {/* -------------------------- */}
        <div className={styles.cartHamburgerMenu}>
          {user ? (
            <Button className={styles.signOutButton}>Sign out</Button>
          ) : (
            <Link to="/sign-in" className={styles.SignInLink}>
              Sign in
            </Link>
          )}
          {user && (
            <Link to="/profile" className={styles.profileButton}>
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="User´s profile picture" />
              ) : (
                <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
              )}
            </Link>
          )}
          <Link className={styles.cartButton}>
            <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
          </Link>

          <Button className={styles.hamburgerButton}>
            <FontAwesomeIcon icon={faBars} className={styles.hamburgerMenuIcon} />
          </Button>
        </div>
      </div>
      {/* -------------------------- */}
      <div className={styles.secondRow}>
        <NavLink to="/" className={({isActive})=>(isActive ? styles.activeLink : "")}>Home</NavLink>
        <NavLink to="/games" className={({isActive})=>(isActive ? styles.activeLink : "")}>Games</NavLink>
        <NavLink to="/contact" className={({isActive})=>(isActive ? styles.activeLink : "")}>Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
