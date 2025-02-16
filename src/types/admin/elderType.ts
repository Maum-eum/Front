export interface elderInfo {
  name       : string,
  centerName : string,
  gender     : number,
  birth      : string,
  rate       : string,
  imgUrl     : string,
  weight     : number | string,
}

export interface AddElderParams {
  centerId: number,
  data: elderInfo
}

export interface AddElderResponse {
  elderId : number;
  name    : string;
  gender  : number;
}