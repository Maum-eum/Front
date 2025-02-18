import { AxiosResponse } from 'axios';
import { noneApi } from '../../utils/http-commons';
import type { SidoResponse, SigunguResponse, LocationResponse, AddressResponse } from '../../types/commons/regionData';

export const sidoInfoApi = async (): Promise<SidoResponse | null> => {
	try {
	const response: AxiosResponse<SidoResponse> = await noneApi.get(
		`/location/sidoList`,
	);
		return response.data;
	} catch (error) {
		console.error('Error get sido Info', error);
		return null;
	}
};

export const sigunguInfoApi = async (sidoId : number): Promise<SigunguResponse | null> => {
	try {
		const response: AxiosResponse<SigunguResponse> = await noneApi.get(
		`/location/sigunguList`,
		{
			params: {
				sidoId: sidoId,
			}
		},
		);
		return response.data;
	} catch (error) {
		console.error('Error get sigungu Info', error);
		return null;
	}
	};

export const locationInfoApi = async (sigunguId : number): Promise<LocationResponse | null> => {
	try {
		const response: AxiosResponse<LocationResponse> = await noneApi.get(
			`/location/locationList`,
			{
				params: {
					sigunguId: sigunguId,
				}
			},
			);
		return response.data;
	} catch (error) {
		console.error('Error get location Info', error);
		return null;
	}
};


export const addressInfoApi = async (locationId : number): Promise<AddressResponse | null> => {
	try {
		const response: AxiosResponse<AddressResponse> = await noneApi.get(
			`/location/address`,
			{
				params: {
					locationId: locationId,
				}
			},
			);
		return response.data;
	} catch (error) {
		console.error('Error get address Info', error);
		return null;
	}
};
