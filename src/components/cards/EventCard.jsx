import { CalendarDaysIcon, LocateIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    return (
        <Link to={`/events/${event.id}`} key={event.id}>
            <div className="flex p-9 rounded-lg overflow-hidden bg-gray-900 hover:scale-[1.01] transition-transform h-full ">


                <div className="flex flex-col align-middle flex-1 ">
                    <span className="text-lg font-semibold text-white">{event.title}</span>
                    <span className="text-sm font-semibold text-gray-400 mt-2 line-clamp-3 ">{event.description}</span>


                    <div className="flex flex-col mt-4 text-sm text-gray-400 gap-y-2">


                        <div className="flex items-center gap-x-2">
                            <span className="flex items-center">
                                <LocateIcon className="w-4 h-4 mr-2" /> Location :
                            </span>
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span className="flex items-center">
                                <CalendarDaysIcon className="w-4 h-4 mr-2" /> Start Time :
                            </span>
                            <span>{event.startTime}</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span className="flex items-center">
                                <CalendarDaysIcon className="w-4 h-4 mr-2" /> End Time :
                            </span>
                            <span>{event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <span className="flex items-center">
                                <UserIcon className="w-4 h-4 mr-2" /> Host By :
                            </span>
                            <span>{event.hostName}</span>
                        </div>
                       
                    </div>
                </div>
            </div>
        </Link>
    );
}
