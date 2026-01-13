import { INodeProperties } from 'n8n-workflow';

export const hardwareLifecycleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['hardwareLifecycle'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a hardware lifecycle record by ID',
				action: 'Get a hardware lifecycle record',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many hardware lifecycle records',
				action: 'Get many hardware lifecycle records',
			},
		],
		default: 'getAll',
	},
];

export const hardwareLifecycleFields: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['hardwareLifecycle'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the hardware lifecycle record to retrieve',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['hardwareLifecycle'],
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
				resource: ['hardwareLifecycle'],
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
				resource: ['hardwareLifecycle'],
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
				displayName: 'Warranty Status',
				name: 'warrantyStatus',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Expired',
						value: 'expired',
					},
					{
						name: 'Expiring Soon',
						value: 'expiring_soon',
					},
				],
				default: '',
				description: 'Filter by warranty status',
			},
			{
				displayName: 'End of Life Status',
				name: 'eolStatus',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'End of Life',
						value: 'eol',
					},
					{
						name: 'Approaching EOL',
						value: 'approaching_eol',
					},
				],
				default: '',
				description: 'Filter by end of life status',
			},
		],
	},
];
