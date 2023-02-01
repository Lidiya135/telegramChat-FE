import React from "react";
import styles from "./friend.module.css";
import she from "../../img/she.png";
import back from "../../img/back.png";
import chat from "../../img/Chat.png";

const Friend = () => {
  return (
    <div id="detail" className={styles.detail}>
      <div className={styles.backemail}>
        {/* <button className="btnmenu" onClick={onClick}> */}
        <button className="btnmenu">

          <img src={back} alt="back" />
        </button>
        {/* <span>{email}</span> */}
        <span>lidiyawati@gmail.com</span>

      </div>
      <div className={styles.imgProfile}>
        {/* <img src={img} alt="gambar" /> */}
        <img src={she} alt="gambar" />

      </div>
      <div className={styles.identity}>
        <div>
          {/* <div>{name}</div> */}
          <h5>lidiyawati</h5>

        </div>
        <div>
          <img src={chat} alt="gambar" />
        </div>
      </div>
      <div className={styles.phone}>
        {/* <div>{phone}</div> */}
        <div>08136661234</div>
        
      </div>
      <div className={styles.menu}>
        <div>Location</div>
        <div>Image</div>
        <div>Documents</div>
      </div>
    </div>
  );
};

export default Friend;
