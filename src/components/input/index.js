import React from "react";
import styles from "./input.module.css";

const Input = ({type, value, name, onChange, placeholder, className, label}) =>{
    return (
        <div className={styles.containerInput}>
            <label htmlFor={name}>
                {label}
            </label>
            <input type={type} label={label} value={value} name={name} onChange={onChange} placeholder={placeholder} className={styles[className]} />
        </div>
    )
};

export default Input;