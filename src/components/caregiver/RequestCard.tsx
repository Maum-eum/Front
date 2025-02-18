import { WorkRequest } from "../../types/caregiver/caregiverRequestType";
import AttributeCard from "./AttributeCard";

type CaregiverRequestCardProps = {
  request: WorkRequest;
  onClick: (recruitConditionId: number) => void;
};

const CaregiverRequestCard: React.FC<CaregiverRequestCardProps> = ({ request, onClick }) => {
  return (
    <div
      className="flex flex-col h-auto shadow bg-white rounded-lg p-5 mb-4 transition cursor-pointer active:bg-point-pink"
      onClick={() => onClick(request.recruitConditionId)}
    >
      <div className="flex flex-wrap mb-5">
        {request.imgUrl ? (
          <img
            src={request.imgUrl}
            className="w-24 h-24 sm:w-28 sm:h-28 border rounded-lg object-cover mb-3"
          />
        ) : (
          <div className="w-24 h-24 sm:w-28 sm:h-28 border rounded-lg bg-empty-green mb-3"></div>
        )}

        <div className="flex flex-col justify-start ml-4">
          <div className="flex">
            <span className="text-content font-bold">#{request.recruitConditionId} [</span>
            <span className="text-content font-bold text-red">{request.centerName}</span>
            <span className="text-content font-bold">] 센터</span>
          </div>
        </div>
      </div>
      <AttributeCard
        content={[
          `${request.desiredHourlyWage}원`,
          `${request.age}세`,
          `${request.sexual}`,
          `${request.rate}급`,
          ...request.careTypes,
        ]}
      />
    </div>
  );
};

export default CaregiverRequestCard;
