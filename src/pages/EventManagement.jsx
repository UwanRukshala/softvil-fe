import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddEventModal from "../components/eventManager/AddEventModal";
import EditEventModal from "../components/eventManager/EditEventModal";
import { toast } from 'react-hot-toast';
import { fetchAllEvents } from "../reducers/event/eventsSlice";
import { WithAdminComp } from "../auth/hocs/WithAdminComp";
import { DELETE_EVENT, GET_USER_BY_ROLE, UPDATE_EVENT } from "../config/urls";
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
    const itemsPerPage = 10;

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

    useEffect(() => {
        fetchHosts();
    }, []);

    useEffect(() => {
        dispatch(fetchAllEvents({ page: currentPage, size: itemsPerPage, visibility: VISIBILITY.ALL }));
    }, [currentPage]);

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 py-6 rounded-lg bg-[#363939] mx-6 my-6">
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

                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-4 w-full sm:w-96 px-3 py-2 border border-gray-400 rounded-md text-white"
                />

                <EventsTableWithPagination
                    searchTerm={searchTerm}
                    onEditEvent={handleEditEvent}
                    onPageChange={handlePageChange}
                    removeEvent={removeEvent}
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
