import { useSelector } from "react-redux";
import { ROLES } from "../utils/roles";
import toast from "react-hot-toast";

export const WithAdminAndHostComp = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  
  if (user?.role !== ROLES.ADMIN && user?.role !== ROLES.HOST) {
    toast.error("Access denied: Admin privileges required");
    return null;
  }

  return children;
};
