import { INodeProperties } from 'n8n-workflow';

export const initiativeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new initiative',
				action: 'Create an initiative',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an initiative',
				action: 'Delete an initiative',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an initiative by ID',
				action: 'Get an initiative',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many initiatives',
				action: 'Get many initiatives',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an initiative',
				action: 'Update an initiative',
			},
			{
				name: 'Update Status',
				value: 'updateStatus',
				description: 'Update initiative status',
				action: 'Update initiative status',
			},
			{
				name: 'Update Schedule',
				value: 'updateSchedule',
				description: 'Set the fiscal quarter for an initiative',
				action: 'Update initiative schedule',
			},
			{
				name: 'Update Priority',
				value: 'updatePriority',
				description: 'Adjust initiative priority',
				action: 'Update initiative priority',
			},
			{
				name: 'Update Budget',
				value: 'updateBudget',
				description: 'Modify investment amounts',
				action: 'Update initiative budget',
			},
			{
				name: 'List Meetings',
				value: 'listMeetings',
				description: 'List meetings linked to an initiative',
				action: 'List initiative meetings',
			},
			{
				name: 'Link Meeting',
				value: 'linkMeeting',
				description: 'Link a meeting to an initiative',
				action: 'Link meeting to initiative',
			},
			{
				name: 'Unlink Meeting',
				value: 'unlinkMeeting',
				description: 'Unlink a meeting from an initiative',
				action: 'Unlink meeting from initiative',
			},
			{
				name: 'List Goals',
				value: 'listGoals',
				description: 'List goals linked to an initiative',
				action: 'List initiative goals',
			},
			{
				name: 'Link Goal',
				value: 'linkGoal',
				description: 'Link a goal to an initiative',
				action: 'Link goal to initiative',
			},
			{
				name: 'Unlink Goal',
				value: 'unlinkGoal',
				description: 'Unlink a goal from an initiative',
				action: 'Unlink goal from initiative',
			},
			{
				name: 'List Action Items',
				value: 'listActionItems',
				description: 'List action items linked to an initiative',
				action: 'List initiative action items',
			},
			{
				name: 'Link Action Item',
				value: 'linkActionItem',
				description: 'Link an action item to an initiative',
				action: 'Link action item to initiative',
			},
			{
				name: 'Unlink Action Item',
				value: 'unlinkActionItem',
				description: 'Unlink an action item from an initiative',
				action: 'Unlink action item from initiative',
			},
		],
		default: 'getAll',
	},
];

export const initiativeFields: INodeProperties[] = [
	// Initiative ID for get/update/delete operations
	{
		displayName: 'Initiative ID',
		name: 'initiativeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: [
					'get',
					'update',
					'delete',
					'updateStatus',
					'updateSchedule',
					'updatePriority',
					'updateBudget',
					'listMeetings',
					'linkMeeting',
					'unlinkMeeting',
					'listGoals',
					'linkGoal',
					'unlinkGoal',
					'listActionItems',
					'linkActionItem',
					'unlinkActionItem',
				],
			},
		},
		default: '',
		description: 'The ID of the initiative',
	},

	// Create operation fields
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the client for this initiative',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the initiative',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['initiative'],
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
				description: 'Description of the initiative',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Draft', value: 'draft' },
					{ name: 'Proposed', value: 'proposed' },
					{ name: 'Approved', value: 'approved' },
					{ name: 'In Progress', value: 'in_progress' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'On Hold', value: 'on_hold' },
					{ name: 'Cancelled', value: 'cancelled' },
				],
				default: 'draft',
				description: 'Status of the initiative',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
					{ name: 'Critical', value: 'critical' },
				],
				default: 'medium',
				description: 'Priority level of the initiative',
			},
			{
				displayName: 'Fiscal Year',
				name: 'fiscal_year',
				type: 'number',
				default: new Date().getFullYear(),
				description: 'Fiscal year for the initiative',
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
				description: 'Fiscal quarter for the initiative',
			},
			{
				displayName: 'One-Time Investment',
				name: 'one_time_investment',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'One-time investment amount',
			},
			{
				displayName: 'Recurring Investment',
				name: 'recurring_investment',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Recurring investment amount',
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
				resource: ['initiative'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the initiative',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the initiative',
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
				resource: ['initiative'],
				operation: ['updateStatus'],
			},
		},
		options: [
			{ name: 'Draft', value: 'draft' },
			{ name: 'Proposed', value: 'proposed' },
			{ name: 'Approved', value: 'approved' },
			{ name: 'In Progress', value: 'in_progress' },
			{ name: 'Completed', value: 'completed' },
			{ name: 'On Hold', value: 'on_hold' },
			{ name: 'Cancelled', value: 'cancelled' },
		],
		default: 'draft',
		description: 'The new status for the initiative',
	},

	// Update schedule
	{
		displayName: 'Fiscal Year',
		name: 'fiscalYear',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
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
				resource: ['initiative'],
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

	// Update priority
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['updatePriority'],
			},
		},
		options: [
			{ name: 'Low', value: 'low' },
			{ name: 'Medium', value: 'medium' },
			{ name: 'High', value: 'high' },
			{ name: 'Critical', value: 'critical' },
		],
		default: 'medium',
		description: 'The priority level',
	},

	// Update budget
	{
		displayName: 'One-Time Investment',
		name: 'oneTimeInvestment',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['updateBudget'],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'One-time investment amount',
	},
	{
		displayName: 'Recurring Investment',
		name: 'recurringInvestment',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['updateBudget'],
			},
		},
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		description: 'Recurring investment amount',
	},

	// Meeting linking
	{
		displayName: 'Meeting ID',
		name: 'meetingId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['linkMeeting', 'unlinkMeeting'],
			},
		},
		default: '',
		description: 'The ID of the meeting to link or unlink',
	},

	// Goal linking
	{
		displayName: 'Goal ID',
		name: 'goalId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['linkGoal', 'unlinkGoal'],
			},
		},
		default: '',
		description: 'The ID of the goal to link or unlink',
	},

	// Action item linking
	{
		displayName: 'Action Item ID',
		name: 'actionItemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['initiative'],
				operation: ['linkActionItem', 'unlinkActionItem'],
			},
		},
		default: '',
		description: 'The ID of the action item to link or unlink',
	},

	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['initiative'],
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
				resource: ['initiative'],
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
				resource: ['initiative'],
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
					{ name: 'Draft', value: 'draft' },
					{ name: 'Proposed', value: 'proposed' },
					{ name: 'Approved', value: 'approved' },
					{ name: 'In Progress', value: 'in_progress' },
					{ name: 'Completed', value: 'completed' },
					{ name: 'On Hold', value: 'on_hold' },
					{ name: 'Cancelled', value: 'cancelled' },
				],
				default: 'draft',
				description: 'Filter by status',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
					{ name: 'Critical', value: 'critical' },
				],
				default: 'medium',
				description: 'Filter by priority',
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
