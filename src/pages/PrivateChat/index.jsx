import React from 'react';
import styles from "./chat.module.css";
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";

export default function Chat() {

  const [message,setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages,setMessages] = useState([]);

  const handleMessage = () =>{
    socket.emit("message",message)
    setMessage("")
  }

  useEffect(()=>{
    const resultSocket = io("http://localhost:4000");
      setSocket(resultSocket);
  },[])

  useEffect(()=>{
    if(socket){
    socket.on("messageBe",(data)=>{
      setMessages(current=>[...current, data])
    })
  }
  },[socket])

  return (
    <div className={styles.pagechat}>
    <div className={styles.contact}>
      <div>
        <h6>Telegram</h6>
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <button>All</button>
        <button>important</button>
        <button>Unread</button>
      </div>
      <div>Contact</div>
    </div>
  
    <div className={styles.chat}>
      <div className={styles.text}>
        {messages.map((item,index)=>(
        <p key={index+1}>{item.message} - {item.date}</p>
        ))}
      </div>
        <input type="text" value={message} name="message" onChange={(e)=>setMessage(e.target.value)} />
        <button onClick={handleMessage}>Send</button>
    </div>
  </div>
  );
};