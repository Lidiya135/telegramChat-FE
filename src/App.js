import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import socketIO from 'socket.io-client';
import Login from './pages/Login';
import Register from './pages/Register';
// import Test from './pages/test';
// import EditProfile from './components/profile';
import GroupChat from './pages/GroupChat';
// import Menu from './components/menu';
// import Friend from './components/friend';
import Chat from "./pages/PrivateChat/chat";

function App() {
 
  const socket = socketIO.connect("http://localhost:4001");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} replace="true" />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groupchat" element={<GroupChat />} />
        {/* <Route path="/editprofile" element={<EditProfile />} /> */}
        {/* <Route path="/menu" element={<Menu />} /> */}
        {/* <Route path="/friend" element={<Friend />} /> */}
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
