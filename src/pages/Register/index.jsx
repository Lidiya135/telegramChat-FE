import React, { useState } from 'react'
import { registerUser } from '../../redux/action/register'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from "./register.module.css";
import Input from "../../components/input";
import Button from "../../components/button";

export default function Register() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const postData = (e) =>{
    e.preventDefault()
    console.log(email)
    console.log(password)
    console.log(username)
    let data = {
      email,password,username
    }
    dispatch(registerUser(data,navigate))
  }

  return(
    <div className={styles.page}>
    <div className={styles.login}>
      <div className={styles.title}>
        <h1>Register</h1>
      </div>
      <div className={styles.hai}>
        <p>Lets create your account!</p>
      </div>
      <form onSubmit={postData}>
        <div>
          <Input label="Name" type="text" name="username" className="inputLogin" placeholder="Telegram app" value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div>
          <Input label="Email" type="email" name="email" className="inputLogin" placeholder="telegram@gmail.com"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div>
          <Input label="Password" type="password" name="password" className="inputLogin" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className={styles.forgot}>
        Do you have an account?  
            <Link to="/login"> Login</Link>
          </div>
        <div className={styles.butonlogin}>
          <Button type="submit" title="Register" btn="login" color="blue" onClick="" />
        </div>
      </form>
      <div className={styles.textlogin}>
        Register with
      </div>
      <div>
        <Button title="Google" btn="login" color="white" />
      </div>
    </div>
  </div>
  )
}
