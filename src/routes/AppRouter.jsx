import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import EventDetails from "../pages/EventDetails";
import EventManagement from "../pages/EventManagement";
import UserManagement from "../pages/UserManagement";
import MyProfile from "../pages/MyProfile";
import SignUp from "../pages/SignUp";

const AppRouter = () => {
    const { user } = useSelector((state) => state.user);
    console.log(user);

    return (
        <Routes>
            <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={<PrivateRoute element={<MainLayout />} />}>
                <Route index element={<Dashboard />} />
                <Route path="events/:eventId" element={<EventDetails />} />
                <Route path="events/manage" element={<EventManagement />} />
                <Route path="users/manage" element={<UserManagement />} />
                <Route path="myprofile" element={<MyProfile />} />
            </Route>
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
    );
};
export default AppRouter;