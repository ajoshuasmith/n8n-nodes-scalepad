import { INodeProperties } from 'n8n-workflow';

export const saasOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['saas'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a SaaS subscription by ID',
				action: 'Get a SaaS subscription',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many SaaS subscriptions',
				action: 'Get many SaaS subscriptions',
			},
		],
		default: 'getAll',
	},
];

export const saasFields: INodeProperties[] = [
	{
		displayName: 'SaaS ID',
		name: 'saasId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the SaaS subscription to retrieve',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['saas'],
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
				resource: ['saas'],
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['saas'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'Filter SaaS subscriptions by client ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
					{
						name: 'Trial',
						value: 'trial',
					},
				],
				default: '',
				description: 'Filter SaaS subscriptions by status',
			},
		],
	},
];
