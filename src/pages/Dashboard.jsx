import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EventCard from "../components/cards/EventCard";
import ReactPaginate from "react-paginate";
import api from "../config/axiosConfig";
import { UPCOMMING_EVENTS } from "../config/urls";

const itemsPerPage = 6;

const Dashboard = () => {
    const { user } = useSelector(state => state.user);
    const [allEvents, setAllEvents] = useState({ content: [], totalElements: 0 });
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState({
        location: "",
        visibility: "",
        from: "",
        to: ""
    });
    const defaultFilters = {
    location: "",
    visibility: "",
    from: "",
    to: ""
};

    useEffect(() => {
        fetchEvents(currentPage, filters);
    }, [currentPage]);

    const clearFilters = () => {
        setFilters(defaultFilters);
        setCurrentPage(0);
        fetchEvents(0, defaultFilters);
    };

    const fetchEvents = async (page = 0, filters = {}) => {
        try {
            const params = new URLSearchParams({
                page,
                size: itemsPerPage,
                ...filters,
            });

            const res = await api.get(`${UPCOMMING_EVENTS}?${params.toString()}`);
            setAllEvents(res.data);
        } catch (err) {
            console.error("Error fetching events", err);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        setCurrentPage(0);
        fetchEvents(0, filters);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="bg-gray-950 min-h-screen">
            <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col">
                <div className="flex flex-col min-h-screen">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-4 mb-6">
                        <h1 className="text-xl font-bold text-white">Upcoming Events</h1>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="px-3 py-2 rounded text-white bg-gray-800"
                            value={filters.location}
                            onChange={handleFilterChange}
                        />
                        {/* <select
                            name="visibility"
                            className="px-3 py-2 rounded text-white"
                            value={filters.visibility}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="PUBLIC">Public</option>
                            <option value="PRIVATE">Private</option>
                        </select> */}
                        <input
                            type="date"
                            name="from"
                            className="px-3 py-2 rounded text-white bg-gray-800"
                            value={filters.from}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="date"
                            name="to"
                            className="px-3 py-2 rounded text-white bg-gray-800"
                            value={filters.to}
                            onChange={handleFilterChange}
                        />
                      
                           
                            <button
                                onClick={applyFilters}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>

                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                Clear Filters
                            </button>
                    
                    </div>

                    {/* Events List */}
                    <div className="flex-1 mt-3">
                        {allEvents.content.length > 0 ? (
                            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                                {allEvents.content.map((event) => (
                                    <EventCard event={event} key={event.id} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-white text-center">No events found for the selected filters.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-1 mb-8">
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
                            pageClassName="px-3 py-1 rounded hover:bg-gray-700 text-white"
                            activeClassName="bg-blue-500 text-white"
                            previousClassName="px-3 py-1 rounded hover:bg-gray-700 text-white"
                            nextClassName="px-3 py-1 rounded hover:bg-gray-700 text-white"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
