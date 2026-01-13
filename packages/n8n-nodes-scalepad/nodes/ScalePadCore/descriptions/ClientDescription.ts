import { INodeProperties } from 'n8n-workflow';

export const clientOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['client'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a client by ID',
				action: 'Get a client',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many clients',
				action: 'Get many clients',
			},
		],
		default: 'getAll',
	},
];

export const clientFields: INodeProperties[] = [
	// Get operation
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['client'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the client to retrieve',
	},

	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['client'],
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
				resource: ['client'],
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
				resource: ['client'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'fixedCollection',
				placeholder: 'Add Filter',
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'filters',
						displayName: 'Filter',
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'options',
								options: [
									{
										name: 'Name',
										value: 'name',
									},
									{
										name: 'Status',
										value: 'status',
									},
									{
										name: 'Created At',
										value: 'created_at',
									},
									{
										name: 'Updated At',
										value: 'updated_at',
									},
								],
								default: 'name',
								description: 'Field to filter by',
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{
										name: 'Equals',
										value: 'eq',
									},
									{
										name: 'Not Equals',
										value: 'ne',
									},
									{
										name: 'Contains',
										value: 'like',
									},
									{
										name: 'Greater Than',
										value: 'gt',
									},
									{
										name: 'Less Than',
										value: 'lt',
									},
								],
								default: 'eq',
								description: 'Filter operator',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Filter value',
							},
						],
					},
				],
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'fixedCollection',
				placeholder: 'Add Sort',
				default: {},
				options: [
					{
						name: 'sortFields',
						displayName: 'Sort',
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'options',
								options: [
									{
										name: 'Name',
										value: 'name',
									},
									{
										name: 'Created At',
										value: 'created_at',
									},
									{
										name: 'Updated At',
										value: 'updated_at',
									},
								],
								default: 'name',
								description: 'Field to sort by',
							},
							{
								displayName: 'Direction',
								name: 'direction',
								type: 'options',
								options: [
									{
										name: 'Ascending',
										value: 'ASC',
									},
									{
										name: 'Descending',
										value: 'DESC',
									},
								],
								default: 'ASC',
								description: 'Sort direction',
							},
						],
					},
				],
			},
		],
	},
];
