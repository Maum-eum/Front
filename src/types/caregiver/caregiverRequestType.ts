/* 요양보호사 요청/조율 근무 조회 */
export interface CaregiverRequestInfo {
  elderId: number;
  name: string;
  centerName: string | null;
  gender: number;
  birth: string;
  inmateTypes: string[];
  rate: string;
  img: string | null;
  desiredHourlyWage: number;
}

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
export interface CaregiverInfo {
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

/* 일정 정보 조회 */
export interface SchedulesInfo {}
