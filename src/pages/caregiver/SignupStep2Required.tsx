import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import { useNavigate } from "react-router-dom";

const SignupStep2Required = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 제목 */}
      <h1 className="text-title font-bold text-black mb-6">회원가입</h1>

      {/* 단계 표시 */}
      <Steps step={2} />

      {/* 필수 입력 사항 제목 */}
      <h2 className="text-item font-bold text-black my-4">필수 입력 사항</h2>

      {/* 입력 폼 */}
      <div className="w-full max-w-xs sm:max-w-sm space-y-4">
        
        {/* 이름 */}
        <div className="flex items-center justify-between flex-nowrap">
          <label className="text-item font-bold text-black w-1/3 flex-shrink-0">이름</label>
          <div className="w-full">
            <Input type="text" placeholder="이름을 입력해주세요." className="w-full h-12 p-3 border-2  rounded-lg bg-white" />
          </div>
        </div>

        {/* 연락처 */}
        <div className="flex items-center justify-between flex-nowrap">
          <label className="text-item font-bold text-black w-1/3 flex-shrink-0">연락처</label>
          <div className="w-full">
            <Input type="tel" placeholder="010-1234-5678" className="w-full h-12 p-3 border-2  rounded-lg bg-white" />
          </div>
        </div>

        {/* 주소 */}
        <div className="flex items-center justify-between flex-nowrap">
          <label className="text-item font-bold text-black w-1/3 flex-shrink-0">주소</label>
          <div className="w-full">
            <Input type="text" placeholder="주소수정해야됨" className="w-full h-12 p-3 border-2 rounded-lg bg-white" />
          </div>
        </div>

        {/* 자격증 (드롭다운) */}
        <div className="flex items-center justify-between flex-nowrap">
          <label className="text-item font-bold text-black w-1/3 flex-shrink-0">자격증</label>
          <div className="w-full">
            <select className="w-full h-12 p-3 border-2 rounded-lg bg-white">
              <option>간호조무사</option>
              <option>사회복지사 1급</option>
              <option>사회복지사 2급</option>
              <option>요양보호사 1급</option>
            </select>
          </div>
        </div>

        {/* 토글 */}
        <div>
          <label className="block text-item font-bold text-black mb-2">차량 소유</label>
          <div className="flex gap-4">
            <label className="flex items-center text-item">
              <input type="radio" name="car" className="mr-2" /> 소유
            </label>
            <label className="flex items-center text-item">
              <input type="radio" name="car" className="mr-2" /> 미소유
            </label>
          </div>
        </div>


        <div>
          <label className="block text-item font-bold text-black mb-2">치매 교육 이수</label>
          <div className="flex gap-4">
            <label className="flex items-center text-item">
              <input type="radio" name="dementia" className="mr-2" /> 이수
            </label>
            <label className="flex items-center text-item">
              <input type="radio" name="dementia" className="mr-2" /> 미이수
            </label>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
        <Btn text="이전으로" color="white" onClick={() => navigate("/signup/step1")} />
        <Btn text="다음" color="green" onClick={() => navigate("/signup/step2/optional")} />

      </div>
    </div>
  );
};

export default SignupStep2Required;
