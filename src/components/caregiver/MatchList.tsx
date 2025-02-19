import EmptyImg from "../../assets/image/empty.png";
import ScrollListBox from "../../components/commons/ScrollListBox";
import { MatchedStatus } from "../../types/caregiver/caregiverRequestType";
import MatchCard from "./MatchCard";

type MatchListProps = {
  matches: MatchedStatus[];
  onClick: (recruitConditionId: number, centerId: number, elderId: number) => void;
  onRefresh: () => void;
};

const MatchList: React.FC<MatchListProps> = ({ matches, onClick, onRefresh }) => {
  return (
    <div className="w-full flex flex-wrap">
      {/* 서비스 진행 중인 리스트 조회 */}
      {matches && matches.length > 0 ? (
        <>
          <label className="text-item font-bold mb-3">진행 중인 서비스가 있어요</label>
          <button onClick={onRefresh}>🔄️</button>
          <ScrollListBox>
            <div className="grid w-full gap-6 sm:grid-cols-2 mb-6">
              {matches.map((match) => (
                <MatchCard match={match} onClick={onClick} />
              ))}
            </div>
          </ScrollListBox>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-10">
          <label className="text-item font-bold mb-6">이런...</label>
          <button onClick={onRefresh}>🔄️</button>
          <img className="w-20 h-20 mb-2" src={EmptyImg} />
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span>진행 중인 서비스가 없네요.</span>
            <span>구직 상태로 변경하면 근무 요청을 받아볼 수 있어요!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchList;
