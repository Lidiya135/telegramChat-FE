import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
// import swal from 'sweetalert';
import noimgprofile from "../../img/noprofile.png";
// import ImgMenu from "../../img/Menu.png";
import plus from "../../img/Plus.png";
import menuprofile from "../../img/profmenu.png";
// import ScrollToBottom from "react-scroll-to-bottom";
import Input from "../../components/input";
// import moment from "moment";
import styles from "./chat.module.css";
import Menu from "../../components/menu";
import EditProfile from "../../components/profile";
// import Friend from "../../components/friend";

const Chat = () => {
  // const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [profile, setProfile] = useState([]);
  const [login, setLogin] = useState({});
  const [socketio, setSocketIo] = useState(null);
  const [listchat, setListchat] = useState([]);
  const [message, setMessage] = useState();
  const [activeReceiver, setActiveReceiver] = useState({});
  const [activeChat, setActiveChat] = useState(1);
  const token = localStorage.getItem("token");
  const users = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const self = user;
  // const friend = JSON.parse(localStorage.getItem("receiver"));
  // const receiver = JSON.parse(localStorage.getItem('receiver'))

  // get data my profilee
  let getProfile = `http://localhost:4001/users/${user.id}`;
  useEffect(() => {
    axios
      .get(getProfile, users)
      .then((res) => {
        console.log("Get profile success");
        console.log(res.data.data[0]);
        setProfile(res.data.data[0]);
        console.log(profile, "data profile")
      })
      .catch((err) => {
        console.log("Get profile fail");
        console.log(err);
      });
  }, []);

  //get data users (friends)
  useEffect(() => {
    // const data = user;
    setLogin(user);
    console.log(login, "data login")

    axios
      .get(`http://localhost:4001/users`, users)
      .then((response) => {
        console.log("get users succes");
        setList(response.data.data);
        console.log(list, "data list dr users")
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  //chat
  useEffect(() => {
    const socket = io("http://localhost:4001");
    socket.on('send-message-response', (response) => {
      // set receiver
      const receiver = JSON.parse(localStorage.getItem('receiver'));
      console.log(receiver, "receiver get item")
      // Kondisi nampilkan data receiver
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        setListchat(response);
        console.log(listchat, "data dr list chat history")
      }
    });
    setSocketIo(socket);
  }, []);

  const SubmitMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const receiver = JSON.parse(localStorage.getItem("receiver"));
    // list history saat submit message dan save di db
    const payload = {
      sender: user.username,
      receiver: receiver.username,
      message,
    };
    console.log(payload, "data pada payload submit chat");
    setListchat([...listchat, payload]);
    const data = {
      sender: user.id,
      receiver: activeReceiver.id,
      message,
    };
    console.log(data, "pada data setelah submit chat");
    socketio.emit("send-message", data);
    setMessage("");
  };

  //select user friend
  const selectReceiver = (item) => {
    setListchat([]);
    setActiveReceiver(item);
    setActiveChat(2);
    console.log(activeReceiver, "ini dari active receiver");

   //set receiver
   localStorage.setItem("receiver", JSON.stringify(item));
   socketio.emit("join-room", login);
   const data = {
     sender: login.id,
     receiver: item.id,
   };
   console.log("ini data dr set receiver", data);
   socketio.emit("chat-history sockett", data);
 };
console.log(self, "selfff");
console.log(activeChat, "active chatt")
  return (
    <div className={styles.private}>
      <div className={styles.menu}>
        {/* <ProfileCard /> */}
        <div className="title-telegram">
          <h4>Telegram</h4>
          <div>
            <Menu />
          </div>
        </div>
        <div className={styles.myprofile}>
            <img src={profile.photo? profile.photo: noimgprofile} alt="" />
            <h4> {profile.username} </h4>
            <h6> {profile.bio} </h6>
        </div>
        <div className="text-center m-2">
            
        </div>
        <div className={styles.search}>
          <Input type="text" name="mesage" className="mesage" placeholder="Type your massage.." />
          <div>
            <img src={plus} alt="" />
          </div>
        </div>
        <div className="button-contact">
          <button>All</button>
          <EditProfile />
          {/* <button>Important</button>
          <button>Unread</button> */}
        </div> 
        <div className={styles.overfloww}>
          {list?.map((user) => (
            <div className="row mt-4" key={user.id} onClick={() => selectReceiver(user)}>
              <div className="col-2">
                <img src={user.photo? user.photo: noimgprofile} alt="" className="rounded-4" style={{ height: "50px", width: "50px" }}/>
                  </div>
                  <div className="col-7 offset-1">
                    <h6 className="text-start">{user.username}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>

      <div className={styles.message} key={activeReceiver.id}>
        <div className={styles.messageList}>
          <li className="active bg-friend">
            <div className={styles.name}>
              <div className="imgProfileFriend">
                <img src={activeReceiver.photo? activeReceiver.photo: noimgprofile} alt="" />
                {/* <img src={noimgprofile} alt="" /> */}
              </div>
              <div>
              {activeReceiver.username? activeReceiver.username: "choose your friend"} <br/>
              <span style={{fontSize:"14px", color: "#7E98DF",}}>{activeReceiver.username ? "Online" : "Offline"} </span>
              </div>
            </div>
            <div>
              <button className="btnmenu">
                <img src={menuprofile} alt="" />
              </button>
            </div>
          </li>
          <div className="wrapper-chat">
            {/* <ul className="list-group"> */}
            <div className={styles.overflow}>
              {listchat.map((item) => (
                <div key={item.id}>
                  {item.sender === login?.username ? (
                    <div>
                      <div className="text-end me-5 mt-4" style={{ color: "#7E98DF" }} >
                        <span>You</span><br/>
                        <div className="btn text-white" style={{borderRadius: "12px 3px 12px 12px", backgroundColor: "#7E98DF",  height: "45px",}}>
                          <p>{item?.message}</p>
                        </div>
                          <br/>
                          <span style={{fontSize:"12px", color:"grey"}}>{item?.created_at}</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="text-start me-5 mt-4" style={{ color:"#21796d" }}>
                        <span>{item?.sender}</span><br/>
                        <div className="btn text-white" style={{borderRadius:"3px 12px 12px 12px", backgroundColor: "#21796d", height: "45px",}}>
                          <p>{item?.message}</p>
                        </div> 
                        <br/>
                          <span style={{fontSize:"12px", color:"grey"}}>{item?.created_at}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="input-group mb-3 input">
          <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="Type your message..." aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button className="btn btn-outline-secondary" type="submit" onClick={SubmitMessage} id="button-addon2" >
              Kirim
            </button>
          </div>
        </div>
      </div>
      {/* <div id="detail" className={styles.detail}>
      <Friend />
      </div> */}
    </div>
  );
};

export default Chat;