import axios from 'axios';
import React, { useState, useEffect } from 'react';
import api from '../config/axiosConfig';
import { UserTableWithPagination } from '../components/userManagement/UserTableWithPagination';
import AddUserModal from '../components/userManagement/AddUserModal';
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../reducers/user/userSlice';
import { GET_ALL_USERS } from '../config/urls';
import { fetchAllUsers } from '../reducers/user/userThunks';

const UserManagement = () => {

    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [bothAdminAndHost, setBothAdminAndHost] = useState(false);
    const [status, setStatus] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleAddUser = () => {
        setCurrentUser(null);
        setIsModalOpen(true);
    };


    const fetchUsers = async (page) => {
        try {
   
            dispatch(
                fetchAllUsers({page:page,size:itemsPerPage})
            )
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);



    const handleDeleteUser = async (userId) => {
        try {
            await api.delete(`/api/users/${userId}`);
            fetchUsers(currentPage); // Refresh the current page
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSave = async () => {
        const userData = {
            name,
            email,
            role,
            bothAdminAndHost,
            status
        };

        const url = currentUser ? `/api/users/${currentUser.id}` : '/api/users';
        const method = currentUser ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        setIsModalOpen(false);
        fetchUsers();
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setBothAdminAndHost(user.bothAdminAndHost);
        setStatus(user.status);
        setIsModalOpen(true);
    };

    const openNewModal = () => {
        setCurrentUser(null);
        setName('');
        setEmail('');
        setRole('USER');
        setBothAdminAndHost(false);
        setStatus(true);
        setIsModalOpen(true);
    };

    return (
        <div className="user-management">
            <h1 className='text-xl'>User Management</h1>

            <div className="search-bar flex flex-row gap-x-2 w-3/4 px-4 py-2 mt-6 bg-gray-900 rounded-2xl">
                <input
                    type="text"
                    placeholder="Search users..."
                    className='w-full py-2 border-0 px-1'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='bg-red-900 px-4 py-2 rounded-full' onClick={fetchUsers}>Search</button>
            </div>
            <div className='p-3 my-4 flex flex-col gap-y-3'>
                <div>
                    <h1>Register Users</h1>
                </div>
                <div>
                    <button className='bg-green-800 px-3 py-2 rounded' onClick={openNewModal}>Add New User</button>
                </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0 ">
                <UserTableWithPagination

                    searchTerm={searchTerm}
                    onEditUser={handleEditUser}
                    onDeleteUser={handleDeleteUser}
                    onPageChange={handlePageChange}
                />

            </div>


            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentUser={currentUser}
            />

        </div>
    );
};

export default UserManagement;