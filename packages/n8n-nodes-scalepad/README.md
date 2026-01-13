# n8n-nodes-scalepad

This is an n8n community node for **ScalePad Core API** and **Lifecycle Manager**. It provides comprehensive integration with ScalePad's operational and financial insights platform for MSPs.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Usage](#usage) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-scalepad` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installation, restart n8n to load the node.

### Manual Installation

```bash
npm install n8n-nodes-scalepad
```

## Operations

This node provides access to the following ScalePad resources:

### Resources Available

| Resource | Description | Operations |
|----------|-------------|------------|
| **Clients** | Client/customer information | Get, Get Many |
| **Contacts** | Contact details | Get, Get Many |
| **Contracts** | Contract records | Get, Get Many |
| **Hardware Assets** | Hardware asset data | Get, Get Many |
| **Hardware Lifecycle** | Lifecycle tracking, warranties, EOL status | Get, Get Many |
| **Members** | Team member information | Get, Get Many |
| **Opportunities** | Sales opportunities | Get, Get Many |
| **SaaS** | SaaS subscription data | Get, Get Many |
| **Tickets** | Support ticket records | Get, Get Many |

### Operations

- **Get** - Retrieve a single record by ID
- **Get Many** - Retrieve multiple records with filtering, sorting, and pagination

### Features

✅ **Automatic Pagination** - Handles up to 200 records per request with cursor-based pagination
✅ **Advanced Filtering** - Filter with operators (eq, ne, contains, gt, lt)
✅ **Sorting** - Sort results ascending or descending
✅ **Rate Limit Handling** - Automatic handling of 50 req/5sec limit
✅ **Comprehensive Error Messages** - Detailed error descriptions and resolutions

## Credentials

### Authentication: API Key

**Requirements:**
- ScalePad Partner account
- Administrator permissions

**Setup Steps:**

1. Sign in to [ScalePad Hub](https://hub.scalepad.com)
2. Navigate to **API (BETA)** in the top menu
3. Click **+ Generate** to create a new API key
4. Enter a descriptive name
5. Set expiry (default: 2 years)
6. Copy the API key immediately (won't be shown again)

**Configuration in n8n:**

- **API Key**: Your generated API key
- **Environment**:
  - `Production` - https://api.scalepad.com
  - `Sandbox` - https://api-sandbox.scalepad.com

## Usage

### Example 1: Get All Active Clients

```
Resource: Client
Operation: Get Many
Return All: true
Additional Fields:
  Filter:
    - Field: status
    - Operator: eq
    - Value: active
```

### Example 2: Monitor Hardware Approaching End of Life

```
Resource: Hardware Lifecycle
Operation: Get Many
Return All: true
Additional Fields:
  EOL Status: approaching_eol
```

### Example 3: Get Client's Open Tickets

```
Resource: Ticket
Operation: Get Many
Return All: false
Limit: 50
Additional Fields:
  Client ID: {{$json["client_id"]}}
  Status: open
  Priority: high
```

### Example 4: List Expiring Warranties

```
Resource: Hardware Lifecycle
Operation: Get Many
Return All: true
Additional Fields:
  Warranty Status: expiring_soon
```

## API Limits

### Rate Limits

- **Limit**: 50 requests per 5 seconds
- **Automatic Handling**: The node handles rate limit errors with descriptive messages
- **Best Practice**: Use filters to reduce the number of requests needed

### Pagination

- **Maximum**: 200 records per request
- **Type**: Cursor-based pagination
- **Auto-pagination**: Enable "Return All" to automatically fetch all pages

### Performance Tips

1. **Use filters** to reduce data transfer
   ```
   Additional Fields > Client ID: specific-client-id
   ```

2. **Limit results** for large datasets
   ```
   Return All: false
   Limit: 100
   ```

3. **Apply sorting** for ordered results
   ```
   Sort Field: created_at
   Sort Direction: DESC
   ```

## Error Handling

The node provides comprehensive error handling:

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| **401** | Authentication failed | Check API key validity and expiration |
| **404** | Resource not found | Verify resource ID and access permissions |
| **429** | Rate limit exceeded | Reduce request frequency or add delays |
| **500** | Server error | Retry request or contact ScalePad support |

All errors include:
- HTTP status code
- Error message
- Detailed description
- Suggested resolution

## API Status

**Current Status**: Beta (Read-Only)

The ScalePad Core API is currently in beta with read-only access (GET operations only). Full CRUD operations (POST, PATCH, DELETE) will be available in future releases based on partner feedback.

## Resources

- [ScalePad Core API Documentation](https://developer.scalepad.com/)
- [ScalePad Community](https://community.scalepad.com/)
- [n8n Documentation](https://docs.n8n.io/)

## Related Packages

- [n8n-nodes-quoter](https://www.npmjs.com/package/n8n-nodes-quoter) - Quoter API for quote management

## Version History

### 1.0.0
- Initial release
- ScalePad Core API support (read-only)
- Lifecycle Manager integration
- 9 resources with Get and Get Many operations
- Automatic pagination
- Advanced filtering and sorting
- Comprehensive error handling

## Support

- **GitHub Issues**: [Report a bug](https://github.com/ajoshuasmith/n8n-nodes-scalepad/issues)
- **ScalePad Community**: [community.scalepad.com](https://community.scalepad.com/)

## License

[MIT](LICENSE)

## Author

ScalePad Community
