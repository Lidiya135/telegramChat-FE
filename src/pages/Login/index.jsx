import React, { useState } from 'react'
import { loginUser } from '../../redux/action/login'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from "./login.module.css";
import Input from "../../components/input";
import Button from "../../components/button";

export default function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const postData = (e) =>{
    e.preventDefault()
    console.log(email)
    console.log(password)
    let data = {
      email,password
    }
    dispatch(loginUser(data,navigate))
  }

  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Login</h1>
        </div>
        <div className={styles.hai}>
          <p>Hi, Welcome back!</p>
        </div>
        <form onSubmit={postData}>
          <div>
            <Input label="Email" type="email" name="email" className="inputLogin" placeholder="Telegram@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <Input label="Password" type="password" name="password" className="inputLogin" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className={styles.forgot}>
            <Link to="#">Forgot password?</Link>
          </div>
          <div>
            <Button title="Login" btn="login" color="blue" type="submit"
            />
          </div>
          <div className={styles.textlogin}>
            Login
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