import axios from "axios";
import { SignUpParams, SignUpResponse } from "../../types/caregiver/auth";


const API_BASE_URL = "https://api.gyeotae.site"; // 배포 서버 주소

export const signUpCaregiver = async (params: SignUpParams): Promise<SignUpResponse> => {
  try {
    const formData = new FormData();
    
    formData.append("data", JSON.stringify({
      username: params.username,
      password: params.password,
      name: params.name,
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

    const response = await axios.post<SignUpResponse>(`${API_BASE_URL}/caregiver/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw error;
  }
};
