
interface SidoList {
	result : Sido[];
}

interface SigunguList {
	result : Sigungu[];
}

interface LocationList {
	result : Location[];
}

interface Sido {
	sidoId : number;
	sidoName : string;
}

interface Sigungu {
	sigunguId : number;
	sigunguName : string;
}

interface Location {
	locationId : number;
	dongName : string;
	sidoName : string;
	sigunguName : string;
	address : string;
}

interface Address {
	address : string;
}

interface SidoResponse {
	isSuccess : boolean;
	code : string;
	message : string;
	result : SidoList;
}

interface SigunguResponse {
	isSuccess : boolean;
	code : string;
	message : string;
	result : SigunguList;
}

interface LocationResponse {
	isSuccess : boolean;
	code : string;
	message : string;
	result : LocationList;
}

interface AddressResponse {
	isSuccess : boolean;
	code : string;
	message : string;
	result : Address;
}

export type { SidoResponse, SigunguResponse, LocationResponse, AddressResponse, SidoList, SigunguList, LocationList, Address };
