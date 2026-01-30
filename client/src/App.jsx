import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/home/Home';
import Landingpage from './pages/landingpage/Landingpage';
import Generate from './pages/generate/Generate';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import MyTickets from './pages/mytickets/MyTickets';
import AllTickets from './pages/alltickets/AllTickets';

 export const AuthContext = createContext(null);

const App = () => {

  const [user, setUser] = useState();

  return (
     <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mytickets" element={<MyTickets />} />
          <Route path="/alltickets" element={<AllTickets />} />
        </Routes>
      </Router>
    </AuthContext.Provider>

  );
};

export default App;