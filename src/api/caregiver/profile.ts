import axios from "axios";

export const getCaregiverProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("🚨 토큰이 없습니다. 로그인을 먼저 해주세요.");
        return null; // 토큰이 없으면 요청을 보내지 않음
      }

      // Bearer 접두사 체크 (이미 있다면 그대로, 없으면 추가)
      const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const response = await axios.get("https://api.gyeotae.site/caregiver/profile", {
        headers: {
          Authorization: authToken,
        },
      });

      console.log("✅ 요양보호사 정보 조회 성공:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error("🚨 요양보호사 정보 조회 실패:", error.response?.data || error.message);
      return null;
    }
};
