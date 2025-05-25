import { ArrowLeft, CalendarDays, Clock3, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EVENT_DETAIL, GET_ATTENDANCE_OF_THE_EVENT, PUT_ATTENDANCE_OF_THE_EVENT } from "../config/urls";
import api from "../config/axiosConfig";
import { ATTENDANCE } from "../auth/utils/attendance";


export default function EventDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [attendance, setAttendance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!eventId) return;

        api.get(`${EVENT_DETAIL}/${eventId}`)
            .then(response => setEvent(response.data))
            .catch(error => console.error('Error fetching event:', error));

        // Fetch attendance status
        api.get(`${GET_ATTENDANCE_OF_THE_EVENT}/${eventId}`)
            .then(res => setAttendance(res.data.status))
            .catch(() => setAttendance(null));
    }, [eventId]);

    const handleAttendance = (status) => {
        api.post(`${PUT_ATTENDANCE_OF_THE_EVENT}/${eventId}`, { status })
            .then(() => setAttendance(status))
            .catch(err => console.error('Failed to update attendance:', err));
    };

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
                    <h1 className="text-3xl font-bold mb-3 text-amber-400">{event?.title}</h1>
                    <h1 className="text-xs font-bold mb-3">{event?.eventId}</h1>

                    <div className="text-sm text-gray-300 mb-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-cyan-400" />
                            <span>{event?.startTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock3 size={16} className="text-cyan-400" />
                            <span>{event?.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-cyan-400" />
                            <span>{event?.location}</span>
                        </div>
                    </div>

                    <div className="text-sm text-gray-400 mb-4 space-y-1">
                        <p>
                            <strong>Host:</strong> {event?.hostName}
                        </p>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed mb-6">{event?.description}</p>

                    {/* Attendance Buttons */}
                    <div className="flex flex-col gap-4">

                        <hr style={{color:'#5d5d5d'}}/>
                        <div>
                            <span className="text-lg text-yellow-600">
                                Are You Going To Participate ?
                            </span>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            {Object.values(ATTENDANCE).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleAttendance(status)}
                                    className={`px-4 py-2 rounded text-sm font-medium border transition duration-200 ${attendance === status
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}

                        </div>

                    </div>
                </div>

                <div className="flex-1">
                    <div className="h-full md:h-auto overflow-hidden rounded-lg">
                        {/* optional image or media */}
                    </div>
                </div>
            </div>
        </div>
    );
}
