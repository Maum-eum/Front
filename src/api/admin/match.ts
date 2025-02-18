import { AxiosResponse } from 'axios';
import { privateApi } from '../../utils/http-commons';
import type { MatchInfoResponse } from "../../types/admin/matchData";

export const matchInfoApi = async (
	jobConditionId : number,
	recruitConditionId : number,
): Promise<MatchInfoResponse | null> => {
	try {
		const response: AxiosResponse<MatchInfoResponse> = await privateApi.post(
		`/match/recommends/${jobConditionId}/${recruitConditionId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error get match info', error);
		return null;
	}
};

export const RecommendedListApi = async (
	recruitConditionId : number,
): Promise<MatchInfoResponse | null> => {
	try {
		const response: AxiosResponse<MatchInfoResponse> = await privateApi.get(
		`/match/${recruitConditionId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error get recommended list', error);
		return null;
	}
};
