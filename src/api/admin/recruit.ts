import { AxiosResponse } from 'axios';
import { privateApi } from '../../utils/http-commons';
import type { RecruitData, Response } from "../../types/admin/recruitData";

export const recruitRegisterApi = async (
	centerId : number,
	elderId : number,
	recruitData : RecruitData
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.post(
		`/admin/${centerId}/recruit/${elderId}`,
		recruitData
		);
		return response.data;
	} catch (error) {
		console.error('Error recruit register', error);
		return null;
	}
};

export const recruitInfoApi = async (
	centerId : number,
	elderId : number,
	recruitId : number
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.get(
		`/admin/${centerId}/recruit/${elderId}/${recruitId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error get recruit info', error);
		return null;
	}
};

export const recruitModifyApi = async (
	centerId : number,
	elderId : number,
	recruitId : number,
	recruitData : RecruitData
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.put(
		`/admin/${centerId}/recruit/${elderId}/${recruitId}`,
		recruitData
		);
		return response.data;
	} catch (error) {
		console.error('Error recruit modify', error);
		return null;
	}
};

export const recruitDeleteApi = async (
	centerId : number,
	elderId : number,
	recruitId : number,
): Promise<Response | null> => {
	try {
		const response: AxiosResponse<Response> = await privateApi.delete(
		`/admin/${centerId}/recruit/${elderId}/${recruitId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error recruit delete', error);
		return null;
	}
};
