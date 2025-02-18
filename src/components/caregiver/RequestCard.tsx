import { WorkRequest } from "../../types/caregiver/caregiverRequestType";

type CaregiverRequestCardProps = {
  request: WorkRequest;
  onClick: () => void;
};

const CaregiverRequestCard: React.FC<CaregiverRequestCardProps> = ({ request, onClick }) => {
  return (
    <div
      className="flex flex-col h-auto shadow bg-white rounded-lg p-5 mb-4 transition cursor-pointer active:bg-point-pink"
      onClick={onClick}
    >
      <div className="flex flex-wrap mb-5">
        {request.imgUrl ? (
          <img
            src={request.imgUrl}
            className="w-24 h-24 sm:w-28 sm:h-28 border rounded-lg object-cover"
          />
        ) : (
          <div className="w-24 h-24 sm:w-28 sm:h-28 border rounded-lg bg-empty-green"></div>
        )}

        <div className="flex flex-col justify-start ml-4">
          <div className="flex">
            <span className="text-content font-bold">#{request.recruitConditionId}번 [</span>
            <span className="text-content font-bold text-red">{request.centerName}</span>
            <span className="text-content font-bold">] 센터</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {/* 공통 className 적용 부분 */}
        {[
          `${request.desiredHourlyWage}원`,
          `${request.age}세`,
          `${request.sexual}`,
          `${request.rate}급`,
          // ...request.careTypes,
        ].map((text, index) => (
          <div
            key={index}
            className="text-content border bg-white rounded-lg px-2 py-1 mr-2 mb-2 transition cursor-pointer 
              hover:bg-base-white"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaregiverRequestCard;
