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
	status : boolean;
	message : string;
	data : Sido[];
}

interface SigunguResponse {
	status : boolean;
	message : string;
	data : Sigungu[];
}

interface LocationResponse {
	status : boolean;
	message : string;
	data : Location[];
}

interface AddressResponse {
	status : boolean;
	message : string;
	data : Address;
}

export type { SidoResponse, SigunguResponse, LocationResponse, AddressResponse, Sido, Sigungu, Location, Address };
