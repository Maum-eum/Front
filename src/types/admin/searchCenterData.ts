export interface SearchCenterData {
  address: string;
  admins: [
    {
      adminId: number,
      createAt: string
    }
  ];
  elders: [
    {
      recruitConditionId: number,
      elderId: number,
      careType: string,
      flexibleSchedule: boolean,
      desiredHourlyWage: number,
      selfFeeding: boolean,
      mealPreparation: boolean,
      cookingAssistance: boolean,
      enteralNutritionSupport: boolean,
      selfToileting: boolean,
      occasionalToiletingAssist: boolean,
      diaperCare: boolean,
      catheterOrStomaCare: boolean,
      independentMobility: boolean,
      mobilityAssist: boolean,
      wheelchairAssist: boolean,
      immobile: boolean,
      cleaningLaundryAssist: boolean,
      bathingAssist: boolean,
      hospitalAccompaniment: boolean,
      exerciseSupport: boolean,
      emotionalSupport: boolean,
      cognitiveStimulation: boolean,
      recruitTimes: [
        {
          dayOfWeek: string,
          startTime: {
            hour: number,
            minute: number,
            second: number,
            nano: number
          },
          endTime: {
            hour: number,
            minute: number,
            second: number,
            nano: number
          }
        }
      ]
    }
  ];
  cenderId: number;
  centerName: string;
  hasBathCar: boolean;
  rate: string;
  intro: string|null;
  startTime: string;
  endTime: string;
}