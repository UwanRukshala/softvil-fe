import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const { user } = useSelector((state) => state.user);
  return user ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
