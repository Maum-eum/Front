type AttributeCardProps = {
  content: string[];
};

const AttributeCard: React.FC<AttributeCardProps> = ({ content }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {content.map((text, index) => (
        <div
          key={index}
          className="text-content border bg-white rounded-lg px-2 py-1 transition cursor-pointer
              hover:bg-base-white"
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default AttributeCard;
