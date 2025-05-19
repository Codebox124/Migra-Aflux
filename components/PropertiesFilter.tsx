import { useState } from "react";
type PropertyStatus = 'available' | 'under-inspection' | 'unavailable';
const PropertyFilters = ({
    onFilterChange
}: {
    onFilterChange: (filters: { status?: PropertyStatus, type?: string }) => void
}) => {
    const [status, setStatus] = useState<PropertyStatus | 'all'>('all');
    const [type, setType] = useState<string>('all');

    const handleStatusChange = (newStatus: PropertyStatus | 'all') => {
        setStatus(newStatus);
        onFilterChange({
            status: newStatus === 'all' ? undefined : newStatus,
            type: type === 'all' ? undefined : type
        });
    };

    const handleTypeChange = (newType: string) => {
        setType(newType);
        onFilterChange({
            status: status === 'all' ? undefined : status,
            type: newType === 'all' ? undefined : newType
        });
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Status</h4>
                <div className="flex flex-wrap gap-2">
                    {['all', 'available', 'under-inspection', 'unavailable'].map((statusOption) => (
                        <button
                            key={statusOption}
                            className={`px-3 py-1 text-sm rounded-full ${status === statusOption
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            onClick={() => handleStatusChange(statusOption as PropertyStatus | 'all')}
                        >
                            {statusOption === 'all' ? 'All' :
                                statusOption === 'available' ? 'Available' :
                                    statusOption === 'under-inspection' ? 'Under Inspection' : 'Unavailable'}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium mb-2">Property Type</h4>
                <div className="flex flex-wrap gap-2">
                    {['all', 'apartment', 'house', 'commercial'].map((typeOption) => (
                        <button
                            key={typeOption}
                            className={`px-3 py-1 text-sm rounded-full ${type === typeOption
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            onClick={() => handleTypeChange(typeOption)}
                        >
                            {typeOption === 'all' ? 'All' :
                                typeOption === 'apartment' ? 'Apartments' :
                                    typeOption === 'house' ? 'Houses' : 'Commercial'}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PropertyFilters