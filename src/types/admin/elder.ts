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

  export interface AddElderParams {
    centerId: number;
    data: FormData;
  }
  
  export interface ModifyElderParams extends AddElderParams{
    elderId: number;
  }

  export interface AddElderResponse {
    elderId : number;
    name    : string;
    gender  : number;
  }