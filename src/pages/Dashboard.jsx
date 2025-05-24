import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import EventCard from "../components/cards/EventCard";

const allEvents = [
    {
        id: 1674,
        name: 'Timeless Classics',
        category: 'Musical',
        description: 'Sri Lankan Evergreens Concerts',
        href: '#',
        attendees: [{ id: 1, name: 'Chandimal Fernando' }],
        host: 'Kelum Srimal',
        imageSrc: '/events/timeless-classic.jpeg',
        imageAlt: 'Timeless Classics',
        date: '04-05-2025',
        time: '07.00 PM',
        venuse: 'Bishops College Auditorium',
        status: 'upcoming',
        tickets: [
            { id: 1, type: 'Gold', price: '2500 LKR', status: 'Sold Out' },
            { id: 2, type: 'Platinum', price: '5000 LKR', status: 'Available' },
        ]
    },
    {
        id: 3542,
        name: 'Boyce Avenue Live in Sri Lanka',
        category: 'Musical',
        description: 'Boyce Avenue live!',
        href: '#',
        attendees: [
            { id: 1, name: 'Boyce Avenue' },
        ],
        host: 'Clifford Richards',
        imageSrc: '/events/naadha-gama.png',
        imageAlt: 'Boyce Avenue Live in Sri Lanka',
        date: '2025-04-14',
        time: '07.00 PM',
        venuse: 'The Hilton Colombo',
        status: 'completed',
        tickets: [
            { id: 1, type: 'Gold', price: '2500 LKR', status: 'Sold Out' },
            { id: 2, type: 'Platinum', price: '5000 LKR', status: 'Sold Out' },
        ]
    },
];

const Dashboard = () => {
    const { user } = useSelector(state => state.user);
    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <div className="bg-gray-950">
                <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col">

                    <div>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-4">
                            <h1 className="text-xl font-bold text-white">Upcoming Events</h1>

                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8">
                            {allEvents.map((event) => (
                                <EventCard event={event} key={event.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Dashboard;