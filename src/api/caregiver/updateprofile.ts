import axios from "axios";

export const updateCaregiverProfile = async (updatedData: any) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 토큰이 없습니다. 로그인을 먼저 해주세요.");
      return null;
    }

    // ✅ Bearer 중복 방지
    const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

    const requestBody: any = {
      username: updatedData.username, // ✅ 기존 name → username 변경
      contact: updatedData.contact,
      car: updatedData.car,
      education: updatedData.education,
      img: updatedData.img,
      intro: updatedData.intro,
      address: updatedData.address,
      certificateRequestDTOList: updatedData.certificateRequestDTOList || [],
      experienceRequestDTOList: updatedData.experienceRequestDTOList || [],
    };

    // ✅ 요청 전에 콘솔로 확인 (디버깅)
    console.log("🛠️ 사용 중인 요청 헤더:", {
      Authorization: formattedToken,
      "Content-Type": "application/json",
    });

    console.log("📌 보내는 데이터 확인:", requestBody);

    const response = await axios.put("https://api.gyeotae.site/caregiver/profile", requestBody, {
      headers: {
        Authorization: formattedToken, // ✅ 중복 방지
        "Content-Type": "application/json",
      },
    });

    console.log("✅ 요양보호사 정보 수정 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("🚨 요양보호사 정보 수정 실패:", error.response?.data || error.message);
    return null;
  }
};
