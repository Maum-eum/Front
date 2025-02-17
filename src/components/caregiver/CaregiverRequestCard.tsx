import { CaregiverRequestInfo } from "../../types/caregiver/caregiverRequestType";

type CaregiverRequestCardProps = {
  request: CaregiverRequestInfo;
  onClick: () => void;
};

const CaregiverRequestCard: React.FC<CaregiverRequestCardProps> = ({ request, onClick }) => {
  return (
    <div className="flex flex-col h-auto shadow bg-white rounded-lg p-5 mb-4" onClick={onClick}>
      <div className="flex flex-wrap mb-5">
        {/* 프로필 이미지 (임시 박스) */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 border bg-green rounded-lg flex items-center justify-center text-white">
          {request.img ? (
            <img
              src={request.img}
              alt={`${request.name}님`}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span>No Image</span>
          )}
        </div>
        <div className="flex flex-col justify-center ml-4">
          <span className="text-content font-bold">[{request.centerName}]센터</span>
          <span className="text-content font-bold">[{request.name}] 어르신</span>
        </div>
      </div>
      <div className="flex flex-wrap">
        {request.inmateTypes &&
          request.inmateTypes.map((type, index) => (
            <div
              key={index}
              className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2"
            >
              {type}
            </div>
          ))}
        <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
          장기요양등급 {request.rate.charAt(0)}급
        </div>
        <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
          {request.gender === 1 ? "남" : "여"}
        </div>
        <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
          {request.birth.slice(0, 4)}년생
        </div>
        <div className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2">
          {request.desiredHourlyWage}원
        </div>
      </div>
    </div>
  );
};

export default CaregiverRequestCard;
