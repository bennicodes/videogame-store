import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebaseConfig";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import useSignInValidation from "../../hooks/useSignInValidation";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  // Destructuring sign in validation and errors
  const { validateSignIn, signInErrors } = useSignInValidation();
  // Redirection
  const navigate = useNavigate();

  // Retreive sign in form values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Sign users in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) {
      console.log("Form is invalid");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      const user = userCredential.user;
      navigate("/games");
      console.log("Successfully signed in", user);
      setSignInFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Reset password
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail.trim()) {
      setResetMessage("Email is required to reset password");
      return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      newErrors.email = "Please enter a valid email address";
      return;
    }
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      console.log("Password reset email sent successfully");

      setResetMessage(
        "Password reset email sent successfully. Check your inbox."
      );
      setResetEmail("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <h2>Sign-in Form</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.email}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.email}</p>
          )}
          {/* -------------------------- */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.password}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.password}</p>
          )}
        </fieldset>
        {/* -------------------------- */}
        <p>
          Don´t have an account? Create one <Link to="/sign-up">here</Link>
        </p>
        <p>
          Forgot your password? Reset it{" "}
          <Button
            className={styles.forgotPasswordButton}
            type="button"
            onClick={() => setShowForgotPasswordModal(true)}
          >
            here
          </Button>
        </p>
        <Button className={styles.signInButton}>Sign in</Button>
      </form>
      {/* -------------------------- */}
      {showForgotPasswordModal && (
        <Modal>
          <form className={styles.resetFormContainer}>
            <p>
              Please enter your email address and press "reset". You will
              receive an email with a link to reset your password.
            </p>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="resetEmail"
              id="resetEmail"
              placeholder="Enter your email address"
              className={styles.formInput}
              onChange={(e) => setResetEmail(e.target.value)}
              value={resetEmail}
            />
            <div className={styles.resetButtonsContainer}>
              <Button
                className={styles.resetPasswordButton}
                onClick={handlePasswordReset}
              >
                Reset Password
              </Button>
              <Button
                className={styles.closeButton}
                type="button"
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetMessage("");
                  setResetEmail("");
                }}
              >
                Close
              </Button>
            </div>
            {resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignIn;
