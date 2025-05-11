// import { preview } from "vite";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../../firebaseConfig";
import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import { useSignUpValidation } from "../../hooks/useSignUpValidation";
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

  // Validate function from costume hook
  const { validate, errors } = useSignUpValidation();

  // Sign up function from costume hook
  const { signUp, signUpErrors, user } = useAuth();

  // Redirect users
  const navigate = useNavigate();

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
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(signUpFormData)) {
      console.log("Form is not valid");
      return;
    }
    try {
      const userCredential = await signUp(
        signUpFormData.email,
        signUpFormData.password
      );
      const user = userCredential.user;
      console.log("User created successfully:", userCredential.user);

      await setDoc(doc(database, "users", user.uid), {
        uid: user.uid,
        firstname: signUpFormData.firstname,
        lastname: signUpFormData.lastname,
        email: signUpFormData.email,
        dateOfBirth: signUpFormData.dateOfBirth || "",
        profilePicture: "" || null,
        createdAt: serverTimestamp(),
      });
      navigate("/verify-email");
      console.log("User data saved to Firestore");

      // Reset form
      setSignUpFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        profilePicture: null,
        previewUrl: "",
      });
      fileInputRef.current.value = "";
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };
  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm} onSubmit={handleSubmit} noValidate>
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
          {errors && <p className={styles.errorMessage}>{errors.firstname}</p>}
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
          {errors && <p className={styles.errorMessage}>{errors.lastname}</p>}

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
          {errors && <p className={styles.errorMessage}>{errors.email}</p>}

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
          {errors && <p className={styles.errorMessage}>{errors.password}</p>}

          {/* -------------------------------------- */}
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your password"
            className={styles.formInput}
            onChange={handleChange}
            value={signUpFormData.confirmPassword}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}

          {/* -------------------------------------- */}
        </fieldset>
        <Button className={styles.createAccountButton}>Create account</Button>
      </form>
    </div>
  );
};

export default SignUp;
