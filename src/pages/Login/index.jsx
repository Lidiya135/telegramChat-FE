import React from 'react';
import { loginUser } from '../../redux/action/login';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";
import styles from "./login.module.css";
import Input from "../../components/input";
import Button from "../../components/button";

export default function Login() {
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email format").required("Required"),
      password: yup.string().min(3, "Minimum 3 character").required("Required"),
    }),
    onSubmit: (values) => {
      try {
        dispatch(loginUser(values, navigate));
      } catch (error) {
        swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#6a4029",
        });
      }
    },
  });

  // const postData = (e) =>{
  //   e.preventDefault()
  //   console.log(email)
  //   console.log(password)
  //   let data = {
  //     email,password
  //   }
  //   dispatch(loginUser(data,navigate))
  // }

  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Login</h1>
        </div>
        <div className={styles.hai}>
          <p>Hi, Welcome back!</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
        {/* <form onSubmit={postData}> */}
          <div>
            <Input label="Email" type="email" name="email" className="inputLogin" placeholder="Telegram@gmail.com" value={formik.values.email} onChange={formik.handleChange} />
            {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
          </div>
          <div>
            <Input label="Password" type="password" name="password" className="inputLogin" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
            {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
              )}
          </div>
          <div className={styles.forgot}>
            {/* <Link to="#">Forgot password?</Link> */}
          </div>
          <div>
            <Button title="Login" btn="login" color="blue" type="submit"
            />
          </div>
          <div className={styles.textlogin}>
            Login with
          </div>
          <div>
            <Button title="Google" btn="login" color="white" />
          </div>
        </form>
        <div className={styles.signup}>
          Dont have an account?
          <Link to="/register"> Sign Up</Link>
        </div>
      </div>
    </div>
  )
}