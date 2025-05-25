
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import api from '../../config/axiosConfig';
import { ADD_EVENT } from '../../config/urls';
import { VISIBILITY } from '../../auth/utils/visibility';
import { addEvent } from '../../reducers/event/eventsSlice';

function AddEventModal({ isOpen, onClose, hosts }) {
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    if (!isOpen) return null;

    const handleClose = () => {
        reset();
        onClose();
    };


    const onSubmit = async (data) => {
        try {
            const newEvent = {
                title: data.title,
                description: data.description,
                hostId: data.host,
                startTime: data.startTime,
                endTime: data.endTime,
                location: data.location,
                visibility: data.visibility,
            };

            const response = await api.post(ADD_EVENT, newEvent);
            if (response.status == 201) {
                dispatch(addEvent(response.data));
            }
            handleClose();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };





    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur  min-w-full">
            <div className="relative bg-gray-900 rounded-lg p-6 w-full max-w-2xl text-black shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-white hover:text-red-400 text-xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-white">Add New Event</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Event Name</label>
                            <input
                                type="text"
                                id="name"
                                {...register('title', { required: 'Event name is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-500 placeholder:text-gray-500"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">Start Time</label>
                            <input
                                type="datetime-local"
                                id="startTime"
                                {...register('startTime', { required: 'Start Time is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-500 placeholder:text-gray-500"
                            />
                            {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-gray-300">End Time</label>
                            <input
                                type="datetime-local"
                                id="endTime"
                                {...register('endTime', { required: 'End Time is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
                            <input
                                type="text"
                                id="location"
                                {...register('location', { required: 'Location is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"
                            />
                            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                        </div>


                        <div>
                            <label htmlFor="host" className="block text-sm font-medium text-gray-300">Event Host</label>
                            <select
                                id="host"
                                {...register('host', { required: 'Event Host is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] text-gray-300"

                            >
                                <option value={-1}>Select A Host</option>
                                {hosts && hosts.map((h) => (
                                    <option value={h.id}>{h.name}</option>
                                ))}

                            </select>
                            {errors.host && <p className="text-red-500 text-xs mt-1">{errors.host.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Visibility</label>
                            <div className="flex items-center gap-4">
                                <label className="text-sm text-gray-300 flex items-center">
                                    <input
                                        type="radio"
                                        value={VISIBILITY.PUBLIC}
                                        {...register('visibility', { required: 'Visibility is required' })}
                                        className="mr-2"
                                        defaultChecked
                                    />
                                    Public
                                </label>
                                <label className="text-sm text-gray-300 flex items-center">
                                    <input
                                        type="radio"
                                        value={VISIBILITY.PRIVATE}
                                        {...register('visibility', { required: 'Visibility is required' })}
                                        className="mr-2"
                                    />
                                    Private
                                </label>
                            </div>
                            {errors.visibility && (
                                <p className="text-red-500 text-xs mt-1">{errors.visibility.message}</p>
                            )}
                        </div>

                    </div>


                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3f5373]"
                        >
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEventModal;
