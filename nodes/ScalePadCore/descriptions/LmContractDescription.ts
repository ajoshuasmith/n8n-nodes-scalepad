import { INodeProperties } from 'n8n-workflow';

export const lmContractOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lmContract'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new contract',
				action: 'Create a contract',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contract',
				action: 'Delete a contract',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a contract by ID',
				action: 'Get a contract',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many contracts',
				action: 'Get many contracts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a contract',
				action: 'Update a contract',
			},
		],
		default: 'getAll',
	},
];

export const lmContractFields: INodeProperties[] = [
	// Contract ID for get/update/delete operations
	{
		displayName: 'Contract ID',
		name: 'contractId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lmContract'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the contract',
	},

	// Create operation fields
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lmContract'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the client for this contract',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lmContract'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the contract',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lmContract'],
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
				description: 'Description of the contract',
			},
			{
				displayName: 'Contract Type',
				name: 'contract_type',
				type: 'options',
				options: [
					{ name: 'Service Agreement', value: 'service_agreement' },
					{ name: 'Maintenance', value: 'maintenance' },
					{ name: 'License', value: 'license' },
					{ name: 'Subscription', value: 'subscription' },
					{ name: 'Other', value: 'other' },
				],
				default: 'service_agreement',
				description: 'Type of contract',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Contract start date',
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'Contract end date',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Contract value',
			},
			{
				displayName: 'Renewal Type',
				name: 'renewal_type',
				type: 'options',
				options: [
					{ name: 'Auto-Renew', value: 'auto_renew' },
					{ name: 'Manual', value: 'manual' },
					{ name: 'None', value: 'none' },
				],
				default: 'manual',
				description: 'How the contract renews',
			},
			{
				displayName: 'Vendor',
				name: 'vendor',
				type: 'string',
				default: '',
				description: 'Vendor name for the contract',
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
				resource: ['lmContract'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the contract',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the contract',
			},
			{
				displayName: 'Contract Type',
				name: 'contract_type',
				type: 'options',
				options: [
					{ name: 'Service Agreement', value: 'service_agreement' },
					{ name: 'Maintenance', value: 'maintenance' },
					{ name: 'License', value: 'license' },
					{ name: 'Subscription', value: 'subscription' },
					{ name: 'Other', value: 'other' },
				],
				default: 'service_agreement',
				description: 'Type of contract',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Contract start date',
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'Contract end date',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Contract value',
			},
			{
				displayName: 'Renewal Type',
				name: 'renewal_type',
				type: 'options',
				options: [
					{ name: 'Auto-Renew', value: 'auto_renew' },
					{ name: 'Manual', value: 'manual' },
					{ name: 'None', value: 'none' },
				],
				default: 'manual',
				description: 'How the contract renews',
			},
			{
				displayName: 'Vendor',
				name: 'vendor',
				type: 'string',
				default: '',
				description: 'Vendor name for the contract',
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
				resource: ['lmContract'],
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
				resource: ['lmContract'],
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
				resource: ['lmContract'],
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
				displayName: 'Contract Type',
				name: 'contractType',
				type: 'options',
				options: [
					{ name: 'Service Agreement', value: 'service_agreement' },
					{ name: 'Maintenance', value: 'maintenance' },
					{ name: 'License', value: 'license' },
					{ name: 'Subscription', value: 'subscription' },
					{ name: 'Other', value: 'other' },
				],
				default: 'service_agreement',
				description: 'Filter by contract type',
			},
			{
				displayName: 'Vendor',
				name: 'vendor',
				type: 'string',
				default: '',
				description: 'Filter by vendor name',
			},
		],
	},
];
