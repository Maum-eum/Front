import NextButton from "../../components/NextButton";
import StepIndicator from "../../components/StepIndicator";
import InputField from "../../components/InputField";

const SignupStep2Required = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 제목 */}
      <h1 className="text-title font-bold text-black mb-6">회원가입</h1>

      {/* 단계 표시 */}
      <StepIndicator currentStep={2} />

      {/* 필수 입력 사항 제목 */}
      <h2 className="text-item font-bold text-black my-4">필수 입력 사항</h2>

      {/* 입력 폼 */}
      <div className="w-full max-w-xs sm:max-w-sm">
        <InputField label="이름" type="text" placeholder="이름을 입력해주세요." />
        <InputField label="연락처" type="tel" placeholder="010-1234-5678" />
        <InputField label="주소" type="text" placeholder="거주 지역을 입력해주세요." />
        
        {/* 자격증 (드롭다운) */}
        <div className="mb-4">
          <label className="block text-item font-bold text-black mb-2">자격증</label>
          <select className="w-full p-3 border-2 border-point-green rounded-lg bg-white text-content focus:ring-2 focus:ring-green-400">
            <option>요양보호사 1급</option>
            <option>요양보호사 2급</option>
            <option>기타</option>
          </select>
        </div>

        {/* 차량 소유 여부 */}
        <div className="mb-4">
          <label className="block text-item font-bold text-black mb-2">차량 소유</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="car" className="mr-2" /> 소유
            </label>
            <label className="flex items-center">
              <input type="radio" name="car" className="mr-2" /> 미소유
            </label>
          </div>
        </div>

        {/* 치매 교육 이수 여부 */}
        <div className="mb-4">
          <label className="block text-item font-bold text-black mb-2">치매 교육 이수</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="dementia" className="mr-2" /> 이수
            </label>
            <label className="flex items-center">
              <input type="radio" name="dementia" className="mr-2" /> 미이수
            </label>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm flex justify-between mt-auto">
        <NextButton label="이전으로" onClick={() => alert("1단계로 이동!")} variant="secondary" />
        <NextButton label="다음" onClick={() => alert("3단계로 이동!")} />
      </div>
    </div>
  );
};

export default SignupStep2Required;
