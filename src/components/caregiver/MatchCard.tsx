import { MatchedStatus } from "../../types/caregiver/caregiverRequestType";
import AttributeCard from "./AttributeCard";
import BasicBtn from "./BasicBtn";

type MatchCardProps = {
  match: MatchedStatus;
  onClick: (recruitConditionId: number, centerId: number, elderId: number) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  return (
    <div className="flex flex-col h-auto shadow bg-white rounded-lg p-5 mb-4 transition cursor-pointer active:bg-point-pink">
      <div className="flex flex-col justify-start ml-4">
        <div className="flex">
          <span className="text-content font-bold">#{match.recruitConditionId} [</span>
          <span className="text-content font-bold text-red">{match.elderName}</span>
          <span className="text-content font-bold">] 어르신</span>
        </div>
      </div>
      <AttributeCard
        content={match.times.map(
          (time) => `${time.dayOfWeek}, ${time.startTime} - ${time.endTime}`
        )}
      />
      <BasicBtn
        label="상세 정보 보기"
        color="green"
        onClick={() => onClick(match.recruitConditionId, match.centerId, match.elderId)}
      />
    </div>
  );
};

export default MatchCard;
