import axios from "axios";
import type { JobConditionRequest } from "../../types/caregiver/jobCondition";

const API_URL = "https://api.gyeotae.site/caregiver/jobcondition";

export const registerJobCondition = async (data: JobConditionRequest) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("❌ [오류] 토큰이 존재하지 않습니다!");
      throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
    }

    console.log("🟢 [API 요청] POST:", API_URL);
    console.log("🟢 [요청 데이터]:", JSON.stringify(data, null, 2));
    console.log("🟢 [요청 헤더] Authorization:", `Bearer ${token}`);

    const response = await axios.post(API_URL, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔥 최신 토큰 사용
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
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("❌ [오류] 토큰이 존재하지 않습니다!");
      throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
    }

    console.log("🟢 [API 요청] PUT:", API_URL);
    console.log("🟢 [요청 데이터]:", JSON.stringify(jobConditionData, null, 2));
    console.log("🟢 [요청 헤더] Authorization:", `Bearer ${token}`);

    const response = await axios.put(API_URL, jobConditionData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const response = await axios.get(API_URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    console.log("🟢 [근무 조건 조회 성공] response.data:", response.data);

    return response.data.data; // `data` 내부에 `dayOfWeek`가 포함되는지 확인
  } catch (error) {
    console.error("❌ [근무 조건 조회 실패]:", error);
    return null;
  }
};
