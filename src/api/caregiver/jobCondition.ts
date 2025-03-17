import axios from "axios";
import { useUserStore } from "../../stores/userStore";
import type { JobConditionRequest } from "../../types/caregiver/jobCondition";

const API_URL = "https://api.gyeotae.site/caregiver/jobcondition"; // ✅ API 기본 URL 수정

// ✅ 토큰 가져오는 함수 (중복 방지)
const getAuthToken = () => {
  const token = useUserStore.getState().accessToken;
  if (!token) {
    console.error("❌ [오류] 토큰이 존재하지 않습니다!");
    throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
  }
  return token.startsWith("Bearer ") ? token : `Bearer ${token}`; // ✅ `Bearer ` 붙이기
};

export const registerJobCondition = async (data: JobConditionRequest) => {
  try {
    const token = getAuthToken(); // ✅ `useUserStore`에서 토큰 가져오기

    console.log("🟢 [API 요청] POST:", API_URL);
    console.log("🟢 [요청 데이터]:", JSON.stringify(data, null, 2));
    console.log("🟢 [요청 헤더] Authorization:", token);

    const response = await axios.post(`${API_URL}`, data, { // ✅ 엔드포인트 수정
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    console.log("🟢 [서버 응답] response.data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ [구직 조건 등록 실패]:", error);
    if (error.response) {
      console.error("🟠 [서버 응답 코드]:", error.response.status);
      console.error("🟠 [서버 응답 데이터]:", JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
};

export const updateJobCondition = async (jobConditionData: JobConditionRequest) => {
  try {
    // ✅ 근무 지역이 없을 경우 경고 메시지 띄우기
    if (!jobConditionData.locationRequestDTOList || jobConditionData.locationRequestDTOList.length === 0) {
      alert("근무 지역을 선택해주세요!");
      throw new Error("❌ [업데이트 실패] 근무 지역이 선택되지 않음.");
    }

    const token = getAuthToken(); // ✅ `useUserStore`에서 토큰 가져오기

    console.log("🟢 [API 요청] PUT:", API_URL);
    console.log("🟢 [요청 데이터]:", JSON.stringify(jobConditionData, null, 2));
    console.log("🟢 [요청 헤더] Authorization:", token);

    const response = await axios.put(`${API_URL}`, jobConditionData, { // ✅ 엔드포인트 수정
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    console.log("🟢 [서버 응답] response.data:", response.data);

    // ✅ 최신 데이터를 다시 불러와 상태 갱신
    await getJobCondition();

    return response.data;
  } catch (error: any) {
    console.error("❌ [근무 조건 수정 실패]:", error);
    if (error.response) {
      console.error("🟠 [서버 응답 코드]:", error.response.status);
      console.error("🟠 [서버 응답 데이터]:", JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
};

export const getJobCondition = async () => {
  try {
    const token = getAuthToken(); // ✅ 토큰 가져오기

    console.log("📌 [API 요청 보내는 중] GET:", API_URL);
    console.log("📌 [요청 헤더] Authorization:", token);

    const response = await axios.get(`${API_URL}`, { // ✅ 엔드포인트 수정
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    });

    console.log("🟢 [근무 조건 조회 성공] response.data:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("❌ [근무 조건 조회 실패]:", error);
    if (error.response) {
      console.error("🟠 [서버 응답 코드]:", error.response.status);
      console.error("🟠 [서버 응답 데이터]:", JSON.stringify(error.response.data, null, 2));
    }
    return null;
  }
};
