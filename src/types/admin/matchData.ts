interface CareGiver {
  username: string;
  contact: string;
  car: boolean;
  education: boolean;
  img: string;
  intro: string;
  address: string;
  employmentStatus: boolean;
  certificateResponseDTOList: {
    certNum: string;
    certType: string;
    certRate: string;
  }[];
  experienceResponseDTOList: {
    duration: number;
    title: string;
    description: string;
  }[];
}

interface Elder {
  careId: number | null;
  elderId: number;
  name: string;
  centerName: string | null;
  gender: number;
  birth: string;
  inmateTypes: string[];
  rate: string;
  img: string;
  weight: number;
  hasShortTermMemoryLoss: boolean;
  wandersOutside: boolean;
  actsLikeChild: boolean;
  hasDelusions: boolean;
  hasAggressiveBehavior: boolean;
  temporarySave: boolean;
  normal: boolean;
}

interface JobCond {
  jobConditionId: number;
  flexibleSchedule: boolean;
  desiredHourlyWage: number;
  selfFeeding: boolean;
  mealPreparation: boolean;
  cookingAssistance: boolean;
  enteralNutritionSupport: boolean;
  selfToileting: boolean;
  occasionalToiletingAssist: boolean;
  diaperCare: boolean;
  catheterOrStomaCare: boolean;
  independentMobility: boolean;
  mobilityAssist: boolean;
  wheelchairAssist: boolean;
  immobile: boolean;
  cleaningLaundryAssist: boolean;
  bathingAssist: boolean;
  hospitalAccompaniment: boolean;
  exerciseSupport: boolean;
  emotionalSupport: boolean;
  cognitiveStimulation: boolean;
  dayOfWeek: string;
  startTime: number;
  endTime: number;
  locationRequestDtoList: {
    workLocationId: number;
    locationName: string;
  }[];
}

interface RecruitCond {
  address: string | null;
  bathingAssist: boolean;
  caretypes: (
    | "방문요양"
    | "요양원"
    | "입주요양"
    | "병원"
    | "방문목욕"
    | "병원동행"
    | "주야간보호"
  )[];
  catheterOrStomaCare: boolean;
  cleaningLaundryAssist: boolean;
  cognitiveStimulation: boolean;
  cookingAssistance: boolean;
  dailyLivingAssistance: boolean;
  desiredHourlyWage: number;
  detailRequiredService: string;
  diaperCare: boolean;
  elderId: number;
  emotionalSupport: boolean;
  enteralNutritionSupport: boolean;
  exerciseSupport: boolean;
  flexibleSchedule: boolean;
  hospitalAccompaniment: boolean;
  immobile: boolean;
  independentMobility: boolean;
  mealAssistance: boolean;
  mealPreparation: boolean;
  moveAssistance: boolean;
  mobilityAssist: boolean;
  occasionalToiletingAssist: boolean;
  recruitConditionId: number;
  recruitLocation: number;
  recruitTimes: {
    dayofweek: string;
    starttime: number;
    endtime: number;
  }[];
  selfFeeding: boolean;
  selfToileting: boolean;
  toiletAssistance: boolean;
  wheelchairAssist: boolean;
}

interface MatchInfoResponse {
  status: string;
  message: string;
  data: {
    adminContact: string;
    careGiverInfo: CareGiver;
    elderInfoDto: Elder;
    jobCondRes: JobCond;
    recruitCondRes: RecruitCond;
  };
}

interface RecommendedCareGiver {
  jobConditionId: number;
  score: number;
  imgUrl: string;
  caregiverName: string;
  matchStatus: string;
}

interface RecommendListResponse {
  status: string;
  message: string;
  data: {
    list: RecommendedCareGiver[];
  };
}

interface RequestResponse {
  status: string;
  message: string;
  data: {
    msg: string;
  };
}

interface DecideResponse {
  status: string;
  message: string;
  data: {
    msg: string;
  } | null;
}

export type {
  MatchInfoResponse,
  RecommendListResponse,
  RequestResponse,
  DecideResponse,
  RecruitCond,
};
