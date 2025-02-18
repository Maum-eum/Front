import { AxiosResponse } from 'axios';
import { privateApi } from '../../utils/http-commons';
import type { RequiredData, Response } from "../../types/admin/requiredData";

export const requiredRegisterApi = async (
	centerId : number,
	elderId : number,
	requiredData : RequiredData
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.post(
		`/admin/${centerId}/care/${elderId}`,
		requiredData
		);
		return response.data;
	} catch (error) {
		console.error('Error required register', error);
		return null;
	}
};

export const requiredInfoApi = async (
	centerId : number,
	elderId : number,
	careId : number
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.get(
		`/admin/${centerId}/care/${elderId}/${careId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error get required info', error);
		return null;
	}
};

export const requiredModifyApi = async (
	centerId : number,
	elderId : number,
	careId : number,
	requiredData : RequiredData
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.put(
		`/admin/${centerId}/care/${elderId}/${careId}`,
		requiredData
		);
		return response.data;
	} catch (error) {
		console.error('Error required modify', error);
		return null;
	}
};

export const requiredDeleteApi = async (
	centerId : number,
	elderId : number,
	careId : number,
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.delete(
		`/admin/${centerId}/care/${elderId}/${careId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error required delete', error);
		return null;
	}
};
