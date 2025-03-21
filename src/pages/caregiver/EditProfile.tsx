import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import { getCaregiverProfile } from "../../api/caregiver/getprofile";
import { updateCaregiverProfile } from "../../api/caregiver/updateprofile";
import CertificationModal from "../../components/caregiver/CertificationModal"; 
import CareerModal from "../../components/caregiver/CareerModal"; 

const EditProfile = () => {
  const navigate = useNavigate();

  // 프로필 정보 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [hasCar, setHasCar] = useState<boolean | null>(null);
  const [dementiaTraining, setDementiaTraining] = useState<boolean | null>(null);
  const [employmentStatus, setEmploymentStatus] = useState<boolean | null>(null);
  const [certifications, setCertifications] = useState<{ certNum: string; certType: string; certRate: string }[]>([]);
  const [experiences, setExperiences] = useState<{ duration: number; title: string; description: string }[]>([]);

  // 모달 상태
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number | null>(null);

  // 프로필 데이터 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCaregiverProfile();
        setProfileImage(response.img || null);
        setUserName(response.username);
        setPhone(response.contact);
        setAddress(response.address);
        setIntroduction(response.intro);
        setHasCar(response.car);
        setDementiaTraining(response.education);
        setEmploymentStatus(response.employmentStatus);
        setCertifications(response.certificateResponseDTOList || []);
        setExperiences(response.experienceResponseDTOList || []);
      } catch (error) {
        console.error("🚨 프로필 정보 불러오기 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  // 자격증 추가 및 수정 핸들러
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

  //  경력 추가 및 수정 핸들러
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

    //  경력 삭제 핸들러
    const handleDeleteExperience = (index: number) => {
      setExperiences(experiences.filter((_, i) => i !== index));
    };

  
    // 프로필 업데이트 핸들러
    const handleUpdateProfile = async () => {
      const updatedProfile: any = {
        username,
        contact: phone,
        car: hasCar,
        education: dementiaTraining,
        employmentStatus,
        intro: introduction,
        address,
        certificateRequestDTOList: certifications,
        experienceRequestDTOList: experiences,
      };
    
      // 기존 프로필 이미지를 유지하도록 보장
      if (selectedImage) {
        updatedProfile.profileImg = selectedImage; // 새 이미지가 있는 경우 추가
      } else if (profileImage) {
        updatedProfile.profileImg = profileImage; // 기존 이미지 유지
      } else {
        updatedProfile.profileImg = ""; 
      }
    
      console.log("📌 최종 API 요청 데이터 (updatedProfile):", updatedProfile);
    
      try {
        const response = await updateCaregiverProfile(updatedProfile);
    
        if (response) {
          alert("✅ 정보가 성공적으로 수정되었습니다!");
          navigate("/caregiver/main");
    
          // 최신 프로필 정보 다시 불러오기
          const updatedData = await getCaregiverProfile();
          setProfileImage(updatedData.img);
    
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      } catch (error) {
        console.error("🚨 API 요청 실패:", error);
        alert("🚨 정보 수정에 실패했습니다. 다시 시도해주세요.");
      }
    };
    
    
    
  return (
      <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 py-8 font-gtr-B">
        <h1 className="text-title font-bold text-black mb-6">정보 변경</h1>
        <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-4">
            {previewImage || profileImage ? (
              <img
                src={previewImage || profileImage!}
                alt="프로필"
                className="w-28 h-28 object-cover rounded-xl border-2 border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 rounded-xl border-2 border-gray-300 shadow-sm flex items-center justify-center">
                <span className="text-gray-500 text-sm">사진 없음</span>
              </div>
            )}
        <label className="mt-2 cursor-pointer text-sm text-blue-500">
          프로필 사진 수정
          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>
      
        <div className="flex flex-col gap-4">
        {/* 이름 */}
        <label className="block text-item font-bold text-black">이름</label>
        <Input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="이름 입력" />

        {/* 연락처 */}
        <label className="block text-item font-bold text-black">연락처</label>
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처 입력" />

        {/* 주소 */}
        <label className="block text-item font-bold text-black">주소</label>
        <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="주소 입력" />
      </div>

        {/* 자격증 목록 */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="font-bold text-item text-black mb-4">자격증</h2>
          <button onClick={() => setIsCertModalOpen(true)} className="text-gray-500 text-sm font-bold">
            + 추가하기
          </button>
        </div>
        {certifications.length > 0 ? (
          certifications.map((cert, index) => (
            <div
              key={index}
              className="w-full h-12 p-2 border-2 border-gray-300 bg-white focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0 flex items-center cursor-pointer"
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


        {/* 차량 소유 여부 */}
        <label className="block text-item font-bold text-black mt-4">차량 소유</label>
        <div className="flex gap-4 mb-4 mt-2">
          {[
            { label: "소유", value: true },
            { label: "미소유", value: false },
          ].map((option) => (
            <label
              key={option.value.toString()}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2  ${
                hasCar === option.value ? "border-green bg-green-100" : "border-gray-300"
              }`}
              onClick={() => setHasCar(option.value)}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                  hasCar === option.value ? "border-green bg-green" : "border-gray-400 bg-white"
                }`}
              >
                {hasCar === option.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
              </div>
              <span className="text-content">{option.label}</span>
            </label>
          ))}
        </div>

        {/*  치매 교육 이수 여부 */}
        <label className="block text-item font-bold text-black">치매 교육 이수</label>
        <div className="flex gap-4 mt-2">
          {[
            { label: "이수", value: true },
            { label: "미이수", value: false },
          ].map((option) => (
            <label
              key={option.value.toString()}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2  ${
                dementiaTraining === option.value ? "border-green bg-green-100" : "border-gray-300"
              }`}
              onClick={() => setDementiaTraining(option.value)}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                  dementiaTraining === option.value ? "border-green bg-green" : "border-gray-400 bg-white"
                }`}
              >
                {dementiaTraining === option.value && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
              </div>
              <span className="text-content">{option.label}</span>
            </label>
          ))}
        </div>

      {/* 한줄 소개 */}
      <label className="block text-item font-bold text-black mt-4">한줄 소개</label>
      <textarea
        className="w-full p-2 border-2 bg-white border-gray-300 focus:border-green focus:outline-none rounded-lg text-content sm:text-lg focus:ring-0 mt-2"
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
        placeholder="한줄 소개 입력"
      />

      {/*  경력 목록 */}
      <div className="flex justify-between items-center mt-4">
        <h2 className="font-bold text-item text-black mb-2">경력사항</h2>
        <button onClick={() => setIsCareerModalOpen(true)} className="text-gray-500 text-sm font-bold">
          + 추가하기
        </button>
      </div>

      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-white cursor-pointer">
            <div
              className="flex flex-col w-full"
              onClick={() => {
                setSelectedCareerIndex(index);
                setIsCareerModalOpen(true);
              }}
            >
              <p className="font-semibold text-black text-item">
                {exp.title} <span className="text-gray-500 text-sm">{exp.duration}개월</span>
              </p>
              <p className="text-sm text-black mt-2">{exp.description}</p> 
            </div>
            <button onClick={() => handleDeleteExperience(index)} className="text-red-500 text-sm font-bold">
              🗑️
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">경력 없음</p>
      )}

        {/*  버튼 */}
        <div className="flex flex-col gap-2 mt-6">
          <Btn text="이전" color="white" onClick={() => navigate(-1)} />
          <Btn text="수정하기" color="green" onClick={handleUpdateProfile} />
        </div>
      </div>

      {/*  모달 추가 */}
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
