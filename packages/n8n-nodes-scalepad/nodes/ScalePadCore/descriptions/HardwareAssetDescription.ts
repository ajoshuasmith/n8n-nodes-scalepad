import { INodeProperties } from 'n8n-workflow';

export const hardwareAssetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['hardwareAsset'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a hardware asset by ID',
				action: 'Get a hardware asset',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many hardware assets',
				action: 'Get many hardware assets',
			},
		],
		default: 'getAll',
	},
];

export const hardwareAssetFields: INodeProperties[] = [
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['hardwareAsset'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the hardware asset to retrieve',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['hardwareAsset'],
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
				resource: ['hardwareAsset'],
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
				resource: ['hardwareAsset'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'Filter assets by client ID',
			},
			{
				displayName: 'Asset Type',
				name: 'assetType',
				type: 'options',
				options: [
					{
						name: 'Desktop',
						value: 'desktop',
					},
					{
						name: 'Laptop',
						value: 'laptop',
					},
					{
						name: 'Server',
						value: 'server',
					},
					{
						name: 'Network Device',
						value: 'network',
					},
				],
				default: '',
				description: 'Filter assets by type',
			},
		],
	},
];
