interface RequiredData {
	caretypes : string[];
	careLocation : number;
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
}

interface Response {
	status : string;
	message : string;
	data :
	{
		recruitConditionId : number;
		elderId : number;
		caretypes : string[];
		careLocation : number;
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
	} | null;
}

export type { Response, RequiredData };
