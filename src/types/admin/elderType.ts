export interface elderInfo {
  elderId                : number;
  name                   : string;
  inmateTypes            : string[];
  gender                 : number;
  birth                  : string;
  rate                   : string;
  weight                 : number | string;
  normal                 : boolean;
  hasShortTermMemoryLoss : boolean;
  wandersOutside         : boolean;
  actsLikeChild          : boolean;
  hasDelusions           : boolean;
  hasAggressiveBehavior  : boolean;
  temporarySave          : boolean;
  img?                   : string;
}

export interface ServiceOption {
  label: string;
  name: string;
  value: boolean;
}

export interface elderService {
  address:                   string;
  recruitConditionId:        number;
  elderId:                   number;
  careTypes:                 string[];

  // 지역
  recruitLocation :           number;

  selfFeeding:               boolean; //스스로식사가능
  mealPreparation:           boolean; //식사준비
  mealAssistance :           boolean; //식사보조(구토물정리)
  enteralNutritionSupport:   boolean; //경관식보조
  
  selfToileting:             boolean; //자기 배변 가능
  toiletAssistance :         boolean; //화장실 이용 보조
  occasionalToiletingAssist: boolean; //간헐적 배변 보조
  diaperCare:                boolean; //기저귀 케어
  catheterOrStomaCare:       boolean; //카테터·장루 케어

  independentMobility:       boolean; //자기 이동 가능
  moveAssistance :           boolean; //이동 보조(침대->휠체어 등 )
  mobilityAssist:            boolean; //이동 지원(부축)
  wheelchairAssist:          boolean; //휠체어 보조
  immobile:                  boolean; //거동불가

  dailyLivingAssistance :    boolean; //일상생활 보조
  cookingAssistance:         boolean; //요리 보조
  cleaningLaundryAssist:     boolean; //청소·세탁 지원
  bathingAssist:             boolean; //목욕 보조
  hospitalAccompaniment:     boolean; //병원 동행
  exerciseSupport:           boolean; //운동 지원
  emotionalSupport:          boolean; //정서적 지원
  cognitiveStimulation:      boolean; //인지 자극 활동

  desiredHourlyWage:         number;  //희망 시급
  flexibleSchedule:          boolean; //유연한 일정 가능


  recruitTimes: ServiceTime[];        // 요일별 모집 시간

  detailRequiredService:     string;  // 세부 요구 서비스 설명
}

export interface ServiceTime {
  dayOfWeek: string;
  startTime: number;
  endTime:   number;
}

export interface AddElderParams {
  centerId: number;
  data: FormData;
}

export interface ModifyElderParams extends AddElderParams{
  elderId: number;
}

export interface AddElderServiceParams {
  centerId: number;
  elderId: number;
  data: elderService;
}

export interface AddElderResponse {
  elderId : number;
  name    : string;
  gender  : number;
}

export interface RecommendedCareGiver {
	jobConditionId : number;
	score : number;
	imgUrl : string;
	caregiverName : string;
	matchStatus : string;
}

export interface RecommendedList {
  list: RecommendedCareGiver[]
}

export interface MatchInfo {
  matchId: number;
  careGiverInfoDto: {
    useranme: string;
    img: string;
    careGiverId: number;
  },
  elderInfoDto: {
    name: string;
    imgUrl: string;
    elderId: number;
  },
  status: string,
  requirementCondition: elderService,
  jobCondition: {
    jobConditionId: number,
    flexibleSchedule: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    desiredHourlyWage: number;
    selfFeeding: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    mealPreparation: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    cookingAssistance: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    enteralNutritionSupport: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    selfToileting: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    occasionalToiletingAssist: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    diaperCare: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    catheterOrStomaCare: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    independentMobility: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    mobilityAssist: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    wheelchairAssist: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    immobile: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    cleaningLaundryAssist: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    bathingAssist: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    hospitalAccompaniment: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    exerciseSupport: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    emotionalSupport: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    cognitiveStimulation: "POSSIBLE" | "NEGOTIABLE" | "IMPOSSIBLE";
    dayOfWeek: string; // "1001010" 형식 (월~일 순서)
    startTime: number;
    endTime: number;
    locationResponseDTOList: [
      {
        workLocationId: 0,
        locationName: "string"
      }
    ]
  },
  deletedAt: string,
  version: number
}