import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

import {
	quoterApiRequest,
	quoterApiRequestAllItems,
	buildQuoterFieldSelection,
	mapQuoterFields,
} from '../shared/GenericFunctions';

import { itemOperations, itemFields } from './descriptions/ItemDescription';
import { quoteOperations, quoteFields } from './descriptions/QuoteDescription';
import { customerOperations, customerFields } from './descriptions/CustomerDescription';
import { templateOperations, templateFields } from './descriptions/TemplateDescription';

export class ScalePadQuoter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ScalePad Quoter',
		name: 'scalePadQuoter',
		icon: 'file:quoter.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ScalePad Quoter API for quote management',
		defaults: {
			name: 'ScalePad Quoter',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'scalePadQuoterOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.quoter.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Quote',
						value: 'quote',
					},
					{
						name: 'Template',
						value: 'template',
					},
				],
				default: 'item',
			},
			...itemOperations,
			...itemFields,
			...quoteOperations,
			...quoteFields,
			...customerOperations,
			...customerFields,
			...templateOperations,
			...templateFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				// Item resource
				if (resource === 'item') {
					if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const responseData = await quoterApiRequest.call(this, 'GET', `/items/${itemId}`);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const options = this.getNodeParameter('options', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						}

						if (options.fields) {
							const fields = (options.fields as string).split(',').map((f) => f.trim());
							qs.fields = buildQuoterFieldSelection(fields);
						}

						let responseData;
						if (returnAll) {
							responseData = await quoterApiRequestAllItems.call(this, 'GET', '/items', {}, qs);
						} else {
							const response = await quoterApiRequest.call(this, 'GET', '/items', {}, qs);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
							type,
							...additionalFields,
						};

						const responseData = await quoterApiRequest.call(this, 'POST', '/items', body);
						returnData.push({ json: responseData });
					}

					if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						// Map camelCase fields to API format
						const body = mapQuoterFields(updateFields, 'item');

						const responseData = await quoterApiRequest.call(
							this,
							'PATCH',
							`/items/${itemId}`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await quoterApiRequest.call(this, 'DELETE', `/items/${itemId}`);
						returnData.push({ json: { success: true, id: itemId } });
					}
				}

				// Quote resource
				if (resource === 'quote') {
					if (operation === 'get') {
						const quoteId = this.getNodeParameter('quoteId', i) as string;
						const responseData = await quoterApiRequest.call(this, 'GET', `/quotes/${quoteId}`);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const options = this.getNodeParameter('options', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						}

						if (options.fields) {
							const fields = (options.fields as string).split(',').map((f) => f.trim());
							qs.fields = buildQuoterFieldSelection(fields);
						}

						let responseData;
						if (returnAll) {
							responseData = await quoterApiRequestAllItems.call(this, 'GET', '/quotes', {}, qs);
						} else {
							const response = await quoterApiRequest.call(this, 'GET', '/quotes', {}, qs);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'create') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const quoteName = this.getNodeParameter('quoteName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							customer_id: customerId,
							name: quoteName,
							...additionalFields,
						};

						const responseData = await quoterApiRequest.call(this, 'POST', '/quotes', body);
						returnData.push({ json: responseData });
					}

					if (operation === 'update') {
						const quoteId = this.getNodeParameter('quoteId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						// Map camelCase fields to API format (quoteName -> name, etc.)
						const body = mapQuoterFields(updateFields, 'quote');

						const responseData = await quoterApiRequest.call(
							this,
							'PATCH',
							`/quotes/${quoteId}`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const quoteId = this.getNodeParameter('quoteId', i) as string;
						await quoterApiRequest.call(this, 'DELETE', `/quotes/${quoteId}`);
						returnData.push({ json: { success: true, id: quoteId } });
					}
				}

				// Customer resource
				if (resource === 'customer') {
					if (operation === 'get') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const responseData = await quoterApiRequest.call(
							this,
							'GET',
							`/customers/${customerId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						}

						let responseData;
						if (returnAll) {
							responseData = await quoterApiRequestAllItems.call(this, 'GET', '/customers', {}, qs);
						} else {
							const response = await quoterApiRequest.call(this, 'GET', '/customers', {}, qs);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
							...additionalFields,
						};

						const responseData = await quoterApiRequest.call(this, 'POST', '/customers', body);
						returnData.push({ json: responseData });
					}

					if (operation === 'update') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						// Map camelCase fields to API format
						const body = mapQuoterFields(updateFields, 'customer');

						const responseData = await quoterApiRequest.call(
							this,
							'PATCH',
							`/customers/${customerId}`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						await quoterApiRequest.call(this, 'DELETE', `/customers/${customerId}`);
						returnData.push({ json: { success: true, id: customerId } });
					}
				}

				// Template resource
				if (resource === 'template') {
					if (operation === 'get') {
						const templateId = this.getNodeParameter('templateId', i) as string;
						const responseData = await quoterApiRequest.call(
							this,
							'GET',
							`/templates/${templateId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.limit = this.getNodeParameter('limit', i);
						}

						let responseData;
						if (returnAll) {
							responseData = await quoterApiRequestAllItems.call(this, 'GET', '/templates', {}, qs);
						} else {
							const response = await quoterApiRequest.call(this, 'GET', '/templates', {}, qs);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
