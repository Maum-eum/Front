import { AxiosResponse } from 'axios';
import { privateApi } from '../../utils/http-commons';
import type { MatchInfoResponse, RecommendListResponse, RequestResponse, DecideResponse } from "../../types/admin/matchData";

export const RecommendedListApi = async (
	recruitConditionId : number,
): Promise<RecommendListResponse | null> => {
	try {
		const response: AxiosResponse<RecommendListResponse> = await privateApi.get(
		`/match/${recruitConditionId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error get recommended list', error);
		return null;
	}
};

export const matchRequestApi = async (
	jobConditionId : number,
	recruitConditionId : number,
): Promise<RequestResponse | null> => {
	try {
		const response: AxiosResponse<RequestResponse> = await privateApi.post(
		`/recommends/${jobConditionId}/${recruitConditionId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error match request', error);
		return null;
	}
};

export const matchDecideApi = async (
	jobConditionId : number,
	recruitConditionId : number,
	status : number,
): Promise<DecideResponse | null> => {
	try {
		const response: AxiosResponse<DecideResponse> = await privateApi.put(
		`/recommends/${status}/${jobConditionId}/${recruitConditionId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error match request', error);
		return null;
	}
};

export const matchInfoApi = async (
	jobConditionId : number,
	recruitConditionId : number,
): Promise<MatchInfoResponse | null> => {
	try {
		const response: AxiosResponse<MatchInfoResponse> = await privateApi.get(
		`/match/recommends/${jobConditionId}/${recruitConditionId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error get match info', error);
		return null;
	}
};
