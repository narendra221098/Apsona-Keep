import { useState } from "react";
//
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MoonLoader from "react-spinners/MoonLoader";
//
import fetchCall from "../../utils/fetchCall";
//
import styles from "./index.module.css";

const emptyForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (key, e) => {
    setFormData({ ...formData, [key]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      const { email, password } = formData;
      if (email === "" && password === "") {
        return setError("Please enter email & password");
      }
      if (email === "") {
        return setError("Please enter a email");
      }
      if (password === "") {
        return setError("Please enter a  password");
      }

      const endpoint = "/users/login";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      };
      const res = await fetchCall(endpoint, options);
      if (!res.status) {
        setError(res.msg);
        return;
      }
      Cookies.set("token", JSON.stringify(res.token));
      setError("");
      setFormData(emptyForm);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const token = Cookies.get("token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.myForm} onSubmit={handleSubmit}>
        {/* <!-- title --> */}
        <div className={styles.formTitleContainer}>
          <h1>Keep</h1>
          <small>Please login with your credentials</small>
        </div>
        {/* <!-- email --> */}
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email Address (e.g., user@example.com)</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e)}
          />
        </div>
        {/* <!-- password --> */}
        <div className={styles.inputContainer}>
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e)}
          />
        </div>
        <small className={styles.errorMsg}>{error}</small>

        {isLoading ? (
          <MoonLoader size={16} color="blue" className="loader" />
        ) : (
          <button type="submit" disabled={isLoading}>
            Login
          </button>
        )}
        <p className={styles.navLink}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
