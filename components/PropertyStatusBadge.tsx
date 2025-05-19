import { Property } from "@/utils/types/properties";

type PropertyStatus = Property['status'];

interface PropertyStatusBadgeProps {
  status: PropertyStatus;
}
export default function PropertyStatusBadge({ status }: PropertyStatusBadgeProps) {
  const statusConfig: Record<PropertyStatus, {
    text: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  }> = {
    available: {
      text: 'Available',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
    },
    'under-inspection': {
      text: 'Under Inspection',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
    },
    unavailable: {
      text: 'Unavailable',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
    },
    reserved: {
      text: 'Reserved',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
    },
    rented: {
      text: 'Rented',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-200',
    },
  };


  const config = statusConfig[status] || statusConfig.unavailable;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      {config.text}
    </span>
  );
}