import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import api from '../../config/axiosConfig';
import { addUser } from '../../reducers/user/userSlice';
import { REGISTER_USER_BY_ADMIN } from '../../config/urls';


export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    HOST: 'HOST'
};

function AddUserModal({ isOpen, onClose, currentUser }) {
    const dispatch = useDispatch();
    
    // Form state
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [role, setRole] = useState(currentUser?.role || ROLES.USER);
    const [bothAdminAndHost, setBothAdminAndHost] = useState(currentUser?.bothAdminAndHost || false);
    const [status, setStatus] = useState(currentUser?.status ?? true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleClose = () => {
        setName('');
        setEmail('');
        setRole(ROLES.USER);
        setBothAdminAndHost(false);
        setStatus(true);
        setError('');
        onClose();
    };

    const handleSave = async () => {
        if (!name || !email) {
            setError('Name and email are required');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const userData = {
                username: name,
                email,
                role,
                bothAdminAndHost,
                status
            };

            let response;
            if (currentUser) {
                // Update existing user
                // response = await axios.put(`/api/users/${currentUser.id}`, userData);
            } else {
                // Create new user
                response = await api.post(REGISTER_USER_BY_ADMIN, userData);
                if(response.status==201){
                    dispatch(addUser(response.data))
                }
            }

            handleClose();
        } catch (err) {
            console.error('Error saving user:', err);
            setError(err.response?.data?.message || 'Failed to save user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur min-w-2/3">
            <div className="relative bg-[#222323] rounded-lg p-6 w-full max-w-md text-white shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-white hover:text-red-400 text-xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                
                <h2 className="text-xl font-semibold mb-4">
                    {currentUser ? 'Edit User' : 'Add New User'}
                </h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-500/20 text-red-300 rounded text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                            Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                        >
                            <option value={ROLES.USER}>User</option>
                            <option value={ROLES.ADMIN}>Admin</option>
                            <option value={ROLES.HOST}>Host</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="bothAdminAndHost"
                            checked={bothAdminAndHost}
                            onChange={(e) => setBothAdminAndHost(e.target.checked)}
                            className="h-4 w-4 text-[#3b82f6] focus:ring-[#3b82f6] border-gray-400 rounded"
                        />
                        <label htmlFor="bothAdminAndHost" className="ml-2 block text-sm text-gray-300">
                            Both Admin and Host
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="status"
                            checked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            className="h-4 w-4 text-[#3b82f6] focus:ring-[#3b82f6] border-gray-400 rounded"
                        />
                        <label htmlFor="status" className="ml-2 block text-sm text-gray-300">
                            Active
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3f5373] disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save User'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;