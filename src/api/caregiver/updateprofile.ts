import axios from "axios";
import { useUserStore } from "../../stores/userStore";

const API_BASE_URL = "https://api.gyeotae.site"; // ✅ 배포 서버 주소

export const updateCaregiverProfile = async (params: any) => {
  try {
    const token = useUserStore.getState().accessToken;

    if (!token) {
      console.error("🚨 토큰이 없습니다. 로그인을 먼저 해주세요.");
      return null;
    }

    const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    // ✅ 타입 정의
    interface CaregiverProfileData {
      username: string;
      contact: string;
      car: boolean;
      education: boolean;
      intro: string;
      address: string;
      employmentStatus: boolean;
      certificateRequestDTOList: any[];
      experienceRequestDTOList: any[];
      img?: string; // ✅ img 속성 추가
    }

    // ✅ 기본 JSON 데이터 추가
    const requestData: CaregiverProfileData = {
      username: params.username,
      contact: params.contact,
      car: params.car,
      education: params.education,
      intro: params.intro,
      address: params.address,
      employmentStatus: params.employmentStatus,
      certificateRequestDTOList: params.certificateRequestDTOList || [],
      experienceRequestDTOList: params.experienceRequestDTOList || [],
    };

    // ✅ 기존 프로필 이미지가 URL이면 유지하도록 `img` 필드 추가
    if (typeof params.profileImg === "string" && params.profileImg.startsWith("http")) {
      requestData.img = params.profileImg; // ✅ 이제 TypeScript에서 오류 없음
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(requestData)); // JSON을 FormData에 추가

    // ✅ 새로운 프로필 이미지를 업로드하는 경우에만 `profileImg` 필드 추가
    if (params.profileImg instanceof File) {
      formData.append("profileImg", params.profileImg);
    }

    console.log("📌 최종 API 요청 formData:", Array.from(formData.entries())); // 🔥 FormData 디버깅

    const response = await axios.put(`${API_BASE_URL}/caregiver/profile`, formData, {
      headers: {
        Authorization: formattedToken,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ 요양보호사 정보 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 요양보호사 정보 수정 실패:", error);
    throw error;
  }
};
