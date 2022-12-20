import React from 'react';
import styles from './profile.module.css';
import setting from '../../img/Settings.png';
import back from '../../img/back.png';
import she from '../../img/she.png';
import Button from "../../components/button";
import Input from "../../components/input";

export default function Profile() {
  return (
    <div className={styles.profile}>
      <div className={styles.backemail}>
        <button className="btnmenu">
          <img src={back} alt="back" />
        </button>
        <span>email</span>
      </div>
      <label>
        <div className={styles.imgProfile}>
          <Input type="file" name="editimgprofile" />
          <img src={she} alt="gambar" />
        </div>
      </label>
      <div className={styles.identity}>
        <Input type="text" className="inputProf" placeholder="Lidiya" name="name" />
        <div>bio</div>
      </div>
      <div className={styles.phone}>
        <div>Account</div>
        <Input type="text" className="inputData" placeholder="phone" name="phone" />
      </div>
      <div className={styles.email}>
        <div>Email</div>
        <Input type="email" className="inputData" placeholder="email@gmail.com" name="email"/>
      </div>
      <div className={styles.bio}>
        <span>Bio</span>
        <Input type="text" className="inputData" placeholder="bio" name="bio" />
        <Button title="tap to change profile" btn="editProf"></Button>
      </div>
      <div className={styles.menu}>
        <h4>Settings</h4>
        <div className={styles.submenu}>
          <div className={styles.image}>
            <img src={setting} alt="" />
          </div>
        </div>
      </div>
    </div>
  
  )
}
