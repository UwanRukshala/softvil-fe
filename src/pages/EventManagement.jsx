import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddEventModal from "../components/eventManager/AddEventModal";
import EditEventModal from "../components/eventManager/EditEventModal";
import { toast } from 'react-hot-toast';
import { fetchAllEvents, setAllEvents } from "../reducers/event/eventsSlice";
import { WithAdminComp } from "../auth/hocs/WithAdminComp";
import { DELETE_EVENT, GET_ALL_EVENTS_BY_FILTER, GET_USER_BY_ROLE, UPDATE_EVENT } from "../config/urls";
import { ROLES } from "../auth/utils/roles";
import api from "../config/axiosConfig";
import { EventsTableWithPagination } from "../components/eventManager/EventsTableWithPagination";
import { VISIBILITY } from "../auth/utils/visibility";

export default function EventManagement() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [hosts, setHosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
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
    const removeEvent = async (event) => {
        const confirmed = window.confirm(`Are you sure you want to delete the event "${event.title}"?`);
        if (!confirmed) return;

        try {
            await api.delete(`${DELETE_EVENT}/${event.id}`);
            toast.success('Event deleted successfully');

            // Refresh list (if you're using pagination, include currentPage, itemsPerPage)
            dispatch(fetchAllEvents({ page: currentPage, size: itemsPerPage, visibility: VISIBILITY.ALL }));
        } catch (error) {
            console.error("Failed to delete event:", error);
            toast.error('Failed to delete event');
        }
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        setShowEditModal(true);
    };

    const fetchHosts = () => {
        api.get(`${GET_USER_BY_ROLE}/${ROLES.HOST}`)
            .then((res) => {
                setHosts(res.data.content);
            })
            .catch((e) => {
                console.error('Error fetching hosts:', e);
            });
    };

    const handleEventUpdate = async (updatedEvent) => {
        try {
            await api.put(`${UPDATE_EVENT}/${updatedEvent.id}`, updatedEvent);
            toast.success('Event updated successfully');
            dispatch(fetchAllEvents({ page: currentPage, size: itemsPerPage, visibility: VISIBILITY.ALL }));
        } catch (error) {
            console.error("Failed to update event:", error);
            toast.error('Failed to update event');
        }
    };
    const fetchEvents = async (page = 0, filters = {}) => {
        try {
            const params = new URLSearchParams({
                page,
                size: itemsPerPage,
                ...filters,
            });

            const res = await api.get(`${GET_ALL_EVENTS_BY_FILTER}?${params.toString()}`);
            dispatch(
                setAllEvents(res.data)
            )
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

    const clearFilters = () => {
        setFilters(defaultFilters);
        setCurrentPage(0);
        fetchEvents(0, defaultFilters);
    };

    useEffect(() => {
        fetchHosts();
    }, []);

    useEffect(() => {
        dispatch(fetchAllEvents({ page: currentPage, size: itemsPerPage, visibility: VISIBILITY.ALL }));
    }, [currentPage]);

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 py-6 rounded-lg bg-gray-900 mx-6 my-6">
                <div className="flex justify-between items-center sm:flex sm:items-center sm:justify-start">
                    <div className="sm:flex-auto">
                        <h2 className="text-xl font-bold text-white">Manage Events</h2>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <WithAdminComp>
                            <button
                                onClick={() => setShowModal(true)}
                                type="button"
                                className="block cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-semibold shadow-sm bg-[#3b82f6] text-white hover:opacity-90 hover:bg-[#3f5373]"
                            >
                                Add Event
                            </button>
                        </WithAdminComp>
                    </div>
                </div>

             

                <div className="my-5 bg-gray-700 p-3 rounded-xl">
                    <p className="text-base font-bold pb-3">Advanced Filter</p>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="px-3 py-2 rounded text-white bg-gray-800"
                            value={filters.location}
                            onChange={handleFilterChange}
                        />
                        <select
                            name="visibility"
                            className="px-3 py-2 rounded text-white  bg-gray-800"
                            value={filters.visibility}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="PUBLIC">Public</option>
                            <option value="PRIVATE">Private</option>
                        </select>
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


                </div>

                <EventsTableWithPagination
                    searchTerm={searchTerm}
                    onEditEvent={handleEditEvent}
                    onPageChange={handlePageChange}
                    removeEvent={removeEvent}
                    itemsPerPage={itemsPerPage}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            <AddEventModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                hosts={hosts}
            />

            <EditEventModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                eventData={selectedEvent}
                hosts={hosts}
                onSubmitUpdate={handleEventUpdate}

            />
        </>
    );
}
