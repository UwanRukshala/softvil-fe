import { useSelector } from 'react-redux';
import { ROLES } from '../utils/roles';

export const useAuth = () => {
    const { user } = useSelector((state) => state.user);
    
    return {
        isAdmin: user?.role === ROLES.ADMIN,
        isUser: user?.role === ROLES.USER,
        isHost: user?.role === ROLES.HOST,
        userId: user?.id,
        userEmail: user?.email,
    };
};