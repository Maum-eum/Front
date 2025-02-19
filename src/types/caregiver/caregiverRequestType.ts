import { CareTypes, MatchStatus, Rate, Sexual, Week } from "./stringType";

/* 요양보호사 근무 요청 응답 */
export interface RecruitRequest {
  matchId: number;
  status: RecruitStatus;
}

/* 요양보호사 일정 리스트 조회 */
export interface MatchedListResponse {
  list: MatchedStatus[];
}

export interface MatchedStatus {
  elderId: number;
  elderName: string;
  recruitConditionId: number;
  centerId: number;
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
  list: WorkRequest[];
}
export interface WorkRequest {
  elderId: number;
  MatchStatus: MatchStatus;
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
