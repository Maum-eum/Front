type ServiceButtonProps = {
    service: string;
    isSelected: boolean;
    onSelect: () => void;
  };
  
  const ServiceButton: React.FC<ServiceButtonProps> = ({ service, isSelected, onSelect }) => {
    return (
      <button
        onClick={onSelect}
        className={`w-full p-3 rounded-lg text-black font-bold transition-all duration-200 ${
          isSelected ? "bg-red-200" : "bg-white border border-gray-300"
        }`}
      >
        {service}
      </button>
    );
  };
  
  export default ServiceButton;
  