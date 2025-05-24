import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const EventsTableWithPagination = ({ searchTerm, onEditEvent, onPageChange,removeEvent }) => {
    const allEvents = useSelector(state => state.events.allEvents);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // New filters
    const [hostFilter, setHostFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        onPageChange(event.selected);
    };

    // Apply all filters
    const filteredEvents = allEvents?.content?.filter(event => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesHost = hostFilter
            ? event.hostName.toLowerCase().includes(hostFilter.toLowerCase())
            : true;

        const matchesLocation = locationFilter
            ? event.location.toLowerCase().includes(locationFilter.toLowerCase())
            : true;

        const matchesStartDate = startDateFilter
            ? new Date(event.startTime) >= new Date(startDateFilter)
            : true;

        return matchesSearch && matchesHost && matchesLocation && matchesStartDate;
    });

    return (
        <div className="-mx-4 mt-8 sm:-mx-0 overflow-x-auto">
           
            <div className="mb-4 flex flex-wrap gap-4 px-0">
                <input
                    type="text"
                    placeholder="Filter by host"
                    value={hostFilter}
                    onChange={(e) => setHostFilter(e.target.value)}
                    className="border border-gray-600 bg-transparent text-white px-3 py-1 rounded"
                />
                <input
                    type="text"
                    placeholder="Filter by location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="border border-gray-600 bg-transparent text-white px-3 py-1 rounded"
                />
                <input
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                    className="border border-gray-600 bg-transparent text-white px-3 py-1 rounded"
                />
            </div>

            {/* Table */}
            <table className="min-w-full divide-y divide-gray-600 bg-transparent text-gray-400 border-collapse rounded-lg">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Event Title</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Start Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">End Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Host</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold">Attendee Count</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold"><span className="sr-only">Action</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {filteredEvents.map(event => (
                        <tr key={event.id}>
                            <td className="px-4 py-3 text-white text-sm">{event.title}</td>
                            <td className="px-4 py-3 text-white text-sm">{event.description}</td>
                            <td className="px-4 py-3 text-white text-sm">{new Date(event.startTime).toLocaleString()}</td>
                            <td className="px-4 py-3 text-white text-sm">{new Date(event.endTime).toLocaleString()}</td>
                            <td className="px-4 py-3 text-white text-sm">{event.location}</td>
                            <td className="px-4 py-3 text-white text-sm">{event.hostName}</td>
                            <td className="px-4 py-3 text-white text-sm">{event.attendeeCount}</td>
                            <td className="px-4 py-3 text-sm space-x-2">
                                <button
                                    onClick={() => onEditEvent(event)}
                                    className="text-[#6ee7b7] hover:text-indigo-200 cursor-pointer px-1 py-1"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => removeEvent(event)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer px-1 py-1"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(allEvents.totalElements / itemsPerPage)}
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
        </div>
    );
};
