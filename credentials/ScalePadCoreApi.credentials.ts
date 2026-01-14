import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ScalePadCoreApi implements ICredentialType {
	name = 'scalePadCoreApi';
	displayName = 'ScalePad Core API';
	documentationUrl = 'https://developer.scalepad.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description:
				'API Key for ScalePad Core API and Lifecycle Manager. Generate from ScalePad Hub > API (BETA).',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
			],
			default: 'production',
			description: 'The environment to connect to',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
				'Accept': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "production" ? "https://api.scalepad.com" : "https://api-sandbox.scalepad.com"}}',
			url: '/core/v1/clients',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}
