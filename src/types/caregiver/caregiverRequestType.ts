import { CareTypes, Rate, Sexual, Week } from "./stringType";

/* 요양보호사 근무 요청 응답 */
export interface RecruitRequest {
  matchId: number;
  recruitStatus: RecruitRequest;
}

/* 요양보호사 매칭 현황 리스트 조회 */
export interface MatchedListResponse {
  matchedRequests: MatchedStatus[];
}

export interface MatchedStatus {
  elderId: number;
  elderName: string;
  mealAssistance: boolean;
  toiletAssistance: boolean;
  moveAssistance: boolean;
  dailyLivingAssistance: boolean;
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
  times: WorkTimes[];
}

export interface WorkTimes {
  dayOfWeek: Week;
  startTime: number;
  endTime: number;
}

/* 요양보호사 근무 요청 리스트 조회 */
export interface RequestsListResponse {
  requests: WorkRequest[];
}
export interface WorkRequest {
  elderId: number;
  recruitConditionId: number;
  centerId: number;
  centerName: string;
  imgUrl: string | null;
  desiredHourlyWage: number;
  rate: Rate;
  age: number;
  sexual: Sexual;
  careTypes: CareTypes[];
}
