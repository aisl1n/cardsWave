import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
// @ts-ignore
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Redirect to='/' />;
  }
  return children;
};

export default ProtectedRoute;