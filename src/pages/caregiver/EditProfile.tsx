import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../components/commons/Btn";
import Input from "../../components/commons/Input";
import CareerModal from "../../components/caregiver/CareerModal";
import CertificationModal from "../../components/caregiver/CertificationModal";

const EditProfile = () => {
  const navigate = useNavigate();

  // 사용자 정보 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("안지희");
  const [phone, setPhone] = useState("010-1234-1234");
  const [address, setAddress] = useState("서울시");
  const [certification, setCertification] = useState<{ name: string; level: string }>({
    name: "요양보호사",
    level: "1급",
  });
  const [hasCar, setHasCar] = useState("소유");
  const [dementiaTraining, setDementiaTraining] = useState("이수");
  const [introduction, setIntroduction] = useState("나는야 성실해요");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const [experiences, setExperiences] = useState([
    { place: "꿈나무 복지관", period: "2023.09 - 2024.01", details: "식사 보조, 이동 보조, 일상 생활 보조" },
    { place: "김물루 노인보조", period: "2023.12 - 2025.02", details: "식사 보조, 이동 보조, 일상 생활 보조" },
  ]);

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 경력 추가 핸들러
  const handleAddExperience = (newExperience: { place: string; period: string; details: string }) => {
    setExperiences([...experiences, newExperience]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-base-white px-4 sm:px-6 py-8">
      {/* 제목 */}
      <h1 className="text-title font-bold text-black mb-6">정보 변경</h1>

      <div className="w-full max-w-xs sm:max-w-sm bg-white p-6 rounded-lg shadow-md">
        {/* 프로필 이미지 업로드 */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
            {profileImage ? (
              <img src={profileImage} alt="프로필" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-gray-500 text-sm">사진 추가</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">프로필 사진 추가</p>
        </div>

        {/* 정보 입력 폼 */}
        <div className="space-y-4">
          <label className="block text-item font-bold text-black">이름</label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" />

          <label className="block text-item font-bold text-black">연락처</label>
          <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="연락처를 입력하세요" />

          <label className="block text-item font-bold text-black">주소</label>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="주소를 입력하세요" />

          {/* 자격증 */}
          <label className="block text-item font-bold text-black">자격증</label>
          <div
            className="w-full p-3 border-2 rounded-lg bg-white cursor-pointer"
            onClick={() => setIsCertModalOpen(true)}
          >
            {certification.name} {certification.level}
          </div>

          {/* 차량 소유 여부 */}
          <label className="block text-item font-bold text-black">차량 소유</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="car" value="소유" checked={hasCar === "소유"} onChange={() => setHasCar("소유")} /> 소유
            </label>
            <label className="flex items-center">
              <input type="radio" name="car" value="미소유" checked={hasCar === "미소유"} onChange={() => setHasCar("미소유")} /> 미소유
            </label>
          </div>

          {/* 치매 교육 이수 */}
          <label className="block text-item font-bold text-black">치매 교육 이수</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="radio" name="dementia" value="이수" checked={dementiaTraining === "이수"} onChange={() => setDementiaTraining("이수")} /> 이수
            </label>
            <label className="flex items-center">
              <input type="radio" name="dementia" value="미이수" checked={dementiaTraining === "미이수"} onChange={() => setDementiaTraining("미이수")} /> 미이수
            </label>
          </div>

          {/* 한줄소개 */}
          <label className="block text-item font-bold text-black">한줄소개</label>
          <textarea className="w-full p-3 border-2 rounded-lg bg-white" value={introduction} onChange={(e) => setIntroduction(e.target.value)} />

          {/* 버튼 */}
          <div className="flex flex-col gap-2 mt-6">
            <Btn text="이전" color="white" onClick={() => navigate(-1)} />
            <Btn text="완료" color="green" onClick={() => alert("정보가 저장되었습니다!")} />
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && <CareerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddExperience} />}
      {isCertModalOpen && <CertificationModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} onSave={(data) => setCertification(data)} />}
    </div>
  );
};

export default EditProfile;
