import EmptyImg from "../../assets/image/empty.png";
import CaregiverRequestCard from "../../components/caregiver/RequestCard";
import ScrollListBox from "../../components/commons/ScrollListBox";
import { WorkRequest } from "../../types/caregiver/caregiverRequestType";

type RequestListProps = {
  requests: WorkRequest[];
  attuneRequests: WorkRequest[];
  onClickRequest: (recruitConditionId: number) => void;
  onClickAttuneRequest: (recruitConditionId: number) => void;
  onRefresh: () => void;
};

const RequestList: React.FC<RequestListProps> = ({
  requests,
  attuneRequests,
  onClickRequest,
  onClickAttuneRequest,
  onRefresh,
}) => {
  return (
    <>
      {/* 근무 요청 알림 */}
      {requests && requests.length > 0 && (
        <>
          <label className="text-item font-bold mb-10">근무 요청이 있어요</label>
          <button onClick={onRefresh}>🔄️</button>
          <ScrollListBox>
            <div className="grid w-full gap-6 sm:grid-cols-2 mb-6">
              {requests.map((request) => (
                <CaregiverRequestCard request={request} onClick={onClickRequest} />
              ))}
            </div>
          </ScrollListBox>
        </>
      )}
      {/* 조율 중인 요청 */}
      {attuneRequests && attuneRequests.length > 0 && (
        <>
          <label className="text-item font-bold mb-3">조율 중인 요청이에요</label>
          <button onClick={onRefresh}>🔄️</button>
          <ScrollListBox>
            <div className="grid w-full gap-6 sm:grid-cols-2 mb-6">
              {attuneRequests.map((attuneRequest) => (
                <CaregiverRequestCard request={attuneRequest} onClick={onClickAttuneRequest} />
              ))}
            </div>
          </ScrollListBox>
        </>
      )}
      {/* 아무 요청도 없을 경우 */}
      {!(requests && requests.length > 0) && !(attuneRequests && attuneRequests.length > 0) && (
        <div className="w-full h-full flex flex-col items-center justify-center p-10">
          <label className="text-item font-bold mb-6">이런...</label>
          <button onClick={onRefresh}>🔄️</button>
          <img className="w-20 h-20 mb-2" src={EmptyImg} />
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span>도착한 요청이 없네요.</span>
            <span>근무 조건으로 요청 확률을 올려 볼까요?</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestList;
