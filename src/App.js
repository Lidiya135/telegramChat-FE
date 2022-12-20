import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/test';
import PrivateChat from './pages/PrivateChat';
import GroupChat from './pages/GroupChat';
import Profile from './components/Profile';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groupchat" element={<GroupChat />} />
        <Route path="/privatechat" element={<PrivateChat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
