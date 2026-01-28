import { IDataObject } from 'n8n-workflow';

export interface IScalePadError {
	key?: string;
	title?: string;
	detail?: string;
	status?: number;
	message?: string;
}

export interface IScalePadCoreResponse {
	data: IDataObject[];
	meta?: {
		pagination?: {
			cursor?: string;
			total?: number;
			count?: number;
		};
	};
}

export type SortOrder = 'ASC' | 'DESC';

export interface IPaginationOptions {
	limit?: number;
	offset?: number;
	cursor?: string;
}

export interface IFilterOptions {
	[key: string]: string;
}

export interface ISortOptions {
	field: string;
	direction: SortOrder;
}
