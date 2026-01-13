# n8n-nodes-scalepad

This is an n8n community node that provides comprehensive integration with ScalePad's suite of products:

- **ScalePad Core API** - Access operational and financial insights from PSA data
- **Lifecycle Manager** - Manage hardware assets, warranties, and lifecycle tracking
- **Quoter API** - Automate quote creation and management

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### npm

```bash
npm install n8n-nodes-scalepad
```

### n8n

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-scalepad` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installation, restart n8n to load the new nodes.

## Nodes

This package contains two nodes:

### 1. ScalePad Core

Interact with ScalePad Core API and Lifecycle Manager to access:

**Resources:**
- **Clients** - Retrieve client/customer information
- **Contacts** - Access contact details
- **Contracts** - Manage contract records
- **Hardware Assets** - View hardware asset data
- **Hardware Lifecycle** - Track hardware lifecycle and warranty information
- **Members** - Access team member information
- **Opportunities** - View sales opportunities
- **SaaS** - Retrieve SaaS subscription data
- **Tickets** - Access support ticket records

**Operations:**
- Get (retrieve single record by ID)
- Get Many (retrieve multiple records with filtering and sorting)

**Features:**
- Automatic pagination handling (up to 200 records per request)
- Advanced filtering with operators (equals, not equals, contains, greater than, less than)
- Sorting capabilities (ascending/descending)
- Rate limit handling (50 requests per 5 seconds)
- Comprehensive error messages

### 2. ScalePad Quoter

Interact with ScalePad Quoter API for quote and customer management:

**Resources:**
- **Items** - Manage products and services
- **Quotes** - Create and manage quotes
- **Customers** - Manage customer records
- **Templates** - Access quote templates

**Operations:**
- Create
- Get (retrieve single record by ID)
- Get Many (retrieve multiple records)
- Update (partial updates using PATCH)
- Delete

**Features:**
- Full CRUD operations
- OAuth 2.0 authentication with automatic token refresh
- Field selection for optimized API responses
- Automatic pagination (up to 100 records per request)
- Rate limit handling (5 requests per second)
- Comprehensive error handling with Quoter-specific error codes

## Credentials

### ScalePad Core API

**Authentication:** API Key

**Setup:**
1. Sign in to [ScalePad Hub](https://hub.scalepad.com)
2. Navigate to **API (BETA)** in the top menu
3. Create a new API key:
   - Enter a descriptive name
   - Set expiry (default: 2 years)
   - Click **+ Generate**
4. Copy the API key immediately (it won't be shown again)

**Requirements:**
- Administrator permissions
- ScalePad Partner account

**Configuration in n8n:**
- **API Key**: Your generated API key
- **Environment**: Production or Sandbox

### ScalePad Quoter OAuth2 API

**Authentication:** OAuth 2.0 Client Credentials

**Setup:**
1. Sign in to [Quoter](https://app.quoter.com)
2. Navigate to **Account > API Keys** (requires Account Owner role)
3. Generate OAuth credentials:
   - Click **Create API Key**
   - Save the Client ID and Client Secret
4. Use these credentials in n8n

**Requirements:**
- Account Owner permissions
- Access tokens are valid for 1 hour and refresh automatically

**Configuration in n8n:**
- **Client ID**: Your OAuth Client ID
- **Client Secret**: Your OAuth Client Secret

## Usage Examples

### Example 1: Get All Clients with Active Contracts

```
Node: ScalePad Core
Resource: Client
Operation: Get Many
Return All: true
Additional Fields > Filter:
  - Field: status
  - Operator: equals
  - Value: active
```

### Example 2: Create a Quote from Template

```
Node: ScalePad Quoter
Resource: Quote
Operation: Create
Customer ID: {{$json["customer_id"]}}
Quote Name: Monthly Services - {{$json["month"]}}
Additional Fields:
  - Template ID: {{$json["template_id"]}}
  - Valid Until: {{$json["expiry_date"]}}
```

### Example 3: Monitor Hardware Approaching End of Life

```
Node: ScalePad Core
Resource: Hardware Lifecycle
Operation: Get Many
Return All: true
Additional Fields:
  - EOL Status: approaching_eol
```

### Example 4: Bulk Update Item Prices

```
Node 1: ScalePad Quoter - Get Many Items
Node 2: Function - Calculate new prices
Node 3: ScalePad Quoter - Update Item
  Resource: Item
  Operation: Update
  Item ID: {{$json["id"]}}
  Update Fields:
    - Price: {{$json["new_price"]}}
```

## API Limits and Best Practices

### Rate Limits

**ScalePad Core API:**
- Limit: 50 requests per 5 seconds
- The node automatically handles rate limit errors with descriptive messages

**Quoter API:**
- Limit: 5 requests per second
- Implement delays between bulk operations if needed

### Pagination

**ScalePad Core:**
- Maximum: 200 records per request
- Uses cursor-based pagination
- "Return All" option automatically handles pagination

**Quoter:**
- Maximum: 100 records per request
- Uses page-based pagination
- "Return All" option automatically handles pagination

### Performance Tips

1. **Use field selection** (Quoter API): Only request fields you need
   ```
   Options > Fields: id,name,price
   ```

2. **Apply filters**: Reduce data transfer by filtering at the API level
   ```
   Additional Fields > Client ID: specific-client-id
   ```

3. **Limit results**: Use pagination limits for large datasets

4. **Batch operations**: Group related operations to minimize API calls

## Error Handling

Both nodes provide comprehensive error handling:

### Common Errors

**Authentication Errors (401):**
- ScalePad Core: Check API key validity and expiration
- Quoter: OAuth token may have expired - reconnect credentials

**Rate Limit Errors (429):**
- Implement delays between operations
- Use "Return All" cautiously with large datasets

**Not Found (404):**
- Verify resource IDs
- Ensure you have access to the requested resource

**Validation Errors (400):**
- Check required fields
- Verify data formats (dates, numbers, etc.)

### Error Response Format

Errors include:
- HTTP status code
- Error message
- Detailed description
- Suggested resolution (when applicable)

## Development

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting

```bash
npm run lint
npm run lintfix
```

### Format

```bash
npm run format
```

## Resources

- [ScalePad Core API Documentation](https://developer.scalepad.com/)
- [Quoter API Documentation](https://docs.quoter.com/api)
- [ScalePad Community](https://community.scalepad.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## Version History

### 1.0.0
- Initial release
- ScalePad Core API support (read-only operations)
- Lifecycle Manager integration
- Quoter API support (full CRUD)
- OAuth 2.0 and API Key authentication
- Comprehensive error handling
- Automatic pagination
- Rate limit management

## Support

For issues, questions, or contributions:
- GitHub Issues: [Report a bug](https://github.com/ajoshuasmith/n8n-nodes-scalepad/issues)
- ScalePad Support: [community.scalepad.com](https://community.scalepad.com/)

## License

MIT

## Author

ScalePad Community

---

**Note:** ScalePad Core API is currently in beta with read-only access. Full CRUD operations will be available in future releases based on API updates.
