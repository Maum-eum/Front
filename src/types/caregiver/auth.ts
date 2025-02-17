export interface SignUpParams {
    username: string;
    password: string;
    name: string;
    contact: string;
    car: boolean;
    education: boolean;
    intro: string;
    address: string;
    employmentStatus: boolean;
    certificateRequestDTOList: { certNum: string; certType: string; certRate: string }[];
    experienceRequestDTOList: { duration: number; title: string; description: string }[];
    profileImg: File | null;
  }
  
  export interface SignUpResponse {
    status: string;
    message: string;
    data: {
      caregiverId: number;
      createAt: string;
    } | null;
  }
  