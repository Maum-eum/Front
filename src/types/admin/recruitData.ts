
interface Caretype {
	caretype : string;
}

interface RecruitTime {
	dayofweek : string;
	starttime : number;
	endtime : number;
}

interface RecruitData {
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
    detailRequiredService : string;
    recruitTimes: RecruitTime[];
}

interface Response {
    status : string;
    message : string;
    data :
    {
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
        detailRequiredService : string;
        recruitTimes: RecruitTime[];
    } | null;
}

export type { Response, RecruitData };
