import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import LogIn from '../pages/LogIn';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Home />
           </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default AllRoutes;
