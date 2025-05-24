import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { ROLES } from '../utils/roles';

const protectWithAdmin = (WrappedComponent) => {
  return function (props) {
    const { user } = useSelector((state) => state.user);
    
    if (user?.role !== ROLES.ADMIN) {
      toast.error("Access denied: Admin privileges required");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default protectWithAdmin;