/* 요양보호사 자격증 정보 조회 */
export interface CaregiverCertificateResponse {
  certNum: string;
  certType: string;
  certRate: string;
}

/* 요양보호사 경력 정보 조회 */
export interface CaregiverExperienceResponse {
  duration: number;
  title: string;
  description: string;
}

/* 요양보호사 정보 조회 */
export interface CaregiverInfoResponseDTO {
  name: string;
  contact: string;
  car: boolean;
  education: boolean;
  img: string;
  intro: string;
  address: string;
  employmentStatus: boolean | null;
  certificateResponseDTOList: CaregiverCertificateResponse[];
  experienceResponseDTOList: CaregiverExperienceResponse[];
}
