import axios from "axios";
import { useUserStore } from "../../stores/userStore";
const API_BASE_URL = "https://api.gyeotae.site"; // ✅ 배포 서버 주소


export const updateCaregiverProfile = async (params: any) => {
  try {
    const token = useUserStore.getState().accessToken; // ✅ zustand에서 토큰 가져오기

    if (!token) {
      console.error("🚨 토큰이 없습니다. 로그인을 먼저 해주세요.");
      return null;
    }

    const formData = new FormData();
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

    if (params.profileImg) {
      formData.append("profileImg", params.profileImg);
    }

    const response = await axios.put(`${API_BASE_URL}/caregiver/profile`, formData, {
      headers: {
        Authorization: token, // ✅ 수정: `useUserStore`에서 가져온 토큰을 사용
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("🚨 요양보호사 정보 수정 실패:", error);
    throw error;
  }
};
