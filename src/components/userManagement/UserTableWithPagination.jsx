import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

export const UserTableWithPagination = ({
    searchTerm,
    onEditUser,
    onDeleteUser,
    onPageChange,
    itemsPerPage
}) => {

    const allUsers = useSelector(state => state.user.allUsers)

    const [currentPage, setCurrentPage] = useState(0);
 

    // Calculate the current items to display
    const filteredUsers = allUsers.content.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle page click
    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        onPageChange(event.selected);
    };

    return (
        <>
            <table className="min-w-full divide-y divide-gray-600 bg-transparent text-gray-400 border-collapse rounded-lg">
                <thead className="hidden md:table-header-group">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td className="px-4 py-3">{user.id.substring(0, 8)}...</td>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">
                                {user.role}{user.bothAdminAndHost ? ' (Both)' : ''}
                            </td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${user.status ? 'bg-green-500 text-green-100' : 'bg-red-500 text-red-100'
                                    }`}>
                                    {user.status ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                          
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(allUsers.totalElements / itemsPerPage)}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage}
                    containerClassName="flex justify-center items-center space-x-2"
                    pageClassName="px-3 py-1 rounded hover:bg-gray-700"
                    activeClassName="bg-blue-500 text-white"
                    previousClassName="px-3 py-1 rounded hover:bg-gray-700"
                    nextClassName="px-3 py-1 rounded hover:bg-gray-700"
                    disabledClassName="opacity-50 cursor-not-allowed"
                />
            </div>
        </>
    );
};