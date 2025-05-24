import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { VISIBILITY } from '../../auth/utils/visibility';

function EditEventModal({ isOpen, onClose, hosts, eventData, onSubmitUpdate }) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (eventData) {
            setValue('title', eventData.title);
            setValue('description', eventData.description);
            setValue('startTime', eventData.startTime?.slice(0, 16));
            setValue('endTime', eventData.endTime?.slice(0, 16));
            setValue('location', eventData.location);
            setValue('host', eventData.hostId);
            setValue('visibility', eventData.visibility);
        }
    }, [eventData, setValue]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = (data) => {
        const updatedEvent = {
            ...eventData,
            title: data.title,
            description: data.description,
            hostId: data.host,
            startTime: data.startTime,
            endTime: data.endTime,
            location: data.location,
            visibility: data.visibility,
        };
        onSubmitUpdate(updatedEvent);
        handleClose();
    };

    if (!isOpen || !eventData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur min-w-full">
            <div className="relative bg-[#222323] rounded-lg p-6 w-full max-w-2xl text-black shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-white hover:text-red-400 text-xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 text-white">Edit Event</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Event Name</label>
                            <input
                                type="text"
                                {...register('title', { required: 'Event name is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-gray-300"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Description</label>
                            <textarea
                                {...register('description', { required: 'Description is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-gray-300"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Start Time</label>
                            <input
                                type="datetime-local"
                                {...register('startTime', { required: 'Start Time is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-gray-300"
                            />
                            {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">End Time</label>
                            <input
                                type="datetime-local"
                                {...register('endTime', { required: 'End Time is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-gray-300"
                            />
                            {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Location</label>
                            <input
                                type="text"
                                {...register('location', { required: 'Location is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-gray-300"
                            />
                            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Event Host</label>
                            <select
                                {...register('host', { required: 'Host is required' })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-gray-300"
                            >
                                <option value="">Select A Host</option>
                                {hosts && hosts.map(h => (
                                    <option key={h.id} value={h.id}>{h.name}</option>
                                ))}
                            </select>
                            {errors.host && <p className="text-red-500 text-xs mt-1">{errors.host.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Visibility</label>
                            <div className="flex gap-4">
                                <label className="text-sm text-gray-300">
                                    <input
                                        type="radio"
                                        value={VISIBILITY.PUBLIC}
                                        {...register('visibility', { required: 'Visibility is required' })}
                                        className="mr-2"
                                    />
                                    Public
                                </label>
                                <label className="text-sm text-gray-300">
                                    <input
                                        type="radio"
                                        value={VISIBILITY.PRIVATE}
                                        {...register('visibility', { required: 'Visibility is required' })}
                                        className="mr-2"
                                    />
                                    Private
                                </label>
                            </div>
                            {errors.visibility && <p className="text-red-500 text-xs mt-1">{errors.visibility.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#3f5373]"
                        >
                            Update Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEventModal;
