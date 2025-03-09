import axios from "axios";
import { useUserStore } from "../../stores/userStore";
const API_BASE_URL = "https://api.gyeotae.site"; // ✅ 배포 서버 주소

export const updateCaregiverProfile = async (params: any) => {
  try {
    let token = useUserStore.getState().accessToken; // ✅ zustand에서 토큰 가져오기

    if (!token) {
      console.error("🚨 토큰이 없습니다. 로그인을 먼저 해주세요.");
      return null;
    }

    token = token.startsWith("Bearer ") ? token : `Bearer ${token}`; // ✅ Bearer 추가

    const formData = new FormData();
    
    // ✅ 기존 프로필 이미지 유지 (사진을 변경하지 않았다면 서버에 보내야 함)
    if (params.profileImg) {
      formData.append("profileImg", params.profileImg);
    } else if (params.img) { // 🔥 기존 이미지가 있다면 다시 보내기!
      formData.append("profileImg", params.img);
    }

    formData.append("data", JSON.stringify({
      username: params.username,
      contact: params.contact,
      car: params.car,
      education: params.education,
      intro: params.intro,
      address: params.address,
      employmentStatus: params.employmentStatus,
      certificateRequestDTOList: params.certificateRequestDTOList,
      experienceRequestDTOList: params.experienceRequestDTOList,
    }));

    const response = await axios.put(`${API_BASE_URL}/caregiver/profile`, formData, {
      headers: {
        Authorization: token, // ✅ 토큰 적용
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ 프로필 업데이트 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 요양보호사 정보 수정 실패:", error);
    throw error;
  }
};
