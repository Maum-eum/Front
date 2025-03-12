import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../../stores/caregiver/useSignupStore";
import Steps from "../../components/commons/Steps";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import CareerModal from "../../components/caregiver/CareerModal";
import CertificationModal from "../../components/caregiver/CertificationModal";
import { signUpCaregiver } from "../../api/caregiver/auth";
import axios from "axios"; 
import { Login } from "../../api/commons/User";  //  Login API 가져오기
import { useUserStore } from "../../stores/userStore";


const SignupTest = () => {
  const navigate = useNavigate();
  const { setSignupData, profileImg, certificateRequestDTOList, experienceRequestDTOList, ...signupData } = useSignupStore();
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (loading) return;
    setLoading(true);
  
    try {
      // ✅ 1. 회원가입 API 요청
      const response = await signUpCaregiver({
        ...signupData,
        profileImg,
        certificateRequestDTOList,
        experienceRequestDTOList,
      });
  
      console.log("✅ 회원가입 성공:", response);
  
      if (response.status === "success") {
        alert("회원가입 성공!");
  
        // ✅ 2. 회원가입 성공 후 자동 로그인 요청 (기존 데이터 초기화 후 로그인 진행)
        await Login(
          { username: signupData.username, password: signupData.password },
          (loginResponse) => {
            console.log("✅ 로그인 응답 데이터:", JSON.stringify(loginResponse.data, null, 2));
            console.log("✅ 로그인 응답 헤더:", loginResponse.headers);
  
            // ✅ 기존 localStorage 초기화 (이전 계정 정보 제거)
            localStorage.clear();
  
            // ✅ Authorization 헤더에서 accessToken 가져오기
            const token = loginResponse.headers.authorization?.split("Bearer ")[1];
  
            if (!token) {
              alert("로그인 성공했지만, 토큰을 가져올 수 없습니다!");
              return;
            }
  
            // ✅ 3. zustand 스토어에서 사용자 정보 업데이트 (새로운 계정 정보 저장)
            useUserStore.setState({
              accessToken: token,
              userId: loginResponse.data.data.userId,
              role: loginResponse.data.data.role,
            });
  
            console.log("✅ zustand에 저장된 사용자 정보:", useUserStore.getState());
  
            // ✅ 5. 필수 정보 등록 페이지로 이동
            alert("회원가입 성공! 필수 정보 등록으로 이동합니다.");
            navigate("/caregiver/signup/step3");
          },
          (loginError) => {
            console.error("❌ 자동 로그인 실패:", loginError);
            alert("자동 로그인 실패! 로그인 페이지로 이동합니다.");
            navigate("/login");
          }
        );
      } else {
        alert("회원가입 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
  
      if (axios.isAxiosError(error)) {
        console.error("🛑 서버 응답 에러:", error.response?.data);
      } else {
        console.error("🛑 예상치 못한 에러:", (error as Error).message);
      }
  
      alert("회원가입 실패");
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

  // ✅ 자격증 추가 함수
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
      navigate("/caregiver/singup/step3"); // 
    }
  };
  

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 px-4 sm:px-6 py-8 font-gtr-B">
      <h2 className="text-title font-bold text-black text-center mb-4">회원가입</h2>
      <Steps step={step} />

      {/* ✅ Step 1: 아이디 & 비밀번호 입력 + 프로필 이미지 */}
      {step === 1 && (
        <div className="w-full max-w-xs sm:max-w-sm p-6">
         

        {/* ✅ 프로필 이미지 업로드 (이미지 클릭 가능, 테두리 안에 꽉 차도록 개선) */}
        <label htmlFor="profile-upload" className="cursor-pointer">
          <div className="w-24 h-24 bg-green-200 border-2 border-gray-400 rounded-lg mx-auto mt-4 flex items-center justify-center overflow-hidden relative">
            {profileImg ? (
              <img
                src={URL.createObjectURL(profileImg)}
                alt="프로필"
                className="absolute w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">사진 추가</span>
            )}
          </div>
        </label>

        {/* 숨겨진 파일 업로드 인풋 */}
        <input
          id="profile-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setSignupData({ profileImg: e.target.files?.[0] || null })}
        />


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
          <h2 className="text-item font-bold text-black text-center">필수 입력 사항</h2>

          {/* ✅ 입력 필드 (왼쪽 라벨 + 오른쪽 입력창) */}
                    {/* ✅ 이름 입력 */}
          <div className="flex items-center justify-between  mt-4">
            <label className="text-item font-bold text-black w-1/3">이름</label>
            <Input
              type="text"
              placeholder="이름을 입력해주세요."
              value={signupData.name} // ✅ Zustand 상태와 연결
              onChange={(e) => setSignupData({ name: e.target.value })}
            />
          </div>

          {/* ✅ 연락처 입력 */}
          <div className="flex items-center justify-between  mt-4">
            <label className="text-item font-bold text-black w-1/3">연락처</label>
            <Input
              type="text"
              placeholder="010-1234-5678"
              value={signupData.contact} // ✅ Zustand 상태와 연결
              onChange={(e) => setSignupData({ contact: e.target.value })}
            />
          </div>

          {/* ✅ 주소 입력 */}
          <div className="flex items-center justify-between mt-4">
            <label className="text-item font-bold text-black w-1/3">주소</label>
            <Input
              type="text"
              placeholder="주소를 입력해주세요."
              value={signupData.address} // ✅ Zustand에서 유지
              onChange={(e) => setSignupData({ address: e.target.value })}
            />
          </div>

          {/* ✅ 자격증 추가 */}
          <div className="border-b border-gray-300 pb-4 mb-4">
          <div className="flex items-center justify-between mt-4">
            <label className="text-item font-bold text-black w-1/4">자격증</label>
            <div className="w-3/4">
              <input
                type="text"
                readOnly
                className="w-full p-2 border-2 border-gray-300 bg-white cursor-pointer 
                          rounded-lg text-content sm:text-lg focus:border-green focus:outline-none focus:ring-0"
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
          </div>
      
    {/* ✅ 차량 소유 여부 */}
<label className="text-item font-bold text-black mt-4">차량 소유</label>
<div className="flex gap-4 mb-4">
  {[
    { label: "소유", value: true },
    { label: "미소유", value: false },
  ].map((option) => (
    <label
      key={option.value.toString()}
      className={`flex items-center justify-between w-1/2 px-4 py-2 cursor-pointer ${
        signupData.car === option.value ? "border-green bg-green-100" : "border-gray-300"
      }`}
      onClick={() => setSignupData({ car: option.value })}
    >
      <span className="text-content">{option.label}</span>
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
          signupData.car === option.value ? "border-green bg-green" : "border-gray-400 bg-white"
        }`}
      >
        {signupData.car === option.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
      </div>
    </label>
  ))}
</div>

{/* ✅ 치매 교육 이수 여부 */}
<label className="text-item font-bold text-black">치매 교육 이수</label>
<div className="flex gap-4 mb-4">
  {[
    { label: "이수", value: true },
    { label: "미이수", value: false },
  ].map((option) => (
    <label
      key={option.value.toString()}
      className={`flex items-center justify-between w-1/2 px-4 py-2 cursor-pointer ${
        signupData.education === option.value ? "border-green bg-green-100" : "border-gray-300"
      }`}
      onClick={() => setSignupData({ education: option.value })}
    >
      <span className="text-content">{option.label}</span>
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
          signupData.education === option.value ? "border-green bg-green" : "border-gray-400 bg-white"
        }`}
      >
        {signupData.education === option.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
      </div>
    </label>
  ))}
</div>

{/* ✅ 구직 여부 */}
<label className="text-item font-bold text-black">구직 여부</label>
<div className="flex gap-4 mb-4">
  {[
    { label: "구직중", value: true },
    { label: "비구직중", value: false },
  ].map((option) => (
    <label
      key={option.value.toString()}
      className={`flex items-center justify-between w-1/2 px-4 py-2  cursor-pointer ${
        signupData.employmentStatus === option.value ? "border-green bg-green-100" : "border-gray-300"
      }`}
      onClick={() => setSignupData({ employmentStatus: option.value })}
    >
      <span className="text-content">{option.label}</span>
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
          signupData.employmentStatus === option.value ? "border-green bg-green" : "border-gray-400 bg-white"
        }`}
      >
        {signupData.employmentStatus === option.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
      </div>
    </label>
  ))}
</div>


          <div className="flex flex-col gap-2 mt-4">
          <Btn text="이전으로" color="white" onClick={handlePrev} />
            <Btn text="다음" color="green" onClick={() => setSubStep(2)} />
          </div>
        </div>
      )}

      {/* ✅ Step 2 - 선택 정보 입력 */}
      {step === 2 && subStep === 2 && (
        <div className="w-full max-w-xs sm:max-w-sm p-6">
          <h2 className="text-item font-bold text-black text-center mb-6">선택 입력 사항</h2>

         {/* ✅ 한줄 소개 */}
        <label className="text-item font-bold text-black mb-4 block ">한줄 소개</label>
        <textarea
          className="w-full border p-2 rounded-lg mb-4"
          placeholder="한줄 소개 입력"
          value={signupData.intro} // ✅ Zustand에서 유지
          onChange={(e) => setSignupData({ intro: e.target.value })} // ✅ Zustand에 저장
        />
        {/* ✅ 구분선 추가 */}
        <div className="border-b border-gray-300 mb-6"></div>

          {/* ✅ 경력 사항 (제목 & 추가하기 버튼 정렬) */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-item font-bold text-black">경력사항</h3>
            <button onClick={() => setIsModalOpen(true)} className="text-[#777777] font-bold">+ 추가하기</button>
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
            <p className="text-gray-500 mt-2">추가하기 버튼으로 경력 추가하기</p>
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
