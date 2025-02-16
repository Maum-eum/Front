import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import CareerModal from "../../components/caregiver/CareerModal";
import Input from "../../components/commons/Input";
import CertificationModal from "../../components/caregiver/CertificationModal"; //  자격증 모달 추가

const SignupStep1 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); //  현재 단계
  const [subStep, setSubStep] = useState(1); //  step 2 내부의 하위 단계
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introduction, setIntroduction] = useState(""); //  한줄소개 상태
  const [isCertModalOpen, setIsCertModalOpen] = useState(false); //  자격증 모달 상태
  const [certification, setCertification] = useState<{ name: string; level: string }>({
    name: "",
    level: "",
  });

  //경력
  const [experiences, setExperiences] = useState<{ place: string; period: string; details: string }[]>([]);

  //  모달에서 경력 추가 함수
  const handleAddExperience = (newExperience: { place: string; period: string; details: string }) => {
    setExperiences([...experiences, newExperience]); // 입력된 경력 추가
    setIsModalOpen(false);
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (step === 2 && subStep === 1) {
      setSubStep(2); //  step 2 내에서 선택 입력 사항으로 변경
    } else if (step === 2 && subStep === 2) {
      navigate("/signup/step3"); //  선택 입력 사항에서 다음 버튼을 누르면 SignupStep3 페이지로 이동
    } else if (step < 2) {
      setStep(step + 1);
      setSubStep(1); //  새 단계로 갈 때 subStep 초기화
    }
  };

  // 이전 단계로 이동
  const handlePrev = () => {
    if (step === 2 && subStep === 2) {
      setSubStep(1); //  선택 입력 사항 → 필수 입력 사항으로 돌아가기
    } else if (step > 1) {
      setStep(step - 1);
      setSubStep(1); //  새 단계로 갈 때 subStep 초기화
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 제목 */}
      <h1 className="text-title font-bold text-black mb-6">회원가입</h1>

      {/* 단계 표시 */}
      <Steps step={step} />

      {/* ✅ Step 1: 아이디 & 비밀번호 입력 */}
      {step === 1 && (
        <div className="w-full max-w-xs sm:max-w-sm">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-green-200 rounded-lg mb-6"></div>

          <label className="block text-item font-bold text-black mb-2">아이디</label>
          <input type="text" className="w-full p-3 border-2 border-point-green rounded-lg" placeholder="아이디를 입력해주세요." />

          <label className="block text-item font-bold text-black mt-4 mb-2">비밀번호</label>
          <input type="password" className="w-full p-3 border-2 border-point-green rounded-lg" placeholder="비밀번호를 입력해주세요." />
        </div>
      )}

      {/* ✅ Step 2 (필수 입력 사항) */}
      {step === 2 && subStep === 1 && (
        <div className="w-full max-w-xs sm:max-w-sm space-y-4">
          <h2 className="text-item font-bold text-black text-center my-4">필수 입력 사항</h2>

          {/* 이름 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">이름</label>
            <Input type="text" placeholder="이름을 입력해주세요." />
          </div>

          {/* 연락처 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">연락처</label>
            <Input type="tel" placeholder="010-1234-5678" />
          </div>

          {/* 주소 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">주소</label>
            <Input type="text" placeholder="주소를 입력해주세요." />
          </div>

          {/* 자격증 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">자격증</label>
            <div className="w-full">
              <input
                type="text"
                readOnly
                className="w-full p-3 border-2 rounded-lg bg-white cursor-pointer"
                placeholder="자격증을 입력해주세요."
                value={certification.name ? `${certification.name} ${certification.level}` : ""}
                onClick={() => setIsCertModalOpen(true)}
              />
            </div>
          </div>

           {/* 차량 소유 여부 */}
           <div>
            <label className="block text-item font-bold text-black mb-2">차량 소유</label>
            <div className="flex gap-4">
              <label className="flex items-center text-item"><input type="radio" name="car" className="mr-2" /> 소유</label>
              <label className="flex items-center text-item"><input type="radio" name="car" className="mr-2" /> 미소유</label>
            </div>
          </div>

           {/* 치매 교육 이수 */}
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

         {/* 구직 여부 */}

        <div>
          <label className="block text-item font-bold text-black mb-2">구직 여부</label>
          <div className="flex gap-4">
            <label className="flex items-center text-item">
              <input type="radio" name="employmentStatus" className="mr-2" /> 구직중
            </label>
            <label className="flex items-center text-item">
              <input type="radio" name="employmentStatus" className="mr-2" /> 비구직중
            </label>
          </div>
        </div>
        </div>
      )}

     {/* ✅ Step 2 (선택 입력 사항) */}
      {step === 2 && subStep === 2 && (
        <div className="w-full max-w-xs sm:max-w-sm">
          <h2 className="text-item font-bold text-black my-4 text-center">선택 입력 사항</h2>

          {/* 한줄소개 */}
          <label className="block text-item font-bold text-black mb-2">한줄소개</label>
          <textarea
            className="w-full h-24 p-3 border-2 rounded-lg bg-white text-content sm:text-lg focus:ring-2 focus:ring-green-400"
            placeholder="간단한 자기소개를 입력해주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />

          {/* 경력사항 */}
          <div className="w-full mt-6 border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center pb-2 mb-4">
              <h3 className="text-item font-bold text-black">경력사항</h3>
              <button onClick={() => setIsModalOpen(true)} className="text-[15px] text-disabled-gray font-bold">
                + 추가하기
              </button>
            </div>

       {/* ✅ 경력이 없을 경우 안내 메시지 표시 */}
       {experiences.length === 0 ? (
              <p className="text-content text-point-gray text-center">
                추가하기 버튼을 눌러 경력을 추가해주세요.
              </p>
            ) : (
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index}>
                    <h4 className="text-item font-bold text-black">{exp.place || "근무지 입력"}</h4>
                    <p className="text-content text-point-gray">{exp.period || "근무 기간 입력"}</p>
                    <p className="text-content text-black">{exp.details || "업무 내용 입력"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}


      {/* ✅ 버튼 */}
      <div className="w-full max-w-xs sm:max-w-sm flex flex-col gap-2 mt-auto">
        <Btn text="이전으로" color="white" onClick={handlePrev} />
        <Btn text="다음" color="green" onClick={handleNext} />
      </div>

      {/* ✅ 모달 추가 */}
      {isModalOpen && <CareerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddExperience} />}
      {isCertModalOpen && (
        <CertificationModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          onSave={(data) => setCertification({ name: data.name, level: data.level })}
        />
      )}
    </div>
  );
};

export default SignupStep1;
