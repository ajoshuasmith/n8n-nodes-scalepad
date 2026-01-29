import { INodeProperties } from 'n8n-workflow';

export const goalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['goal'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new goal',
				action: 'Create a goal',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a goal',
				action: 'Delete a goal',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a goal by ID',
				action: 'Get a goal',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many goals',
				action: 'Get many goals',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a goal',
				action: 'Update a goal',
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				description: 'Update goal status',
				action: 'Update goal status',
			},
			{
				name: 'Update Schedule',
				value: 'updateSchedule',
				description: 'Adjust goal schedule',
				action: 'Update goal schedule',
			},
			{
				name: 'List Meetings',
				value: 'listMeetings',
				description: 'List meetings linked to a goal',
				action: 'List goal meetings',
			},
			{
				name: 'Link Meeting',
				value: 'linkMeeting',
				description: 'Link a meeting to a goal',
				action: 'Link meeting to goal',
			},
			{
				name: 'Unlink Meeting',
				value: 'unlinkMeeting',
				description: 'Unlink a meeting from a goal',
				action: 'Unlink meeting from goal',
			},
			{
				name: 'List Initiatives',
				value: 'listInitiatives',
				description: 'List initiatives linked to a goal',
				action: 'List goal initiatives',
			},
			{
				name: 'Link Initiative',
				value: 'linkInitiative',
				description: 'Link an initiative to a goal',
				action: 'Link initiative to goal',
			},
			{
				name: 'Unlink Initiative',
				value: 'unlinkInitiative',
				description: 'Unlink an initiative from a goal',
				action: 'Unlink initiative from goal',
			},
		],
		default: 'getAll',
	},
];

export const goalFields: INodeProperties[] = [
	// Goal ID for get/update/delete operations
	{
		displayName: 'Goal ID',
		name: 'goalId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: [
					'get',
					'update',
					'delete',
					'updateStatus',
					'updateSchedule',
					'listMeetings',
					'linkMeeting',
					'unlinkMeeting',
					'listInitiatives',
					'linkInitiative',
					'unlinkInitiative',
				],
			},
		},
		default: '',
		description: 'The ID of the goal',
	},

	// Create operation fields
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the client for this goal',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the goal',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['goal'],
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
				description: 'Description of the goal',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Not Started', value: 'not_started' },
					{ name: 'In Progress', value: 'in_progress' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'On Hold', value: 'on_hold' },
					{ name: 'Cancelled', value: 'cancelled' },
				],
				default: 'not_started',
				description: 'Status of the goal',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: [
					{ name: 'Security', value: 'security' },
					{ name: 'Compliance', value: 'compliance' },
					{ name: 'Efficiency', value: 'efficiency' },
					{ name: 'Growth', value: 'growth' },
					{ name: 'Cost Reduction', value: 'cost_reduction' },
					{ name: 'Other', value: 'other' },
				],
				default: 'other',
				description: 'Category of the goal',
			},
			{
				displayName: 'Target Date',
				name: 'target_date',
				type: 'dateTime',
				default: '',
				description: 'Target completion date for the goal',
			},
			{
				displayName: 'Fiscal Year',
				name: 'fiscal_year',
				type: 'number',
				default: new Date().getFullYear(),
				description: 'Fiscal year for the goal',
			},
			{
				displayName: 'Fiscal Quarter',
				name: 'fiscal_quarter',
				type: 'options',
				options: [
					{ name: 'Q1', value: 1 },
					{ name: 'Q2', value: 2 },
					{ name: 'Q3', value: 3 },
					{ name: 'Q4', value: 4 },
				],
				default: 1,
				description: 'Fiscal quarter for the goal',
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
				resource: ['goal'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the goal',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the goal',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: [
					{ name: 'Security', value: 'security' },
					{ name: 'Compliance', value: 'compliance' },
					{ name: 'Efficiency', value: 'efficiency' },
					{ name: 'Growth', value: 'growth' },
					{ name: 'Cost Reduction', value: 'cost_reduction' },
					{ name: 'Other', value: 'other' },
				],
				default: 'other',
				description: 'Category of the goal',
			},
			{
				displayName: 'Target Date',
				name: 'target_date',
				type: 'dateTime',
				default: '',
				description: 'Target completion date for the goal',
			},
		],
	},

	// Update status
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['updateStatus'],
			},
		},
		options: [
			{ name: 'Not Started', value: 'not_started' },
			{ name: 'In Progress', value: 'in_progress' },
			{ name: 'Completed', value: 'completed' },
			{ name: 'On Hold', value: 'on_hold' },
			{ name: 'Cancelled', value: 'cancelled' },
		],
		default: 'not_started',
		description: 'The new status for the goal',
	},

	// Update schedule
	{
		displayName: 'Fiscal Year',
		name: 'fiscalYear',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['updateSchedule'],
			},
		},
		default: new Date().getFullYear(),
		description: 'The fiscal year',
	},
	{
		displayName: 'Fiscal Quarter',
		name: 'fiscalQuarter',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['updateSchedule'],
			},
		},
		options: [
			{ name: 'Q1', value: 1 },
			{ name: 'Q2', value: 2 },
			{ name: 'Q3', value: 3 },
			{ name: 'Q4', value: 4 },
		],
		default: 1,
		description: 'The fiscal quarter',
	},

	// Meeting linking
	{
		displayName: 'Meeting ID',
		name: 'meetingId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['linkMeeting', 'unlinkMeeting'],
			},
		},
		default: '',
		description: 'The ID of the meeting to link or unlink',
	},

	// Initiative linking
	{
		displayName: 'Initiative ID',
		name: 'initiativeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['linkInitiative', 'unlinkInitiative'],
			},
		},
		default: '',
		description: 'The ID of the initiative to link or unlink',
	},

	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['goal'],
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
				resource: ['goal'],
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
				resource: ['goal'],
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
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Not Started', value: 'not_started' },
					{ name: 'In Progress', value: 'in_progress' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'On Hold', value: 'on_hold' },
					{ name: 'Cancelled', value: 'cancelled' },
				],
				default: 'not_started',
				description: 'Filter by status',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'options',
				options: [
					{ name: 'Security', value: 'security' },
					{ name: 'Compliance', value: 'compliance' },
					{ name: 'Efficiency', value: 'efficiency' },
					{ name: 'Growth', value: 'growth' },
					{ name: 'Cost Reduction', value: 'cost_reduction' },
					{ name: 'Other', value: 'other' },
				],
				default: 'other',
				description: 'Filter by category',
			},
			{
				displayName: 'Fiscal Year',
				name: 'fiscalYear',
				type: 'number',
				default: new Date().getFullYear(),
				description: 'Filter by fiscal year',
			},
		],
	},
];
