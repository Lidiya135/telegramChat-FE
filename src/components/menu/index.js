import React from "react";
import setting from "../../img/setting.png";
import contact from "../../img/contact.png";
import call from "../../img/call.png";
import save from "../../img/save.png";
import invite from "../../img/invite.png";
import menu from "../../img/Menu.png";
import FAQ from "../../img/FAQ.png";
import styles from "./menu.module.css";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function Menu() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await localStorage.clear();
    swal({
      title: "Log Out",
      text: `Log Out Success`,
      icon: "success",
    });
    navigate("/login");
  }

  return (
    <Dropdown as={ButtonGroup}>

      <img className={styles.img} src={menu} alt=""/>

      <Dropdown.Toggle split variant="none" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <div className={styles.menu}>
          <div className={styles.submenu}>
            <div className={styles.image}>
              <img src={setting} alt="" />
            </div>
            <Button btn="menu" title="Setting" />
          </div>
          <div className={styles.submenu}>
            <div className={styles.image}>
              <img src={contact} alt="" />
            </div>
            <Button btn="menu" title="Contact" />
          </div>
          <div className={styles.submenu}>
            <div className={styles.image}>
              <img src={call} alt="" />
            </div>
            <Button btn="menu" title="Calls" />
          </div>
          <div className={styles.submenu}>
            <div className={styles.image}>
              <img src={save} alt="" />
            </div>
            <Button btn="menu" title="Save message" />
          </div>
          <div className={styles.submenu}>
            <div className={styles.image}>
              <img src={invite} alt="" />
            </div>
            <Button btn="menu" title="Invite Friends" />
          </div>
          <div className={styles.submenu}>
            <div className={styles.image}>
              <img src={FAQ} alt="" />
            </div>
            <Button btn="menu" title="Telegram FAQ" />
          </div>
          <div className={styles.submenu}>
            <div className={styles.image}>
              {/* <img src="" alt="" /> */}
            </div>
            <Button btn="menu" title="Exit/Logout" onClick={() => handleLogout()} />
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Menu;
