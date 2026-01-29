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

// Core API descriptions
import { clientOperations, clientFields } from './descriptions/ClientDescription';
import { contactOperations, contactFields } from './descriptions/ContactDescription';
import {
	contractOperations as coreContractOperations,
	contractFields as coreContractFields,
} from './descriptions/ContractDescription';
import {
	hardwareAssetOperations,
	hardwareAssetFields,
} from './descriptions/HardwareAssetDescription';
import { memberOperations, memberFields } from './descriptions/MemberDescription';
import { opportunityOperations, opportunityFields } from './descriptions/OpportunityDescription';
import { saasOperations, saasFields } from './descriptions/SaasDescription';
import { ticketOperations, ticketFields } from './descriptions/TicketDescription';

// Lifecycle Manager API descriptions
import { meetingOperations, meetingFields } from './descriptions/MeetingDescription';
import { initiativeOperations, initiativeFields } from './descriptions/InitiativeDescription';
import { goalOperations, goalFields } from './descriptions/GoalDescription';
import { actionItemOperations, actionItemFields } from './descriptions/ActionItemDescription';
import { assessmentOperations, assessmentFields } from './descriptions/AssessmentDescription';
import { noteOperations, noteFields } from './descriptions/NoteDescription';
import {
	assessmentTemplateOperations,
	assessmentTemplateFields,
} from './descriptions/AssessmentTemplateDescription';
import {
	hardwareLifecycleOperations,
	hardwareLifecycleFields,
} from './descriptions/HardwareLifecycleDescription';
import {
	lmContractOperations,
	lmContractFields,
} from './descriptions/LmContractDescription';

export class ScalePadCore implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ScalePad',
		name: 'scalePadCore',
		icon: 'file:scalepad.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ScalePad Core API and Lifecycle Manager',
		defaults: {
			name: 'ScalePad',
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
					// Lifecycle Manager resources
					{
						name: 'Action Item',
						value: 'actionItem',
						description: 'Lifecycle Manager: Action items for clients',
					},
					{
						name: 'Assessment',
						value: 'assessment',
						description: 'Lifecycle Manager: Client assessments',
					},
					{
						name: 'Assessment Template',
						value: 'assessmentTemplate',
						description: 'Lifecycle Manager: Assessment templates',
					},
					// Core API resources
					{
						name: 'Client',
						value: 'client',
						description: 'Core API: Client records',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Core API: Contact records',
					},
					{
						name: 'Contract (Core)',
						value: 'contract',
						description: 'Core API: Service contracts',
					},
					{
						name: 'Contract (Lifecycle)',
						value: 'lmContract',
						description: 'Lifecycle Manager: Contracts',
					},
					{
						name: 'Goal',
						value: 'goal',
						description: 'Lifecycle Manager: Client goals',
					},
					{
						name: 'Hardware Asset',
						value: 'hardwareAsset',
						description: 'Core API: Hardware assets',
					},
					{
						name: 'Hardware Lifecycle',
						value: 'hardwareLifecycle',
						description: 'Lifecycle Manager: Hardware lifecycle records',
					},
					{
						name: 'Initiative',
						value: 'initiative',
						description: 'Lifecycle Manager: Client initiatives',
					},
					{
						name: 'Meeting',
						value: 'meeting',
						description: 'Lifecycle Manager: Client meetings',
					},
					{
						name: 'Member',
						value: 'member',
						description: 'Core API: Team members',
					},
					{
						name: 'Note',
						value: 'note',
						description: 'Lifecycle Manager: Client notes',
					},
					{
						name: 'Opportunity',
						value: 'opportunity',
						description: 'Core API: Sales opportunities',
					},
					{
						name: 'SaaS',
						value: 'saas',
						description: 'Core API: SaaS subscriptions',
					},
					{
						name: 'Ticket',
						value: 'ticket',
						description: 'Core API: Service tickets',
					},
				],
				default: 'client',
			},
			// Core API operations and fields
			...clientOperations,
			...clientFields,
			...contactOperations,
			...contactFields,
			...coreContractOperations,
			...coreContractFields,
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
			// Lifecycle Manager operations and fields
			...meetingOperations,
			...meetingFields,
			...initiativeOperations,
			...initiativeFields,
			...goalOperations,
			...goalFields,
			...actionItemOperations,
			...actionItemFields,
			...assessmentOperations,
			...assessmentFields,
			...noteOperations,
			...noteFields,
			...assessmentTemplateOperations,
			...assessmentTemplateFields,
			...hardwareLifecycleOperations,
			...hardwareLifecycleFields,
			...lmContractOperations,
			...lmContractFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		const lmBasePath = '/lifecycle-manager/v1';

		for (let i = 0; i < items.length; i++) {
			try {
				// ==================== CORE API: CLIENT ====================
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

				// ==================== CORE API: CONTACT ====================
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

				// ==================== CORE API: TICKET ====================
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

				// ==================== CORE API: SHARED RESOURCES ====================
				const coreResourceMap: { [key: string]: string } = {
					contract: 'service/contracts',
					hardwareAsset: 'assets/hardware',
					member: 'members',
					opportunity: 'opportunities',
					saas: 'assets/saas',
				};

				if (Object.keys(coreResourceMap).includes(resource)) {
					const endpoint = coreResourceMap[resource];
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

						if (additionalFields.clientId) {
							qs['filter[client_id]'] = `eq:${additionalFields.clientId}`;
						}

						if (additionalFields.status) {
							qs['filter[status]'] = `eq:${additionalFields.status}`;
						}

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

				// ==================== LIFECYCLE MANAGER: MEETING ====================
				if (resource === 'meeting') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const scheduledAt = this.getNodeParameter('scheduledAt', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							title,
							scheduled_at: scheduledAt,
							...additionalFields,
						};

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/meetings`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'get') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/meetings/${meetingId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}
						if (filters.isCompleted !== undefined) {
							qs['filter[is_completed]'] = `eq:${filters.isCompleted}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/meetings`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/meetings`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'update') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/meetings/${meetingId}`,
							updateFields,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/meetings/${meetingId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'updateCompletionStatus') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const isCompleted = this.getNodeParameter('isCompleted', i) as boolean;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/meetings/${meetingId}/completion-status`,
							{ is_completed: isCompleted },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'addUserAttendees') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const userIds = (this.getNodeParameter('userIds', i) as string)
							.split(',')
							.map((id) => id.trim());

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/meetings/${meetingId}/attendees/users`,
							{ user_ids: userIds },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'removeUserAttendees') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const userIds = (this.getNodeParameter('userIds', i) as string)
							.split(',')
							.map((id) => id.trim());

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/meetings/${meetingId}/attendees/users`,
							{ user_ids: userIds },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'addContactAttendees') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const contactIds = (this.getNodeParameter('contactIds', i) as string)
							.split(',')
							.map((id) => id.trim());

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/meetings/${meetingId}/attendees/contacts`,
							{ contact_ids: contactIds },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'removeContactAttendees') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const contactIds = (this.getNodeParameter('contactIds', i) as string)
							.split(',')
							.map((id) => id.trim());

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/meetings/${meetingId}/attendees/contacts`,
							{ contact_ids: contactIds },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'listInitiatives') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/meetings/${meetingId}/initiatives`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkInitiative') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/meetings/${meetingId}/initiatives/${initiativeId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkInitiative') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/meetings/${meetingId}/initiatives/${initiativeId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'listGoals') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/meetings/${meetingId}/goals`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkGoal') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const goalId = this.getNodeParameter('goalId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/meetings/${meetingId}/goals/${goalId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkGoal') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const goalId = this.getNodeParameter('goalId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/meetings/${meetingId}/goals/${goalId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'listActionItems') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/meetings/${meetingId}/action-items`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkActionItem') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/meetings/${meetingId}/action-items/${actionItemId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkActionItem') {
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/meetings/${meetingId}/action-items/${actionItemId}`,
						);
						returnData.push({ json: { success: true } });
					}
				}

				// ==================== LIFECYCLE MANAGER: INITIATIVE ====================
				if (resource === 'initiative') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							title,
							...additionalFields,
						};

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/initiatives`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'get') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/initiatives/${initiativeId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}
						if (filters.status) {
							qs['filter[status]'] = `eq:${filters.status}`;
						}
						if (filters.priority) {
							qs['filter[priority]'] = `eq:${filters.priority}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/initiatives`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/initiatives`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'update') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}`,
							updateFields,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/initiatives/${initiativeId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'updateStatus') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const status = this.getNodeParameter('status', i) as string;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}/status`,
							{ status },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'updateSchedule') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const fiscalYear = this.getNodeParameter('fiscalYear', i) as number;
						const fiscalQuarter = this.getNodeParameter('fiscalQuarter', i) as number;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}/schedule`,
							{ fiscal_year: fiscalYear, fiscal_quarter: fiscalQuarter },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'updatePriority') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const priority = this.getNodeParameter('priority', i) as string;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}/priority`,
							{ priority },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'updateBudget') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const oneTimeInvestment = this.getNodeParameter('oneTimeInvestment', i) as number;
						const recurringInvestment = this.getNodeParameter('recurringInvestment', i) as number;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}/budget`,
							{
								one_time_investment: oneTimeInvestment,
								recurring_investment: recurringInvestment,
							},
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'listMeetings') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/initiatives/${initiativeId}/meetings`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkMeeting') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}/meetings/${meetingId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkMeeting') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/initiatives/${initiativeId}/meetings/${meetingId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'listGoals') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/initiatives/${initiativeId}/goals`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkGoal') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const goalId = this.getNodeParameter('goalId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}/goals/${goalId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkGoal') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const goalId = this.getNodeParameter('goalId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/initiatives/${initiativeId}/goals/${goalId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'listActionItems') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/initiatives/${initiativeId}/action-items`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkActionItem') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/initiatives/${initiativeId}/action-items/${actionItemId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkActionItem') {
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/initiatives/${initiativeId}/action-items/${actionItemId}`,
						);
						returnData.push({ json: { success: true } });
					}
				}

				// ==================== LIFECYCLE MANAGER: GOAL ====================
				if (resource === 'goal') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							title,
							...additionalFields,
						};

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/goals`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'get') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/goals/${goalId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}
						if (filters.status) {
							qs['filter[status]'] = `eq:${filters.status}`;
						}
						if (filters.category) {
							qs['filter[category]'] = `eq:${filters.category}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/goals`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/goals`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'update') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/goals/${goalId}`,
							updateFields,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						await scalePadCoreApiRequest.call(this, 'DELETE', `${lmBasePath}/goals/${goalId}`);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'updateStatus') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const status = this.getNodeParameter('status', i) as string;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/goals/${goalId}/status`,
							{ status },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'updateSchedule') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const fiscalYear = this.getNodeParameter('fiscalYear', i) as number;
						const fiscalQuarter = this.getNodeParameter('fiscalQuarter', i) as number;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/goals/${goalId}/schedule`,
							{ fiscal_year: fiscalYear, fiscal_quarter: fiscalQuarter },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'listMeetings') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/goals/${goalId}/meetings`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkMeeting') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/goals/${goalId}/meetings/${meetingId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkMeeting') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const meetingId = this.getNodeParameter('meetingId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/goals/${goalId}/meetings/${meetingId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'listInitiatives') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/goals/${goalId}/initiatives`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'linkInitiative') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/goals/${goalId}/initiatives/${initiativeId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'unlinkInitiative') {
						const goalId = this.getNodeParameter('goalId', i) as string;
						const initiativeId = this.getNodeParameter('initiativeId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/goals/${goalId}/initiatives/${initiativeId}`,
						);
						returnData.push({ json: { success: true } });
					}
				}

				// ==================== LIFECYCLE MANAGER: ACTION ITEM ====================
				if (resource === 'actionItem') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							title,
							...additionalFields,
						};

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/action-items`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'get') {
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/action-items/${actionItemId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}
						if (filters.assigneeId) {
							qs['filter[assignee_id]'] = `eq:${filters.assigneeId}`;
						}
						if (filters.isCompleted !== undefined) {
							qs['filter[is_completed]'] = `eq:${filters.isCompleted}`;
						}
						if (filters.priority) {
							qs['filter[priority]'] = `eq:${filters.priority}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/action-items`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/action-items`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'update') {
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/action-items/${actionItemId}`,
							updateFields,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/action-items/${actionItemId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'toggleCompletion') {
						const actionItemId = this.getNodeParameter('actionItemId', i) as string;
						const isCompleted = this.getNodeParameter('isCompleted', i) as boolean;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/action-items/${actionItemId}/completion-status`,
							{ is_completed: isCompleted },
						);
						returnData.push({ json: responseData });
					}
				}

				// ==================== LIFECYCLE MANAGER: ASSESSMENT ====================
				if (resource === 'assessment') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const templateId = this.getNodeParameter('templateId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							template_id: templateId,
							title,
							...additionalFields,
						};

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/assessments`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'get') {
						const assessmentId = this.getNodeParameter('assessmentId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/assessments/${assessmentId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}
						if (filters.templateId) {
							qs['filter[template_id]'] = `eq:${filters.templateId}`;
						}
						if (filters.isCompleted !== undefined) {
							qs['filter[is_completed]'] = `eq:${filters.isCompleted}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/assessments`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/assessments`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'update') {
						const assessmentId = this.getNodeParameter('assessmentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/assessments/${assessmentId}`,
							updateFields,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const assessmentId = this.getNodeParameter('assessmentId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/assessments/${assessmentId}`,
						);
						returnData.push({ json: { success: true } });
					}

					if (operation === 'updateCompletionStatus') {
						const assessmentId = this.getNodeParameter('assessmentId', i) as string;
						const isCompleted = this.getNodeParameter('isCompleted', i) as boolean;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/assessments/${assessmentId}/completion-status`,
							{ is_completed: isCompleted },
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'evaluate') {
						const assessmentId = this.getNodeParameter('assessmentId', i) as string;
						const evaluationData = this.getNodeParameter('evaluationData', i) as string;

						const body = JSON.parse(evaluationData);

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/assessments/${assessmentId}/evaluate`,
							body,
						);
						returnData.push({ json: responseData });
					}
				}

				// ==================== LIFECYCLE MANAGER: NOTE ====================
				if (resource === 'note') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const content = this.getNodeParameter('content', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							title,
							content,
							...additionalFields,
						};

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/notes`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'get') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/notes/${noteId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}
						if (filters.isArchived !== undefined) {
							qs['filter[is_archived]'] = `eq:${filters.isArchived}`;
						}
						if (filters.noteType) {
							qs['filter[note_type]'] = `eq:${filters.noteType}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/notes`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/notes`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'update') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/notes/${noteId}`,
							updateFields,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'toggleArchiveStatus') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						const isArchived = this.getNodeParameter('isArchived', i) as boolean;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/notes/${noteId}/archive-status`,
							{ is_archived: isArchived },
						);
						returnData.push({ json: responseData });
					}
				}

				// ==================== LIFECYCLE MANAGER: ASSESSMENT TEMPLATE ====================
				if (resource === 'assessmentTemplate') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/assessment-templates`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/assessment-templates`,
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

				// ==================== LIFECYCLE MANAGER: HARDWARE LIFECYCLE ====================
				if (resource === 'hardwareLifecycle') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/assets/hardware/lifecycles`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/assets/hardware/lifecycles`,
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

				// ==================== LIFECYCLE MANAGER: CONTRACT ====================
				if (resource === 'lmContract') {
					if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							client_id: clientId,
							name,
							...additionalFields,
						};

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'POST',
							`${lmBasePath}/contracts`,
							body,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'get') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						const responseData = await scalePadCoreApiRequest.call(
							this,
							'GET',
							`${lmBasePath}/contracts/${contractId}`,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i);
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (!returnAll) {
							qs.page_size = this.getNodeParameter('limit', i);
						}

						if (filters.clientId) {
							qs['filter[client_id]'] = `eq:${filters.clientId}`;
						}
						if (filters.contractType) {
							qs['filter[contract_type]'] = `eq:${filters.contractType}`;
						}
						if (filters.vendor) {
							qs['filter[vendor]'] = `eq:${filters.vendor}`;
						}

						let responseData;
						if (returnAll) {
							responseData = await scalePadCoreApiRequestAllItems.call(
								this,
								'GET',
								`${lmBasePath}/contracts`,
								{},
								qs,
							);
						} else {
							const response = await scalePadCoreApiRequest.call(
								this,
								'GET',
								`${lmBasePath}/contracts`,
								{},
								qs,
							);
							responseData = response.data || [];
						}

						responseData.forEach((item: IDataObject) => {
							returnData.push({ json: item });
						});
					}

					if (operation === 'update') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await scalePadCoreApiRequest.call(
							this,
							'PUT',
							`${lmBasePath}/contracts/${contractId}`,
							updateFields,
						);
						returnData.push({ json: responseData });
					}

					if (operation === 'delete') {
						const contractId = this.getNodeParameter('contractId', i) as string;
						await scalePadCoreApiRequest.call(
							this,
							'DELETE',
							`${lmBasePath}/contracts/${contractId}`,
						);
						returnData.push({ json: { success: true } });
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
