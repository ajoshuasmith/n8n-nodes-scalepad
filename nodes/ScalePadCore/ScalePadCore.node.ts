import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

import {
	scalePadCoreApiRequest,
	scalePadCoreApiRequestAllItems,
	buildCoreApiSort,
} from '../shared/GenericFunctions';

import { clientOperations, clientFields } from './descriptions/ClientDescription';
import { contactOperations, contactFields } from './descriptions/ContactDescription';
import { contractOperations, contractFields } from './descriptions/ContractDescription';
import {
	hardwareAssetOperations,
	hardwareAssetFields,
} from './descriptions/HardwareAssetDescription';
import { memberOperations, memberFields } from './descriptions/MemberDescription';
import { opportunityOperations, opportunityFields } from './descriptions/OpportunityDescription';
import { saasOperations, saasFields } from './descriptions/SaasDescription';
import { ticketOperations, ticketFields } from './descriptions/TicketDescription';

export class ScalePadCore implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ScalePad Core',
		name: 'scalePadCore',
		icon: 'file:scalepad.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ScalePad Core API and Lifecycle Manager',
		defaults: {
			name: 'ScalePad Core',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'scalePadCoreApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.scalepad.com',
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
						name: 'Client',
						value: 'client',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Contract',
						value: 'contract',
					},
					{
						name: 'Hardware Asset',
						value: 'hardwareAsset',
					},
					{
						name: 'Member',
						value: 'member',
					},
					{
						name: 'Opportunity',
						value: 'opportunity',
					},
					{
						name: 'SaaS',
						value: 'saas',
					},
					{
						name: 'Ticket',
						value: 'ticket',
					},
				],
				default: 'client',
			},
			...clientOperations,
			...clientFields,
			...contactOperations,
			...contactFields,
			...contractOperations,
			...contractFields,
			...hardwareAssetOperations,
			...hardwareAssetFields,
			...memberOperations,
			...memberFields,
			...opportunityOperations,
			...opportunityFields,
			...saasOperations,
			...saasFields,
			...ticketOperations,
			...ticketFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'client') {
					if (operation === 'get') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`/core/v1/clients/${clientId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						// Handle filters
						if (additionalFields.filter) {
							const filterData = additionalFields.filter as IDataObject;
							if (filterData.filters && Array.isArray(filterData.filters)) {
								for (const filter of filterData.filters) {
									const field = (filter as IDataObject).field as string;
									const operator = (filter as IDataObject).operator as string;
									const value = (filter as IDataObject).value;
									qs[`filter[${field}]`] = `${operator}:${value}`;
								}
							}
						}

						// Handle sorting
						if (additionalFields.sort) {
							const sortData = additionalFields.sort as IDataObject;
							if (sortData.sortFields) {
								const sortFields = sortData.sortFields as IDataObject;
								const field = sortFields.field as string;
								const direction = sortFields.direction as 'ASC' | 'DESC';
								qs.sort = buildCoreApiSort(field, direction);
							}
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								'/core/v1/clients',
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								'/core/v1/clients',
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}
				}

				if (resource === 'contact') {
					if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`/core/v1/contacts/${contactId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (additionalFields.clientId) {
							qs['filter[client_id]'] = `eq:${additionalFields.clientId}`;
						}

						if (additionalFields.email) {
							qs['filter[email]'] = `eq:${additionalFields.email}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								'/core/v1/contacts',
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								'/core/v1/contacts',
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}
				}

				if (resource === 'ticket') {
					if (operation === 'get') {
						const ticketId = this.getNodeParameter('ticketId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`/core/v1/service/tickets/${ticketId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (additionalFields.clientId) {
							qs['filter[client_id]'] = `eq:${additionalFields.clientId}`;
						}

						if (additionalFields.status) {
							qs['filter[status]'] = `eq:${additionalFields.status}`;
						}

						if (additionalFields.priority) {
							qs['filter[priority]'] = `eq:${additionalFields.priority}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								'/core/v1/service/tickets',
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								'/core/v1/service/tickets',
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}
				}

				// Resources using the shared resourceMap pattern
				const resourceMap: { [key: string]: string } = {
					contract: 'service/contracts',
					hardwareAsset: 'assets/hardware',
					member: 'members',
					opportunity: 'opportunities',
					saas: 'assets/saas',
				};

				if (Object.keys(resourceMap).includes(resource)) {
					const endpoint = resourceMap[resource];
					const idParamMap: { [key: string]: string } = {
						contract: 'contractId',
						hardwareAsset: 'assetId',
						member: 'memberId',
						opportunity: 'opportunityId',
						saas: 'saasId',
					};

					if (operation === 'get') {
						const id = this.getNodeParameter(idParamMap[resource], i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`/core/v1/${endpoint}/${id}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						// Apply common filters
						if (additionalFields.clientId) {
							qs['filter[client_id]'] = `eq:${additionalFields.clientId}`;
						}

						if (additionalFields.status) {
							qs['filter[status]'] = `eq:${additionalFields.status}`;
						}

						// Apply resource-specific filters
						if (resource === 'hardwareAsset' && additionalFields.assetType) {
							qs['filter[asset_type]'] = `eq:${additionalFields.assetType}`;
						}

						if (resource === 'member' && additionalFields.role) {
							qs['filter[role]'] = `eq:${additionalFields.role}`;
						}

						if (resource === 'opportunity' && additionalFields.stage) {
							qs['filter[stage]'] = `eq:${additionalFields.stage}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`/core/v1/${endpoint}`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`/core/v1/${endpoint}`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}
				}
			} catch (error: any) {
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
