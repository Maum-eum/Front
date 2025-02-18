interface Certificate {
	certNum : string;
	certType : string;
	certRate : string;
}

interface Experience {
	duration : number;
	title : string;
	description : string;
}

interface CareGiver {
	name : string;
	contact : string;
	car : boolean;
	education : boolean;
	img : string;
	intro : string;
	address : string;
	employmentStatus : boolean;
	certificateResponseDTOList : Certificate[];
	experienceResponseDTOList : Experience[];
}

interface Elder {
	elderId : number;
	name : string;
	centerName : string;
	gender : number;
	birth : string;
	inmateTypes : string;
	rate : string;
	img : string;
	weight : number;
	hasShortTermMemoryLoss: boolean;
	wandersOutside: boolean;
	actsLikeChild: boolean;
	hasDelusions: boolean;
	hasAggressiveBehavior: boolean;
	temporarySave: boolean;
	normal: boolean;
}

interface Location {
	workLocationId : number;
	locationName : string;
}

interface JobCond {
	jobConditionId : number;
    flexibleSchedule : boolean;
	desiredHourlyWage : number;
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
	dayOfWeek : string;
	startTime : number;
	endTime : number;
	locationRequestDtoList : Location[];
}

interface Caretype {
	caretype : string;
}

interface RecruitTime {
	dayofweek : string;
	starttime : number;
	endtime : number;
}

interface RecruitCond {
	recruitConditionId : number;
	elderId : number;
	caretypes : Caretype[];
    locationId : number;
	mealAssistance : boolean;
    toiletAssistance : boolean;
    moveAssistance : boolean;
    dailyLivingAssistance : boolean;
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
    recruitTimes: RecruitTime[];
    detailRequiredService : string;
}

interface MatchInfoResponse {
	statue : string;
	message : string;
	data : {
		careGiverInfo : CareGiver;
		elderInfoDto : Elder;
		jobCondRes : JobCond;
		recruitCondRes : RecruitCond;
	}
}

interface RecommendedCareGiver {
	jobConditionId : number;
	score : number;
	imgUrl : string;
	caregiverName : string;
	matchStatus : string;
}

interface RecommendListResponse {
	statue : string;
	message : string;
	data : {
		list : RecommendedCareGiver[];
	}
}

export type { MatchInfoResponse, RecommendListResponse };
