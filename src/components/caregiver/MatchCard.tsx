import { MatchedStatus } from "../../types/caregiver/caregiverRequestType";
import AttributeCard from "./AttributeCard";
import BasicBtn from "./BasicBtn";

type MatchCardProps = {
  match: MatchedStatus;
  onClick: (recruitConditionId: number, centerId: number, elderId: number) => void;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const meal_cnt = match.mealAssistance
    ? [
        match.selfFeeding,
        match.mealPreparation,
        match.cookingAssistance,
        match.enteralNutritionSupport,
      ].filter((value) => value === true).length
    : 0;
  const toilet_cnt = match.toiletAssistance
    ? [
        match.selfToileting,
        match.occasionalToiletingAssist,
        match.diaperCare,
        match.catheterOrStomaCare,
      ].filter((value) => value === true).length
    : 0;
  const move_cnt = match.moveAssistance
    ? [
        match.independentMobility,
        match.mobilityAssist,
        match.wheelchairAssist,
        match.immobile,
      ].filter((value) => value === true).length
    : 0;
  const daily_cnt = match.dailyLivingAssistance
    ? [
        match.cleaningLaundryAssist,
        match.bathingAssist,
        match.hospitalAccompaniment,
        match.exerciseSupport,
        match.emotionalSupport,
        match.cognitiveStimulation,
      ].filter((value) => value === true).length
    : 0;

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
        content={[
          `식사보조(${meal_cnt}/4)`,
          `배변보조(${toilet_cnt}/4)`,
          `이동보조(${move_cnt}/4)`,
          `일상보조(${daily_cnt}/6)`,
        ]}
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
