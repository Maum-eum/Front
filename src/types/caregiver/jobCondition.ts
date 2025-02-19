export interface JobConditionRequest {
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
    locationRequestDTOList: { locationId: number }[];
  }
  
  export interface JobConditionResponse {
    status: "success" | "fail";
    message: string;
    data: {
      jobConditionId: number;
      createAt: string;
    } | null;
  }
  