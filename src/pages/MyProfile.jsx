import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import api from '../config/axiosConfig';
import EventCard from '../components/cards/EventCard';
import { GET_ATTENDANCE_OF_MY_EVENTS, GET_MY_HOSTING_EVENTS, GET_PROFILE_DETAILS } from '../config/urls';
import MyEventCard from '../components/cards/MyEventCard';
import { WithAdminComp } from '../auth/hocs/WithAdminComp';
import { WithAdminAndHostComp } from '../auth/hocs/WithAdminAndHostComp';

const MyProfile = () => {
    const { user } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(null);

    // Hosted Events
    const [hostedEvents, setHostedEvents] = useState([]);
    const [hostedTotalElements, setHostedTotalElements] = useState(0);
    const [hostedPage, setHostedPage] = useState(0);

    // Attending Events
    const [attendingEvents, setAttendingEvents] = useState([]);
    const [attendingTotalElements, setAttendingTotalElements] = useState(0);
    const [attendingPage, setAttendingPage] = useState(0);

    const itemsPerPage = 4;

    useEffect(() => {
        if (!user) return;
        fetchProfile();
    }, [user]);

    useEffect(() => {
        if (user) fetchHostedEvents();
    }, [user, hostedPage]);

    useEffect(() => {
        if (user) fetchAttendingEvents();
    }, [user, attendingPage]);

    const fetchProfile = async () => {
        const res = await api.get(GET_PROFILE_DETAILS);
        setProfile(res.data);
    };

    const fetchHostedEvents = async () => {
        const res = await api.get(`${GET_MY_HOSTING_EVENTS}?page=${hostedPage}&size=${itemsPerPage}`);
        setHostedEvents(res.data.content);
        setHostedTotalElements(res.data.totalElements);
    };

    const fetchAttendingEvents = async () => {
        const res = await api.get(`${GET_ATTENDANCE_OF_MY_EVENTS}?page=${attendingPage}&size=${itemsPerPage}`);
        setAttendingEvents(res.data.content);
        setAttendingTotalElements(res.data.totalElements);
    };

    const handleHostedPageClick = (event) => setHostedPage(event.selected);
    const handleAttendingPageClick = (event) => setAttendingPage(event.selected);

    if (!user) return <Navigate to="/login" />;

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            {profile && (
                <div className="mb-10 p-7 flex flex-col gap-y-3 bg-gray-800 rounded-lg shadow">
                    <p><strong>Name:</strong> {profile?.name}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Joined:</strong> {new Date(profile?.createdAt).toLocaleDateString()}</p>
                </div>
            )}

            {/* Hosted Events Section */}
            <WithAdminAndHostComp>
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4">Hosted / To Host Events</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {hostedEvents.length > 0 ? (
                            hostedEvents.map((event) => <EventCard key={event.eventId} event={event} />)
                        ) : (
                            <p>No hosted events found.</p>
                        )}
                    </div>

                    {hostedTotalElements > itemsPerPage && (
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handleHostedPageClick}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(hostedTotalElements / itemsPerPage)}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            forcePage={hostedPage}
                            containerClassName="flex justify-center items-center space-x-2 mt-4"
                            pageClassName="px-3 py-1 rounded hover:bg-gray-700"
                            activeClassName="bg-blue-500 text-white"
                            previousClassName="px-3 py-1 rounded hover:bg-gray-700"
                            nextClassName="px-3 py-1 rounded hover:bg-gray-700"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />
                    )}
                </div>
            </WithAdminAndHostComp>

            {/* Attending Events Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Attending Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {attendingEvents.length > 0 ? (
                        attendingEvents.map((event) => <MyEventCard key={event.id} event={event} />)
                    ) : (
                        <p>You haven't RSVP'd to any events.</p>
                    )}
                </div>

                {attendingTotalElements > itemsPerPage && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handleAttendingPageClick}
                        pageRangeDisplayed={5}
                        pageCount={Math.ceil(attendingTotalElements / itemsPerPage)}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        forcePage={attendingPage}
                        containerClassName="flex justify-center items-center space-x-2 mt-4"
                        pageClassName="px-3 py-1 rounded hover:bg-gray-700"
                        activeClassName="bg-blue-500 text-white"
                        previousClassName="px-3 py-1 rounded hover:bg-gray-700"
                        nextClassName="px-3 py-1 rounded hover:bg-gray-700"
                        disabledClassName="opacity-50 cursor-not-allowed"
                    />
                )}
            </div>
        </div>
    );
};

export default MyProfile;
