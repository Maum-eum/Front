import axios from "axios";

const API_BASE_URL = "https://api.gyeotae.site"; // ✅ 배포 서버 주소

export const updateCaregiverProfile = async (params: any) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 토큰이 없습니다. 로그인을 먼저 해주세요.");
      return null;
    }

    const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    // ✅ FormData 생성
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
        Authorization: formattedToken,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("🚨 요양보호사 정보 수정 실패:", error);
    throw error;
  }
};
