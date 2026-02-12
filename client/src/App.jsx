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
import LandingPage2 from './pages/landingpage2/LandingPage2';
import Auth from './pages/auth/Auth';
import User from './pages/user/User';
import User1 from './pages/user/User1';
import Admin from './pages/admin/Admin';
import Home1 from './pages/home/Home1';

 export const AuthContext = createContext(null);

const App = () => {

  const [user, setUser] = useState();

  return (
    //  <AuthContext.Provider value={{ user, setUser }}>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Landingpage />} />
    //       <Route path="/home" element={<Home />} />
    //       <Route path="/generate" element={<Generate />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route path="/mytickets" element={<MyTickets />} />
    //       <Route path="/alltickets" element={<AllTickets />} />
    //     </Routes>
    //   </Router>
    // </AuthContext.Provider>
    //<LandingPage2/>
    //<Auth/>
    //<User/>
    //<Admin/>
    <Router>
      <Routes>
        <Route path='/' element={<Home1/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/user' element={<User/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </Router>

  );
};

export default App;