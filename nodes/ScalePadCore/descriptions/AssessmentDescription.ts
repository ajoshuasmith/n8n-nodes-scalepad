import { INodeProperties } from 'n8n-workflow';

export const assessmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['assessment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new assessment',
				action: 'Create an assessment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an assessment',
				action: 'Delete an assessment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an assessment by ID',
				action: 'Get an assessment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many assessments',
				action: 'Get many assessments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an assessment',
				action: 'Update an assessment',
			},
			{
				name: 'Update Completion Status',
				value: 'updateCompletionStatus',
				description: 'Mark assessment as completed or incomplete',
				action: 'Update assessment completion status',
			},
			{
				name: 'Evaluate',
				value: 'evaluate',
				description: 'Evaluate an assessment',
				action: 'Evaluate an assessment',
			},
		],
		default: 'getAll',
	},
];

export const assessmentFields: INodeProperties[] = [
	// Assessment ID for get/update/delete operations
	{
		displayName: 'Assessment ID',
		name: 'assessmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['get', 'update', 'delete', 'updateCompletionStatus', 'evaluate'],
			},
		},
		default: '',
		description: 'The ID of the assessment',
	},

	// Create operation fields
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the client for this assessment',
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the assessment template to use',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the assessment',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the assessment',
			},
			{
				displayName: 'Scheduled Date',
				name: 'scheduled_date',
				type: 'dateTime',
				default: '',
				description: 'Scheduled date for the assessment',
			},
		],
	},

	// Update operation fields
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the assessment',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the assessment',
			},
			{
				displayName: 'Scheduled Date',
				name: 'scheduled_date',
				type: 'dateTime',
				default: '',
				description: 'Scheduled date for the assessment',
			},
		],
	},

	// Completion status
	{
		displayName: 'Is Completed',
		name: 'isCompleted',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['updateCompletionStatus'],
			},
		},
		default: false,
		description: 'Whether the assessment is marked as completed',
	},

	// Evaluate - scores/responses
	{
		displayName: 'Evaluation Data',
		name: 'evaluationData',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['evaluate'],
			},
		},
		default: '{}',
		description: 'JSON object containing the evaluation scores and responses',
	},

	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['assessment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'Filter by client ID',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'Filter by template ID',
			},
			{
				displayName: 'Is Completed',
				name: 'isCompleted',
				type: 'boolean',
				default: false,
				description: 'Filter by completion status',
			},
		],
	},
];
