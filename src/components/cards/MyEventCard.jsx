import { CalendarDaysIcon, LocateIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyEventCard({ event }) {
    return (
        <Link to={`/events/${event.eventId}`} key={event.eventId}>
            <div className="flex p-9 rounded-lg overflow-hidden bg-gray-900 hover:scale-[1.01] transition-transform w-fit">


                <div className="flex flex-col justify-center align-middle flex-1">
                    <span className="text-lg font-semibold text-white">{event.eventTitle}</span>
                    
                    <div className="flex flex-col mt-4 text-sm text-gray-400 gap-y-2">

                        <div className="flex items-center gap-x-2">
                            <span className="flex items-center">
                                <CalendarDaysIcon className="w-4 h-4 mr-2" /> Start Time :
                            </span>
                            <span>{event.eventTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-x-2">
                            <span className="flex items-center">
                                <UserIcon className="w-4 h-4 mr-2" /> Status :
                            </span>
                            <span>{event.status}</span>
                        </div>
                       
                    </div>
                </div>
            </div>
        </Link>
    );
}
