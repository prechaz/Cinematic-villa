import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));

  return userLoggedIn ? (
    <Route element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;