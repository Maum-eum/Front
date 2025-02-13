import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import { useNavigate } from "react-router-dom";

const SignupStep3 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 타이틀 */}
      <h1 className="text-title font-bold text-black mb-6">근무 조건 등록</h1>

      {/* 단계 표시 */}
      <Steps step={3} />
      
    {/* 안내 문구 */}
<div className="text-center mt-6">
  <p className="text-[18px] font-bold text-black">제공 가능한 서비스를</p>
  <p className="text-[18px] font-bold">
    <span className="text-[18px] text-red-500 text-inherit">모두 선택</span>해주세요
  </p>
</div>




      {/* 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap- mt-auto">
        <Btn text="이전" color="white" onClick={() => navigate("/signup/step2/optional")} />
        <Btn text="다음" color="green" onClick={() => navigate("/signup/step4")} />
      </div>
    </div>
  );
};

export default SignupStep3;
