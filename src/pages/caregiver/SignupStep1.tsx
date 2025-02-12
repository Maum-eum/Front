import NextButton from "../../components/NextButton";
import StepIndicator from "../../components/StepIndicator";
import { useNavigate } from "react-router-dom";  

const SignupStep1 = () => {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 제목 */}
      <h1 className="text-title sm:text-3xl font-bold text-black mb-6">회원가입</h1> {/* 모바일에서는 기본 크기, 큰 화면에서는 3xl */}

      {/* 단계 표시 */}
      <StepIndicator currentStep={1} />

      {/* 프로필 이미지 (임시 박스) */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-200 rounded-lg mb-6"></div>

      {/* 입력 폼 */}
      <div className="w-full max-w-xs sm:max-w-sm">
        <label className="block text-item sm:text-2xl font-bold text-black mb-2">아이디</label> {/* 반응형 적용 */}
        <input
          type="text"
          className="w-full p-3 border-2 border-point-green rounded-lg bg-white text-content sm:text-lg focus:ring-2 focus:ring-green-400"
          placeholder="아이디를 입력해주세요."
        />

        <label className="block text-item sm:text-2xl font-bold text-black mt-4 mb-2">비밀번호</label> {/* 반응형 적용 */}
        <input
          type="password"
          className="w-full p-3 border-2 border-point-green rounded-lg bg-white text-content sm:text-lg focus:ring-2 focus:ring-green-400"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>

      {/* 다음 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm mt-auto">
      <NextButton label="다음" onClick={() => navigate("/signup/step2/required")} /> {/* ✅ 경로 확인 */}
      </div>
    </div>
  );
};

export default SignupStep1;
