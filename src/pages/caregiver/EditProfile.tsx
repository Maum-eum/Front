import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import { getCaregiverProfile } from "../../api/caregiver/profile";
import { updateCaregiverProfile } from "../../api/caregiver/updateprofile"; // ✅ 수정 API 추가
import CertificationModal from "../../components/caregiver/CertificationModal"; // ✅ 자격증 추가 모달
import CareerModal from "../../components/caregiver/CareerModal"; // ✅ 경력 추가 모달

const EditProfile = () => {
  const navigate = useNavigate();

  // ✅ 상태 정의 (초기 값은 빈 값)
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [hasCar, setHasCar] = useState<boolean | null>(null);
  const [dementiaTraining, setDementiaTraining] = useState<boolean | null>(null);
  const [employmentStatus, setEmploymentStatus] = useState<boolean | null>(null);
  const [certifications, setCertifications] = useState<{ certNum: string; certType: string; certRate: string }[]>([]);
  const [experiences, setExperiences] = useState<{ duration: number; title: string; description: string }[]>([]);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number | null>(null);

  // ✅ 기존 데이터 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCaregiverProfile();
        console.log("📌 가져온 요양보호사 데이터:", response);
        // ✅ 불러온 데이터를 상태에 저장하여 사용자가 수정 가능하게 함
        setProfileImage(response.img || null);
        setUserName(response.username);
        setPhone(response.contact);
        setAddress(response.address);
        setIntroduction(response.intro);
        setHasCar(response.car);
        setDementiaTraining(response.education);
        setEmploymentStatus(response.employmentStatus);
        setCertifications(response.certificateResponseDTOList);
        setExperiences(response.experienceResponseDTOList);
      } catch (error) {
        console.error("🚨 요양보호사 정보 가져오기 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  // ✅ 자격증 추가 및 수정 핸들러
  const handleAddCertificate = (newCertificate: { certNum: string; certType: string; certRate: string }) => {
    if (selectedCertIndex !== null) {
      // 기존 자격증 수정
      const updatedCerts = [...certifications];
      updatedCerts[selectedCertIndex] = newCertificate;
      setCertifications(updatedCerts);
    } else {
      // 새 자격증 추가
      setCertifications([...certifications, newCertificate]);
    }
    setSelectedCertIndex(null);
  };

  // ✅ 경력 추가 및 수정 핸들러
  const handleAddExperience = (newExperience: { duration: number; title: string; description: string }) => {
    if (selectedCareerIndex !== null) {
      // 기존 경력 수정
      const updatedExp = [...experiences];
      updatedExp[selectedCareerIndex] = newExperience;
      setExperiences(updatedExp);
    } else {
      // 새 경력 추가
      setExperiences([...experiences, newExperience]);
    }
    setSelectedCareerIndex(null);
  };

    // ✅ 경력 삭제 핸들러
    const handleDeleteExperience = (index: number) => {
      setExperiences(experiences.filter((_, i) => i !== index));
    };

  const handleUpdateProfile = async () => {
    const updatedProfile = {
      username,
      contact: phone,
      car: hasCar,
      education: dementiaTraining,
      employmentStatus, // ✅ 구직 상태 추가
      img: profileImage,
      intro: introduction,
      address,
      certificateResponseDTOList: certifications,
      experienceResponseDTOList: experiences,
    };

    const response = await updateCaregiverProfile(updatedProfile);
  
    if (response) {
      alert("✅ 정보가 성공적으로 수정되었습니다!");
      navigate("/caregiver/main"); // ✅ 수정 후 메인으로 이동
    } else {
      alert("🚨 정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      <h1 className="text-title font-bold text-black mb-6">정보 변경</h1>

      <div className="w-full max-w-xs sm:max-w-sm bg-white p-6 rounded-lg shadow-md">
        {/* ✅ 프로필 이미지 */}
        <div className="flex flex-col items-center mb-6">
          {profileImage ? (
            <img src={profileImage} alt="프로필" className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border" />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full border flex items-center justify-center">
              <span className="text-gray-500 text-sm">사진 없음</span>
            </div>
          )}
        </div>

        {/* ✅ 이름 */}
        <label className="block text-item font-bold text-black">이름</label>
        <Input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="이름 입력" />

        {/* ✅ 연락처 */}
        <label className="block text-item font-bold text-black">연락처</label>
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처 입력" />

        {/* ✅ 주소 */}
        <label className="block text-item font-bold text-black">주소</label>
        <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="주소 입력" />
          {/* ✅ 자격증 목록 */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="font-bold text-item text-black">자격증</h2>
          <button onClick={() => setIsCertModalOpen(true)} className="text-gray-500 text-sm font-bold">
            + 추가
          </button>
        </div>
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <div
              key={index}
              className="w-full p-3 border-2 rounded-lg bg-white cursor-pointer"
              onClick={() => {
                setSelectedCertIndex(index);
                setIsCertModalOpen(true);
              }}
            >
              {cert.certType} {cert.certRate === "LEVEL1" ? "1급" : "2급"}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">자격증 없음</p>
        )}

        {/* ✅ 한줄 소개 */}
        <label className="block text-item font-bold text-black">한줄 소개</label>
        <textarea className="w-full p-3 border-2 rounded-lg bg-white" value={introduction} onChange={(e) => setIntroduction(e.target.value)} placeholder="한줄 소개 입력" />

        {/* ✅ 차량 소유 여부 */}
        <label className="block text-item font-bold text-black">차량 소유</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" name="car" checked={hasCar === true} onChange={() => setHasCar(true)} /> 소유
          </label>
          <label>
            <input type="radio" name="car" checked={hasCar === false} onChange={() => setHasCar(false)} /> 미소유
          </label>
        </div>

        {/* ✅ 치매 교육 이수 여부 */}
        <label className="block text-item font-bold text-black">치매 교육 이수</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" name="dementia" checked={dementiaTraining === true} onChange={() => setDementiaTraining(true)} /> 이수
          </label>
          <label>
            <input type="radio" name="dementia" checked={dementiaTraining === false} onChange={() => setDementiaTraining(false)} /> 미이수
          </label>
        </div>

        {/* ✅ 구직 상태 추가 */}
        <label className="block text-item font-bold text-black">구직 상태</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" name="employment" checked={employmentStatus === true} onChange={() => setEmploymentStatus(true)} /> 구직 중
          </label>
          <label>
            <input type="radio" name="employment" checked={employmentStatus === false} onChange={() => setEmploymentStatus(false)} /> 구직 아님
          </label>
        </div>        

         {/* ✅ 경력 목록 */}
         <div className="flex justify-between items-center mt-4">
          <h2 className="font-bold text-item text-black">경력사항</h2>
          <button onClick={() => setIsCareerModalOpen(true)} className="text-gray-500 text-sm font-bold">
            + 추가
          </button>
        </div>
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={index} className="flex justify-between items-center border p-3 rounded-lg bg-white cursor-pointer">
              <div
                className="flex flex-col w-full"
                onClick={() => {
                  setSelectedCareerIndex(index);
                  setIsCareerModalOpen(true);
                }}
              >
                <p className="font-bold text-black text-item">
                  {exp.title} <span className="text-gray-500">{exp.duration}개월</span>
                </p>
                <p className="text-sm text-black">{exp.description}</p>
              </div>
              <button onClick={() => handleDeleteExperience(index)} className="text-red-500 text-sm font-bold">
                 🗑️
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">경력 없음</p>
        )}

        {/* ✅ 버튼 */}
        <div className="flex flex-col gap-2 mt-6">
          <Btn text="이전" color="white" onClick={() => navigate(-1)} />
          <Btn text="수정하기" color="green" onClick={handleUpdateProfile} />
        </div>
      </div>

      {/* ✅ 모달 추가 */}
      {isCertModalOpen && (
      <CertificationModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          onSave={handleAddCertificate}
        />
      )}
      {isCareerModalOpen && (
        <CareerModal
          isOpen={isCareerModalOpen}
          onClose={() => setIsCareerModalOpen(false)}
          onSave={handleAddExperience}
        />
      )}
    
    </div>
  );
};

export default EditProfile;
