# n8n-nodes-scalepad

This is an n8n community node for the **ScalePad Core API**. It provides integration with ScalePad's operational and financial insights platform for MSPs.

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

This node provides access to the following ScalePad resources:

| Resource | API Endpoint | Operations |
|----------|-------------|------------|
| **Clients** | `/core/v1/clients` | Get, Get Many |
| **Contacts** | `/core/v1/contacts` | Get, Get Many |
| **Contracts** | `/core/v1/service/contracts` | Get, Get Many |
| **Hardware Assets** | `/core/v1/assets/hardware` | Get, Get Many |
| **Members** | `/core/v1/members` | Get, Get Many |
| **Opportunities** | `/core/v1/opportunities` | Get, Get Many |
| **SaaS** | `/core/v1/assets/saas` | Get, Get Many |
| **Tickets** | `/core/v1/service/tickets` | Get, Get Many |

- **Get** - Retrieve a single record by ID
- **Get Many** - Retrieve multiple records with optional filtering and pagination

### Features

- Automatic cursor-based pagination (up to 200 records per page)
- Filtering support per resource
- Sorting support (clients)
- Rate limit error handling (50 req/5sec)
- Production and Sandbox environment support

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

## Usage

### Get All Clients

```
Resource: Client
Operation: Get Many
Return All: true
```

### Get a Client's Contacts

```
Resource: Contact
Operation: Get Many
Additional Fields:
  Client ID: <client-uuid>
```

### Get Open Tickets for a Client

```
Resource: Ticket
Operation: Get Many
Limit: 50
Additional Fields:
  Client ID: <client-uuid>
  Status: open
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

## API Status

The ScalePad Core API is currently in **beta** with **read-only** access (GET operations only).

## Resources

- [ScalePad API Documentation](https://developer.scalepad.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## Contributing

Contributions welcome. Open an issue or submit a pull request on [GitHub](https://github.com/ajoshuasmith/n8n-nodes-scalepad).

## License

[MIT](LICENSE)

## Author

Joshua Smith
