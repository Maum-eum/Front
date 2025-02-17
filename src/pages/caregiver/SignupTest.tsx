import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../../stores/caregiver/useSignupStore";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import CareerModal from "../../components/caregiver/CareerModal";
import CertificationModal from "../../components/caregiver/CertificationModal";
import { signUpCaregiver } from "../../api/caregiver/auth";

const SignupTest = () => {
  const navigate = useNavigate();
  const { setSignupData, profileImg, certificateRequestDTOList, experienceRequestDTOList, ...signupData } = useSignupStore();
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ 회원가입 API 요청
  const handleSignup = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await signUpCaregiver({
        ...signupData,
        profileImg,
        certificateRequestDTOList,
        experienceRequestDTOList,
      });
  
      console.log("회원가입 성공:", response);
      alert("회원가입 성공!");
      
      navigate("/"); // ✅ 회원가입 완료 후 메인 페이지로 이동
  
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패 ㅠㅠ");
    } finally {
      setLoading(false);
    }
  };
  

  // ✅ 경력 추가 함수
  const addExperience = (newExperience: { title: string; duration: number; description: string }) => {
    setSignupData({ experienceRequestDTOList: [...experienceRequestDTOList, newExperience] });
  };

  // ✅ 경력 삭제 함수
  const removeExperience = (index: number) => {
    setSignupData({
      experienceRequestDTOList: experienceRequestDTOList.filter((_, i) => i !== index),
    });
  };

  // ✅ 자격증 추가 함수 (페이지에도 즉시 반영)
  const addCertificate = (newCertificate: { certNum: string; certType: string; certRate: string }) => {
    setSignupData({ certificateRequestDTOList: [newCertificate] }); // ✅ 기존 값 덮어쓰기
  };

  
  const handlePrev = () => {
    setSignupData({ ...signupData }); // ✅ 현재 상태를 저장해서 유지
    console.log("📌 이전으로 이동 - 유지되는 데이터:", signupData);
    
    if (step === 2 && subStep === 2) {
      setSubStep(1); // Step 2의 하위 단계에서 필수 정보 입력으로 이동
    } else if (step === 2 && subStep === 1) {
      setStep(1); // Step 2에서 Step 1로 이동
    } else {
      navigate("/"); // 처음 화면으로 이동
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 px-4 sm:px-6 py-8">
      <h2 className="text-title font-bold text-black text-center mb-4">회원가입</h2>
      <Steps step={step} />

      {/* ✅ Step 1: 아이디 & 비밀번호 입력 + 프로필 이미지 */}
      {step === 1 && (
        <div className="w-full max-w-xs sm:max-w-sm p-6">
         

          {/* ✅ 프로필 이미지 업로드 */}
          <div className="w-24 h-24 bg-green-200 rounded-lg mx-auto mt-4 flex items-center justify-center relative">
            {profileImg && <img src={URL.createObjectURL(profileImg)} alt="프로필" className="w-full h-full rounded-lg object-cover" />}
          </div>
          <input type="file" className="mt-2 w-full text-sm" accept="image/*" 
            onChange={(e) => setSignupData({ profileImg: e.target.files?.[0] || null })} />

         {/* ✅ 아이디 입력 */}
          <label className="block text-item font-bold text-black mt-6">아이디</label>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요."
            value={signupData.username} // ✅ Zustand에서 가져온 값 유지
            onChange={(e) => setSignupData({ username: e.target.value })}
          />

          {/* ✅ 비밀번호 입력 */}
          <label className="block text-item font-bold text-black mt-4">비밀번호</label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={signupData.password} // ✅ Zustand에서 가져온 값 유지
            onChange={(e) => setSignupData({ password: e.target.value })}
          />

          <div className="flex flex-col gap-2 mt-6">
            <Btn text="취소하기" color="white" onClick={() => navigate("/")} />
            <Btn text="다음" color="green" onClick={() => setStep(2)} />
          </div>
        </div>
      )}
       {/* ✅ Step 2 - 필수 정보 입력 */}
       {step === 2 && subStep === 1 && (
        <div className="w-full max-w-xs sm:max-w-sm p-6">
          <h2 className="text-title font-bold text-black text-center">필수 입력 사항</h2>

          {/* ✅ 입력 필드 (왼쪽 라벨 + 오른쪽 입력창) */}
                    {/* ✅ 이름 입력 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">이름</label>
            <Input
              type="text"
              placeholder="이름을 입력해주세요."
              value={signupData.name} // ✅ Zustand 상태와 연결
              onChange={(e) => setSignupData({ name: e.target.value })}
            />
          </div>

          {/* ✅ 연락처 입력 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">연락처</label>
            <Input
              type="text"
              placeholder="010-1234-5678"
              value={signupData.contact} // ✅ Zustand 상태와 연결
              onChange={(e) => setSignupData({ contact: e.target.value })}
            />
          </div>


          {/* ✅ 주소 입력 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">주소</label>
            <Input
              type="text"
              placeholder="주소를 입력해주세요."
              value={signupData.address} // ✅ Zustand에서 유지
              onChange={(e) => setSignupData({ address: e.target.value })}
            />
          </div>

          {/* ✅ 자격증 추가 */}
          <div className="flex items-center justify-between">
            <label className="text-item font-bold text-black w-1/3">자격증</label>
            <div className="w-full">
              <input
                type="text"
                readOnly
                className="w-full p-3 border-2 rounded-lg bg-white cursor-pointer"
                placeholder="자격증을 입력해주세요."
                value={
                  certificateRequestDTOList.length > 0
                    ? `${certificateRequestDTOList[0].certType} ${
                        certificateRequestDTOList[0].certRate === "LEVEL1" ? "1급" : "2급"
                      }`
                    : ""
                }
                onClick={() => setIsCertModalOpen(true)}
              />
            </div>
          </div>

          {/* ✅ 차량 소유 여부 */}
          <label className="text-item font-bold text-black">차량 소유</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="car"
                checked={signupData.car === true} // ✅ Zustand 상태 유지
                onChange={() => setSignupData({ car: true })}
              /> 소유
            </label>
            <label>
              <input
                type="radio"
                name="car"
                checked={signupData.car === false} // ✅ Zustand 상태 유지
                onChange={() => setSignupData({ car: false })}
              /> 미소유
            </label>
          </div>

          {/* ✅ 치매 교육 이수 여부 */}
          <label className="text-item font-bold text-black">치매 교육 이수</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="education"
                checked={signupData.education === true} // ✅ Zustand 상태 유지
                onChange={() => setSignupData({ education: true })}
              /> 이수
            </label>
            <label>
              <input
                type="radio"
                name="education"
                checked={signupData.education === false} // ✅ Zustand 상태 유지
                onChange={() => setSignupData({ education: false })}
              /> 미이수
            </label>
          </div>

          {/* ✅ 구직 여부 */}
          <label className="text-item font-bold text-black">구직 여부</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="employmentStatus"
                checked={signupData.employmentStatus === true} // ✅ Zustand 상태 유지
                onChange={() => setSignupData({ employmentStatus: true })}
              /> 구직중
            </label>

            <label>
              <input
                type="radio"
                name="employmentStatus"
                checked={signupData.employmentStatus === false} // ✅ Zustand 상태 유지
                onChange={() => setSignupData({ employmentStatus: false })}
              /> 비구직중
            </label>
          </div>

          <div className="flex flex-col gap-2 mt-6">
          <Btn text="이전으로" color="white" onClick={handlePrev} />
            <Btn text="다음" color="green" onClick={() => setSubStep(2)} />
          </div>
        </div>
      )}

      {/* ✅ Step 2 - 선택 정보 입력 */}
      {step === 2 && subStep === 2 && (
        <div className="w-full max-w-xs sm:max-w-sm p-6">
          <h2 className="text-title font-bold text-black text-center">선택 입력 사항</h2>

         {/* ✅ 한줄 소개 */}
        <label className="text-item font-bold text-black">한줄 소개</label>
        <textarea
          className="w-full border p-2 rounded-lg"
          placeholder="한줄 소개 입력"
          value={signupData.intro} // ✅ Zustand에서 유지
          onChange={(e) => setSignupData({ intro: e.target.value })} // ✅ Zustand에 저장
        />

          {/* ✅ 경력 사항 */}
          <div className="mt-4">
            <h3 className="text-item font-bold text-black">경력 사항</h3>
            <button onClick={() => setIsModalOpen(true)} className="text-green-500 font-bold">+ 추가하기</button>
          </div>

          {/* ✅ 추가된 경력 리스트 */}
          {experienceRequestDTOList.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {experienceRequestDTOList.map((exp, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-black font-bold">{exp.title} <span className="text-gray-500">{exp.duration}개월</span></p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                  <button onClick={() => removeExperience(index)} className="text-red-500 text-lg">🗑</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">경력을 추가해주세요.</p>
          )}

          <div className="flex flex-col gap-2 mt-6">
            <Btn text="이전으로" color="white" onClick={() => setSubStep(1)} />
            <Btn text="회원가입 완료" color="green" onClick={handleSignup} />
          </div>
        </div>
      )}


      {/* ✅ 모달 */}
      {isModalOpen && <CareerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addExperience} />}
      {isCertModalOpen && (
  <CertificationModal
    isOpen={isCertModalOpen}
    onClose={() => setIsCertModalOpen(false)}
    onSave={addCertificate} // ✅ 기존 데이터 없이 새로운 값만 추가
  />
)}


    </div>
  );
};

export default SignupTest;
