// import { preview } from "vite";
import { useRef, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./SignUp.module.css";
const SignUp = () => {
  // Declaring states and variable refs
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: null,
    previewUrl: "",
  });
  const fileInputRef = useRef(null);
  // Retrieve input values
  const handleChange = (e) => {
    if (e.target.type === "file") return;
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm}>
        <h2>Sign-up Form</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your first name"
            maxLength={50}
            className={styles.formInput}
            onChange={handleChange}
          />
          {/* -------------------------------------- */}
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your last name"
            maxLength={50}
            className={styles.formInput}
            onChange={handleChange}
          />
          {/* -------------------------------------- */}
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
            onChange={handleChange}
          />
          {/* -------------------------------------- */}
          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className={styles.formInput}
            accept=".jpg, .png, .jpeg"
          />
          {/* -------------------------------------- */}
        </fieldset>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Information</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            className={styles.formInput}
            onChange={handleChange}
          />
          {/* -------------------------------------- */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={styles.formInput}
            onChange={handleChange}
          />
          {/* -------------------------------------- */}
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your password"
            className={styles.formInput}
            onChange={handleChange}
          />
          {/* -------------------------------------- */}
        </fieldset>
        <Button className={styles.createAccountButton}>Create account</Button>
      </form>
    </div>
  );
};

export default SignUp;
