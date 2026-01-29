# n8n-nodes-scalepad

This is an n8n community node for **ScalePad**. It provides integration with both the **Core API** and **Lifecycle Manager API** for MSPs.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Usage](#usage) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@joshuanode/n8n-nodes-scalepad` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installation, restart n8n to load the node.

### Manual Installation

```bash
npm install @joshuanode/n8n-nodes-scalepad
```

## Operations

This node provides access to both ScalePad Core API and Lifecycle Manager API resources.

### Core API Resources

| Resource | Operations |
|----------|------------|
| **Client** | Get, Get Many |
| **Contact** | Get, Get Many |
| **Contract (Core)** | Get, Get Many |
| **Hardware Asset** | Get, Get Many |
| **Member** | Get, Get Many |
| **Opportunity** | Get, Get Many |
| **SaaS** | Get, Get Many |
| **Ticket** | Get, Get Many |

### Lifecycle Manager Resources

| Resource | Operations |
|----------|------------|
| **Action Item** | Create, Get, Get Many, Update, Delete, Toggle Completion |
| **Assessment** | Create, Get, Get Many, Update, Delete, Update Completion, Evaluate |
| **Assessment Template** | Get Many |
| **Contract (Lifecycle)** | Create, Get, Get Many, Update, Delete |
| **Goal** | Create, Get, Get Many, Update, Delete, Update Status, Update Schedule, Link/Unlink Meetings, Link/Unlink Initiatives |
| **Hardware Lifecycle** | Get Many |
| **Initiative** | Create, Get, Get Many, Update, Delete, Update Status/Schedule/Priority/Budget, Link/Unlink Meetings, Link/Unlink Goals, Link/Unlink Action Items |
| **Meeting** | Create, Get, Get Many, Update, Delete, Update Completion, Add/Remove Attendees, Link/Unlink Initiatives, Link/Unlink Goals, Link/Unlink Action Items |
| **Note** | Create, Get, Get Many, Update, Toggle Archive |

### Features

- Full CRUD operations for Lifecycle Manager resources
- Automatic cursor-based pagination (up to 200 records per page)
- Filtering support per resource
- Sorting support (clients)
- Rate limit error handling (50 req/5sec)
- Production and Sandbox environment support
- Link/unlink relationships between meetings, initiatives, goals, and action items

## Credentials

### API Key Authentication

**Requirements:**
- ScalePad Partner account
- Administrator permissions

**Setup:**

1. Sign in to [ScalePad Hub](https://hub.scalepad.com)
2. Navigate to **API (BETA)** in the top menu
3. Click **+ Generate** to create a new API key
4. Copy the API key immediately (it won't be shown again)

**In n8n:**

- **API Key**: Your generated API key
- **Environment**: `Production` or `Sandbox`

The same API key provides access to both Core API and Lifecycle Manager API.

## Usage

### Get All Clients

```
Resource: Client
Operation: Get Many
Return All: true
```

### Create a Meeting

```
Resource: Meeting
Operation: Create
Client ID: <client-uuid>
Title: Quarterly Business Review
Scheduled At: 2024-03-15T10:00:00Z
```

### Get Action Items for a Client

```
Resource: Action Item
Operation: Get Many
Filters:
  Client ID: <client-uuid>
  Is Completed: false
```

### Link an Initiative to a Meeting

```
Resource: Meeting
Operation: Link Initiative
Meeting ID: <meeting-uuid>
Initiative ID: <initiative-uuid>
```

## API Limits

| Limit | Value |
|-------|-------|
| Rate limit | 50 requests per 5 seconds |
| Page size | Up to 200 records per request |
| Pagination | Cursor-based (automatic with "Return All") |

## Error Handling

| Code | Meaning | Resolution |
|------|---------|------------|
| **401** | Authentication failed | Check API key validity |
| **404** | Resource not found | Verify resource ID |
| **429** | Rate limit exceeded | Reduce request frequency |

## Resources

- [ScalePad API Documentation](https://developer.scalepad.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## Contributing

Contributions welcome. Open an issue or submit a pull request on [GitHub](https://github.com/ajoshuasmith/n8n-nodes-scalepad).

## License

[MIT](LICENSE)

## Author

Joshua Smith
