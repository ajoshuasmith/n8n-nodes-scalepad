import { INodeProperties } from 'n8n-workflow';

export const memberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['member'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a team member by ID',
				action: 'Get a team member',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many team members',
				action: 'Get many team members',
			},
		],
		default: 'getAll',
	},
];

export const memberFields: INodeProperties[] = [
	{
		displayName: 'Member ID',
		name: 'memberId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ID of the team member to retrieve',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['member'],
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
				resource: ['member'],
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
				resource: ['member'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				options: [
					{
						name: 'Admin',
						value: 'admin',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Viewer',
						value: 'viewer',
					},
				],
				default: '',
				description: 'Filter members by role',
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
				],
				default: '',
				description: 'Filter members by status',
			},
		],
	},
];
