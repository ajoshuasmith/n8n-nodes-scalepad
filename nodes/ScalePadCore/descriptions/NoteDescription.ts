import { INodeProperties } from 'n8n-workflow';

export const noteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['note'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new note',
				action: 'Create a note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a note by ID',
				action: 'Get a note',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many notes',
				action: 'Get many notes',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a note',
				action: 'Update a note',
			},
			{
				name: 'Toggle Archive Status',
				value: 'toggleArchiveStatus',
				description: 'Archive or unarchive a note',
				action: 'Toggle note archive status',
			},
		],
		default: 'getAll',
	},
];

export const noteFields: INodeProperties[] = [
	// Note ID for get/update operations
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['get', 'update', 'toggleArchiveStatus'],
			},
		},
		default: '',
		description: 'The ID of the note',
	},

	// Create operation fields
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the client for this note',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the note',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The content of the note',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Note Type',
				name: 'note_type',
				type: 'options',
				options: [
					{ name: 'General', value: 'general' },
					{ name: 'Meeting', value: 'meeting' },
					{ name: 'Follow-up', value: 'follow_up' },
					{ name: 'Technical', value: 'technical' },
				],
				default: 'general',
				description: 'Type of note',
			},
			{
				displayName: 'Is Pinned',
				name: 'is_pinned',
				type: 'boolean',
				default: false,
				description: 'Whether the note is pinned',
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
				resource: ['note'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the note',
			},
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 6,
				},
				default: '',
				description: 'The content of the note',
			},
			{
				displayName: 'Note Type',
				name: 'note_type',
				type: 'options',
				options: [
					{ name: 'General', value: 'general' },
					{ name: 'Meeting', value: 'meeting' },
					{ name: 'Follow-up', value: 'follow_up' },
					{ name: 'Technical', value: 'technical' },
				],
				default: 'general',
				description: 'Type of note',
			},
			{
				displayName: 'Is Pinned',
				name: 'is_pinned',
				type: 'boolean',
				default: false,
				description: 'Whether the note is pinned',
			},
		],
	},

	// Archive status
	{
		displayName: 'Is Archived',
		name: 'isArchived',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['toggleArchiveStatus'],
			},
		},
		default: false,
		description: 'Whether the note should be archived',
	},

	// Get Many operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['note'],
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
				resource: ['note'],
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
				resource: ['note'],
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
				displayName: 'Is Archived',
				name: 'isArchived',
				type: 'boolean',
				default: false,
				description: 'Filter by archive status',
			},
			{
				displayName: 'Note Type',
				name: 'noteType',
				type: 'options',
				options: [
					{ name: 'General', value: 'general' },
					{ name: 'Meeting', value: 'meeting' },
					{ name: 'Follow-up', value: 'follow_up' },
					{ name: 'Technical', value: 'technical' },
				],
				default: 'general',
				description: 'Filter by note type',
			},
		],
	},
];
