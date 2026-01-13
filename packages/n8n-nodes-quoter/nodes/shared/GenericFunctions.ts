import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	NodeApiError,
	NodeOperationError,
	JsonObject,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';

import { IQuoterErrorResponse } from './types';

/**
 * Make an authenticated API request to Quoter API
 */
export async function quoterApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const baseUrl = 'https://api.quoter.com/v1';

	const options: IRequestOptions = {
		method,
		body,
		qs,
		uri: `${baseUrl}${endpoint}`,
		json: true,
	};

	try {
		return await this.helpers.requestWithAuthentication.call(
			this,
			'scalePadQuoterOAuth2Api',
			options,
		);
	} catch (error: any) {
		// Handle Quoter-specific error format
		if (error.error && error.error.errors) {
			const quoterError = error.error as IQuoterErrorResponse;
			const errorDetails = quoterError.errors[0];

			if (errorDetails) {
				throw new NodeApiError(this.getNode(), error as JsonObject, {
					message: errorDetails.title || 'Quoter API Error',
					description: `${errorDetails.detail || errorDetails.message || 'An error occurred'}${
						errorDetails.key ? ` (${errorDetails.key})` : ''
					}`,
				});
			}
		}

		// Handle rate limiting
		if (error.statusCode === 429) {
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: 'Rate limit exceeded. Quoter API allows 5 requests per second.',
				description: 'Please reduce request frequency or implement delays between operations.',
			});
		}

		// Handle authentication errors
		if (error.statusCode === 401) {
			const errorMessage =
				error.error?.errors?.[0]?.key === 'ERR_AUTHORIZATION_TOKEN_INVALID'
					? 'OAuth token expired or invalid. Please reconnect your credentials.'
					: 'Authentication failed. Please check your OAuth credentials.';

			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: errorMessage,
				description: 'Access tokens are valid for 1 hour. You may need to reconnect.',
			});
		}

		// Handle pagination errors
		if (error.statusCode === 400 && error.message?.includes('Pagination page')) {
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: 'Pagination error.',
				description: 'The requested page number is too high or invalid.',
			});
		}

		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an authenticated API request to Quoter API with automatic pagination
 */
export async function quoterApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: IDataObject[] = [];
	let page = 1;
	let hasMore = true;

	// Set default limit if not specified
	if (!qs.limit) {
		qs.limit = 100; // Maximum allowed by API
	}

	while (hasMore) {
		qs.page = page;

		const response = await quoterApiRequest.call(this, method, endpoint, body, qs);

		if (response.data && Array.isArray(response.data)) {
			returnData.push(...response.data);
		}

		// Check if there are more pages
		hasMore = response.has_more === true;
		page++;

		// Safety check to prevent infinite loops
		if (returnData.length > 10000) {
			throw new NodeOperationError(
				this.getNode(),
				'Too many results returned. Please use filters or limit to reduce the results.',
			);
		}
	}

	return returnData;
}

/**
 * Validate and sanitize field selection for Quoter API
 */
export function buildQuoterFieldSelection(fields: string[]): string {
	return fields.filter((f) => f.trim()).join(',');
}
