import axios from "axios";

export const getCaregiverProfile = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("🚨 토큰이 없습니다. 로그인을 먼저 해주세요.");
            return null;
        }

        // ✅ Bearer 접두사 확인 및 추가
        const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

        // ✅ 캐시 방지 헤더 추가
        const response = await axios.get("https://api.gyeotae.site/caregiver/profile", {
            headers: {
                Authorization: authToken,
                "Cache-Control": "no-cache, no-store, must-revalidate", // 🔥 브라우저 캐시 방지
                Pragma: "no-cache", // 🔥 HTTP 1.0 캐시 방지
                Expires: "0", // 🔥 프록시 서버 캐시 방지
            },
        });

        console.log("✅ 요양보호사 정보 조회 성공:", response.data);
        
        // ✅ 최신 프로필 데이터를 로컬 스토리지에도 저장 (자동 로그인 시 반영)
        localStorage.setItem("caregiverProfile", JSON.stringify(response.data.data));

        return response.data.data;
    } catch (error: any) {
        console.error("🚨 요양보호사 정보 조회 실패:", error.response?.data || error.message);
        return null;
    }
};
