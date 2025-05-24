import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    return (
        <Link to={`/events/${event.id}`} key={event.id}>
            <div className="flex gap-6 rounded-lg overflow-hidden bg-gray-900 hover:scale-[1.01] transition-transform">
                <div className="w-1/3 min-w-[150px] h-56 rounded-lg overflow-hidden">
                    <img
                        alt={event.imageAlt}
                        src={event.imageSrc}
                        className="w-full h-full object-fit"
                    />
                </div>

                <div className="flex flex-col justify-center align-middle flex-1">
                    <h3 className="text-lg font-semibold text-white">{event.name}</h3>

                    <div className="flex flex-col mt-4 text-sm text-gray-400 gap-y-2">
                        <div className="flex items-center">
                            <CalendarDaysIcon className="w-4 h-4 mr-2" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            <span>{event.time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
