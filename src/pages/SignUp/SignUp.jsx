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
  // Retrieving the selected image and displaying preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setSignUpFormData((prevData) => ({
        ...prevData,
        profilePicture: file,
        previewUrl: previewUrl,
      }));
      console.log("File selected:", file);
    } else {
      setSignUpFormData((prevData) => ({
        ...prevData,
        profilePicture: null,
        previewUrl: "",
      }));
    }
  };
  // Remove image preview
  const handleRemoveImage = () => {
    setSignUpFormData((prevData) => ({
      ...prevData,
      profilePicture: null,
      previewUrl: "",
    }));
    fileInputRef.current.value = "";
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
            value={signUpFormData.firstname}
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
            value={signUpFormData.lastname}
          />
          {/* -------------------------------------- */}
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
            onChange={handleChange}
            value={signUpFormData.dateOfBirth}
          />
          {/* -------------------------------------- */}
          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className={styles.formInput}
            accept=".jpg, .png, .jpeg"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {signUpFormData.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={signUpFormData.previewUrl}
                alt="User´s profile pic"
                className={styles.imagePreview}
              />
              <button
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
              >
                Remove photo
              </button>
            </div>
          )}
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
            value={signUpFormData.email}
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
            value={signUpFormData.password}
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
            value={signUpFormData.confirmPassword}
          />
          {/* -------------------------------------- */}
        </fieldset>
        <Button className={styles.createAccountButton}>Create account</Button>
      </form>
    </div>
  );
};

export default SignUp;
