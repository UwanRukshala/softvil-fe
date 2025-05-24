import axios from "axios";
import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!eventId) return;

        axios.get(`/api/events/${eventId}`)
            .then(response => {
                setEvent(response.data)
            })
            .catch(error => console.error('Error fetching event:', error));
    }, [eventId]);


    return (
        <div className="min-h-screen w-full bg-transparent text-gray-100 p-4 sm:p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back</span>
            </button>


            <div className="flex flex-col-reverse md:flex-row gap-6 bg-transparent">
                <div className="flex flex-1 flex-col py-0 lg:py-10">
                    <h1 className="text-2xl font-bold mb-3">{event?.name}</h1>

                    <div className="text-sm text-gray-300 mb-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-cyan-400" />
                            <span>{event?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock3 size={16} className="text-cyan-400" />
                            <span>{event?.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-cyan-400" />
                            <span>{event?.venuse}</span>
                        </div>
                        <div>
                            <strong className="text-gray-400">Status:</strong>{' '}
                            <span
                                className={`inline-block px-2 py-1 rounded-2xl text-xs font-semibold ${event?.status === 'completed'
                                    ? 'bg-green-800 text-green-200'
                                    : 'bg-yellow-700 text-yellow-100'
                                    }`}
                            >
                                {event?.status}
                            </span>
                        </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-4 space-y-1">
                        <p>
                            <strong>Host:</strong> {event?.host}
                        </p>
                        <p>
                            <strong>Performer:</strong>{' '}
                            {event?.attendees.map((a) => a.name).join(', ')}
                        </p>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed">{event?.description}</p>
                    {event?.tickets?.length > 0 ? (
                        // <TicketAccordion tickets={event.tickets} />
                        <></>
                    ) : (
                        <p className="text-gray-400 text-sm italic">No ticket information available.</p>
                    )}
                </div>

                <div className="flex-1">
                    <div className="h-full md:h-auto overflow-hidden rounded-lg">
                        <img
                            src={event?.imageSrc}
                            alt={event?.imageAlt}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
