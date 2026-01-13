import { IDataObject } from 'n8n-workflow';

export interface IQuoterError {
	key?: string;
	title?: string;
	detail?: string;
	status?: number;
	message?: string;
}

export interface IQuoterResponse {
	data: IDataObject[];
	has_more?: boolean;
}

export interface IQuoterErrorResponse {
	errors: IQuoterError[];
}

export interface IPaginationOptions {
	limit?: number;
	page?: number;
}
