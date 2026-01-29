import { INodeProperties } from 'n8n-workflow';

export const meetingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new meeting',
				action: 'Create a meeting',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a meeting',
				action: 'Delete a meeting',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a meeting by ID',
				action: 'Get a meeting',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many meetings',
				action: 'Get many meetings',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a meeting',
				action: 'Update a meeting',
			},
			{
				name: 'Update Completion Status',
				value: 'updateCompletionStatus',
				description: 'Mark a meeting as completed or incomplete',
				action: 'Update meeting completion status',
			},
			{
				name: 'Add User Attendees',
				value: 'addUserAttendees',
				description: 'Add user attendees to a meeting',
				action: 'Add user attendees to a meeting',
			},
			{
				name: 'Remove User Attendees',
				value: 'removeUserAttendees',
				description: 'Remove user attendees from a meeting',
				action: 'Remove user attendees from a meeting',
			},
			{
				name: 'Add Contact Attendees',
				value: 'addContactAttendees',
				description: 'Add contact attendees to a meeting',
				action: 'Add contact attendees to a meeting',
			},
			{
				name: 'Remove Contact Attendees',
				value: 'removeContactAttendees',
				description: 'Remove contact attendees from a meeting',
				action: 'Remove contact attendees from a meeting',
			},
			{
				name: 'List Initiatives',
				value: 'listInitiatives',
				description: 'List initiatives attached to a meeting',
				action: 'List meeting initiatives',
			},
			{
				name: 'Link Initiative',
				value: 'linkInitiative',
				description: 'Link an initiative to a meeting',
				action: 'Link initiative to a meeting',
			},
			{
				name: 'Unlink Initiative',
				value: 'unlinkInitiative',
				description: 'Unlink an initiative from a meeting',
				action: 'Unlink initiative from a meeting',
			},
			{
				name: 'List Goals',
				value: 'listGoals',
				description: 'List goals attached to a meeting',
				action: 'List meeting goals',
			},
			{
				name: 'Link Goal',
				value: 'linkGoal',
				description: 'Link a goal to a meeting',
				action: 'Link goal to a meeting',
			},
			{
				name: 'Unlink Goal',
				value: 'unlinkGoal',
				description: 'Unlink a goal from a meeting',
				action: 'Unlink goal from a meeting',
			},
			{
				name: 'List Action Items',
				value: 'listActionItems',
				description: 'List action items attached to a meeting',
				action: 'List meeting action items',
			},
			{
				name: 'Link Action Item',
				value: 'linkActionItem',
				description: 'Link an action item to a meeting',
				action: 'Link action item to a meeting',
			},
			{
				name: 'Unlink Action Item',
				value: 'unlinkActionItem',
				description: 'Unlink an action item from a meeting',
				action: 'Unlink action item from a meeting',
			},
		],
		default: 'getAll',
	},
];

export const meetingFields: INodeProperties[] = [
	// Meeting ID for get/update/delete operations
	{
		displayName: 'Meeting ID',
		name: 'meetingId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
				operation: [
					'get',
					'update',
					'delete',
					'updateCompletionStatus',
					'addUserAttendees',
					'removeUserAttendees',
					'addContactAttendees',
					'removeContactAttendees',
					'listInitiatives',
					'linkInitiative',
					'unlinkInitiative',
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
		description: 'The ID of the meeting',
	},

	// Create operation fields
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the client for this meeting',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the meeting',
	},
	{
		displayName: 'Scheduled At',
		name: 'scheduledAt',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The scheduled date and time for the meeting',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['meeting'],
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
				description: 'Description or notes for the meeting',
			},
			{
				displayName: 'Duration (Minutes)',
				name: 'duration',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 60,
				description: 'Duration of the meeting in minutes',
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				description: 'Location of the meeting',
			},
			{
				displayName: 'Meeting Type',
				name: 'meeting_type',
				type: 'options',
				options: [
					{ name: 'Business Review', value: 'business_review' },
					{ name: 'Strategy', value: 'strategy' },
					{ name: 'Technical', value: 'technical' },
					{ name: 'Other', value: 'other' },
				],
				default: 'business_review',
				description: 'Type of meeting',
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
				resource: ['meeting'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the meeting',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description or notes for the meeting',
			},
			{
				displayName: 'Scheduled At',
				name: 'scheduled_at',
				type: 'dateTime',
				default: '',
				description: 'The scheduled date and time for the meeting',
			},
			{
				displayName: 'Duration (Minutes)',
				name: 'duration',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 60,
				description: 'Duration of the meeting in minutes',
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				description: 'Location of the meeting',
			},
			{
				displayName: 'Meeting Type',
				name: 'meeting_type',
				type: 'options',
				options: [
					{ name: 'Business Review', value: 'business_review' },
					{ name: 'Strategy', value: 'strategy' },
					{ name: 'Technical', value: 'technical' },
					{ name: 'Other', value: 'other' },
				],
				default: 'business_review',
				description: 'Type of meeting',
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
				resource: ['meeting'],
				operation: ['updateCompletionStatus'],
			},
		},
		default: false,
		description: 'Whether the meeting is marked as completed',
	},

	// User attendees
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
				operation: ['addUserAttendees', 'removeUserAttendees'],
			},
		},
		default: '',
		description: 'Comma-separated list of user IDs to add or remove',
	},

	// Contact attendees
	{
		displayName: 'Contact IDs',
		name: 'contactIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
				operation: ['addContactAttendees', 'removeContactAttendees'],
			},
		},
		default: '',
		description: 'Comma-separated list of contact IDs to add or remove',
	},

	// Initiative linking
	{
		displayName: 'Initiative ID',
		name: 'initiativeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
				operation: ['linkInitiative', 'unlinkInitiative'],
			},
		},
		default: '',
		description: 'The ID of the initiative to link or unlink',
	},

	// Goal linking
	{
		displayName: 'Goal ID',
		name: 'goalId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['meeting'],
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
				resource: ['meeting'],
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
				resource: ['meeting'],
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
				resource: ['meeting'],
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
				resource: ['meeting'],
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
				displayName: 'Is Completed',
				name: 'isCompleted',
				type: 'boolean',
				default: false,
				description: 'Filter by completion status',
			},
			{
				displayName: 'Scheduled After',
				name: 'scheduledAfter',
				type: 'dateTime',
				default: '',
				description: 'Filter meetings scheduled after this date',
			},
			{
				displayName: 'Scheduled Before',
				name: 'scheduledBefore',
				type: 'dateTime',
				default: '',
				description: 'Filter meetings scheduled before this date',
			},
		],
	},
];
