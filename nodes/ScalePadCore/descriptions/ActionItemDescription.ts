import { INodeProperties } from 'n8n-workflow';

export const actionItemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['actionItem'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new action item',
				action: 'Create an action item',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an action item',
				action: 'Delete an action item',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an action item by ID',
				action: 'Get an action item',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many action items',
				action: 'Get many action items',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an action item',
				action: 'Update an action item',
			},
			{
				name: 'Toggle Completion',
				value: 'toggleCompletion',
				description: 'Toggle action item completion status',
				action: 'Toggle action item completion',
			},
		],
		default: 'getAll',
	},
];

export const actionItemFields: INodeProperties[] = [
	// Action Item ID for get/update/delete operations
	{
		displayName: 'Action Item ID',
		name: 'actionItemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['actionItem'],
				operation: ['get', 'update', 'delete', 'toggleCompletion'],
			},
		},
		default: '',
		description: 'The ID of the action item',
	},

	// Create operation fields
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['actionItem'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the client for this action item',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['actionItem'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the action item',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['actionItem'],
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
				description: 'Description of the action item',
			},
			{
				displayName: 'Assignee ID',
				name: 'assignee_id',
				type: 'string',
				default: '',
				description: 'User ID of the person assigned to this action item',
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'dateTime',
				default: '',
				description: 'Due date for the action item',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
				],
				default: 'medium',
				description: 'Priority level of the action item',
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
				resource: ['actionItem'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the action item',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the action item',
			},
			{
				displayName: 'Assignee ID',
				name: 'assignee_id',
				type: 'string',
				default: '',
				description: 'User ID of the person assigned to this action item',
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'dateTime',
				default: '',
				description: 'Due date for the action item',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
				],
				default: 'medium',
				description: 'Priority level of the action item',
			},
		],
	},

	// Toggle completion
	{
		displayName: 'Is Completed',
		name: 'isCompleted',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['actionItem'],
				operation: ['toggleCompletion'],
			},
		},
		default: false,
		description: 'Whether the action item is marked as completed',
	},

	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['actionItem'],
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
				resource: ['actionItem'],
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
				resource: ['actionItem'],
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
				displayName: 'Assignee ID',
				name: 'assigneeId',
				type: 'string',
				default: '',
				description: 'Filter by assignee user ID',
			},
			{
				displayName: 'Is Completed',
				name: 'isCompleted',
				type: 'boolean',
				default: false,
				description: 'Filter by completion status',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'High', value: 'high' },
				],
				default: 'medium',
				description: 'Filter by priority',
			},
		],
	},
];
