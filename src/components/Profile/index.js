import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './profile.module.css';
// import back from '../../img/back.png';
import noImg from '../../img/noprofile.png';
import Input from "../input";
import swal from "sweetalert";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditProfile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("token");
  const idq = localStorage.getItem("id");
  const [profileDetail, setProfileDetail] = useState({});
  const [photo, setPhoto] = useState(null);
  useEffect(() => { 
      axios
      .get(`http://localhost:4001/users/${idq}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfileDetail(res.data.data[0]);
        // console.log("get data by id succes");
        console.log("data my profile", profileDetail);
      })
      .catch((err) => {
        // console.log("get data by id failed");
        console.log(err);
      });
    }, []);

  const [dataProfile, setDataProfile] = useState({
    username: profileDetail.username,
    email: profileDetail.email,
    bio: profileDetail.bio,
    phone: profileDetail.phone,
    photo: profileDetail.photo,
    password: profileDetail.password
  });

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleChange = (e) => {
    setDataProfile({
      ...dataProfile,
      [e.target.name]: e.target.value,
    });
  };

  const user = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("username", dataProfile.username);
    bodyFormData.append("email", dataProfile.email);
    bodyFormData.append("bio", dataProfile.bio);
    bodyFormData.append("phone", dataProfile.phone);
    bodyFormData.append("password", dataProfile.password);
    bodyFormData.append("photo", photo);

    axios
    .put(
      `http://localhost:4001/users/profile`,
      bodyFormData,
      user,
      { "content type": "multipart/form-data" }
    )
      .then((res) => {
        swal({
          title: "Good job!",
          text: `${res.data.message}`,
          icon: "success",
        });
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        swal({
          title: "Oops!",
          text: `${e.response.data.message}`,
          icon: "error",
        });
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit My Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className={styles.profile}>
            <div className={styles.backemail}>
              {/* <button className="btnmenu" onClick={handleUploadChange}>
                <img onClick={handleClose} src={back} alt="back" />
              </button>
              <span>{profileDetail.email}</span> */}
            </div>
            <label>
              <div className={styles.imgProfile}>
                <Input type="file" name="photo" value={dataProfile.photo} onChange={(e) => handlePhoto(e)}/>
                <img src={profileDetail.photo? profileDetail.photo: noImg} alt="gambar" />
              </div>
            </label>
            {/* <div className={styles.identity}>
              <Input type="text" className="inputProf"  placeholder={profileDetail.username} name="username" value={dataProfile.username} onChange={(e) => handleChange(e)} />
              <div>{profileDetail.bio}</div>
            </div> */}
            <div className={styles.phone}>
              <div>Number Phone</div>
              <Input type="text" className="inputData" placeholder={profileDetail.phone} name="phone" value={dataProfile.phone} onChange={(e) => handleChange(e)} />
            </div>
            <div className={styles.email}>
              <div>Email</div>
              <Input type="email" className="inputData" placeholder={profileDetail.email} name="email" value={dataProfile.email} onChange={(e) => handleChange(e)}/>
            </div>
            <div className={styles.email}>
              <div>Name</div>
              <Input type="text" className="inputData" placeholder={profileDetail.username} name="username" value={dataProfile.username} onChange={(e) => handleChange(e)}/>
            </div>
            <div className={styles.email}>
              <div>Password</div>
              <Input type="password" className="inputData" placeholder="input your password" name="password" value={dataProfile.password} onChange={(e) => handleChange(e)}/>
            </div>
            <div className={styles.bio}>
              <span>Bio</span>
              <Input type="text" className="inputData" placeholder={profileDetail.bio} name="bio" value={dataProfile.bio} onChange={(e) => handleChange(e)} />
              {/* <Buttonn title="Edit my profile" btn="editProf" onClick={(e) => handleUpload(e)} /> */}
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={(e) => handleUpload(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;
