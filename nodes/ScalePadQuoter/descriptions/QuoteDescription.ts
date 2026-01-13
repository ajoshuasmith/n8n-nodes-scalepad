import { INodeProperties } from 'n8n-workflow';

export const quoteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['quote'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a quote',
				action: 'Create a quote',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a quote',
				action: 'Delete a quote',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a quote by ID',
				action: 'Get a quote',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many quotes',
				action: 'Get many quotes',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a quote',
				action: 'Update a quote',
			},
		],
		default: 'getAll',
	},
];

export const quoteFields: INodeProperties[] = [
	// Get/Delete operation
	{
		displayName: 'Quote ID',
		name: 'quoteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the quote',
	},

	// Create operation
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the customer for this quote',
	},
	{
		displayName: 'Quote Name',
		name: 'quoteName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name/title of the quote',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'ID of the template to use for this quote',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Notes for the quote',
			},
			{
				displayName: 'Valid Until',
				name: 'validUntil',
				type: 'dateTime',
				default: '',
				description: 'Quote expiration date',
			},
		],
	},

	// Update operation
	{
		displayName: 'Quote ID',
		name: 'quoteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the quote to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Quote Name',
				name: 'quoteName',
				type: 'string',
				default: '',
				description: 'Quote name/title',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Sent',
						value: 'sent',
					},
					{
						name: 'Accepted',
						value: 'accepted',
					},
					{
						name: 'Declined',
						value: 'declined',
					},
				],
				default: 'draft',
				description: 'Quote status',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Quote notes',
			},
		],
	},

	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['quote'],
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
				resource: ['quote'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['quote'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: '',
				placeholder: 'id,name,status,customer_id',
				description: 'Comma-separated list of fields to return',
			},
		],
	},
];
