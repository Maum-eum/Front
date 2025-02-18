export type JobConditionRequest = {
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
    dayOfWeek: string; // "1001010" (월~일)
    startTime: number;
    endTime: number;
    locationRequestDTOList: { locationId: number }[];
  };
  
  export type JobConditionResponse = {
    status: string;
    message: string;
    data: {
      jobConditionId: number;
      flexibleSchedule: string;
      desiredHourlyWage: number;
      dayOfWeek: string;
      startTime: number;
      endTime: number;
      locationRequestDtoList: { workLocationId: number; locationName: string }[];
    };
  };
  