import { useSelector } from "react-redux";
import { ROLES } from "../utils/roles";
import toast from "react-hot-toast";

export const WithAdminComp = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  
  if (user?.role !== ROLES.ADMIN) {
    toast.error("Access denied: Admin privileges required");
    return null;
  }

  return children;
};
