import ServiceButton from "./ServiceButton";

type CategorySectionProps = {
  title: string;
  services: string[];
  selectedServices: { [key: string]: boolean };
  setSelectedServices: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
};

const CategorySection: React.FC<CategorySectionProps> = ({ title, services, selectedServices, setSelectedServices }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm mt-6">
      {/* 카테고리 제목 */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-item font-bold text-black">{title}</h3>
      </div>

      {/* 서비스 버튼 리스트 */}
      <div className="space-y-2">
        {services.map((service) => (
          <ServiceButton
            key={service}
            service={service}
            isSelected={!!selectedServices[service]}
            onSelect={() =>
              setSelectedServices((prev) => ({ ...prev, [service]: !prev[service] }))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
