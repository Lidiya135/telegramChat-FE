import React from 'react';
import styles from './groupchat.module.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Dropdown from 'react-bootstrap/Dropdown';

function GroupChat() {
  const [message,setMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])

  const [group, setGroup] = useState("global")
  const [name, setName] = useState("guest")
 
  useEffect(()=>{
    const resultSocket = io("http://localhost:4001")
    setSocket(resultSocket)
  },[])

  useEffect(()=>{
    if(socket){
      socket.emit('initialRoom',{room:group})
    }
    console.log(group)
    setMessages([])
  },[group])
  
  useEffect(()=>{
    if(socket){
      socket.on("messageBe",(data)=>{
        setMessages((current)=>[...current,data])
        console.log(data)
      })
      console.log(socket)
    }
  },[socket])

  const handleMessage = () =>{
    let data = {message,name,group}
    console.log(data)
    socket.emit('message',data)
    setMessage("")
  }

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

    <div className="App container m-5" >
      
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       {group}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>setGroup("global")}>global</Dropdown.Item>
        <Dropdown.Item onClick={()=>setGroup("javascript")}>javascript</Dropdown.Item>
        <Dropdown.Item onClick={()=>setGroup("php")}>php</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

      {/* <span> Username </span> */}
      <input type="text" value={name} name="name" onChange={(e)=>setName(e.target.value)} />
      
      <ul >
      {messages.map((item,index)=>(
          <li key={index+1}>{item.message} : {item.message}  - {item.date}</li>
        ))}
        </ul>
      
      <input type="text" value={message} name="message" onChange={(e)=>setMessage(e.target.value)} />
      <br />
      <button onClick={handleMessage}>send</button>
    </div>
  </div>
  )
}

export default GroupChat;