export interface elderInfo {
  name                   : string;
  inmateTypes            : string[];
  gender                 : number;
  birth                  : string;
  rate                   : string | null;
  weight                 : number | string;
  isNormal               : boolean;
  hasShortTermMemoryLoss : boolean;
  wandersOutside         : boolean;
  actsLikeChild          : boolean;
  hasDelusions           : boolean;
  hasAggressiveBehavior  : boolean;
  isTemporarySave        : boolean;
  img?                   : string;
}

export interface ServiceOption {
  label: string;
  name: string;
  value: boolean;
}

export interface elderService {
  // 방문요양, 요양원, 입주요양, 병원, 방문목욕, 병원동행, 주야간보호
  careTypes: string[];

  // 지역
  location_id:              number;

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
}

export interface ServiceTime {
  dayOfWeek: string;
  startTime: string;
  endTime:   string;
}

export interface AddElderParams {
  centerId: number;
  data: FormData;
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