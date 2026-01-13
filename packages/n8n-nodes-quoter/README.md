# n8n-nodes-quoter

This is an n8n community node for **Quoter by ScalePad**. It provides comprehensive integration with the Quoter API for automated quote creation, management, and CRM integration for MSPs.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Usage](#usage) | [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-quoter` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installation, restart n8n to load the node.

### Manual Installation

```bash
npm install n8n-nodes-quoter
```

## Operations

This node provides full CRUD operations for the Quoter API.

### Resources Available

| Resource | Description | Operations |
|----------|-------------|------------|
| **Items** | Products and services for quotes | Create, Get, Get Many, Update, Delete |
| **Quotes** | Quote records and proposals | Create, Get, Get Many, Update, Delete |
| **Customers** | Customer/client records | Create, Get, Get Many, Update, Delete |
| **Templates** | Reusable quote templates | Get, Get Many |

### Operations

- **Create** - Add new records (POST)
- **Get** - Retrieve a single record by ID (GET)
- **Get Many** - Retrieve multiple records with pagination (GET)
- **Update** - Partial update using PATCH (only send changed fields)
- **Delete** - Remove records (DELETE)

### Features

✅ **Full CRUD Operations** - Complete create, read, update, delete support
✅ **OAuth 2.0 Authentication** - Secure client credentials flow with auto-refresh
✅ **Field Selection** - Request only the fields you need for optimized performance
✅ **Automatic Pagination** - Handles up to 100 records per request
✅ **Rate Limit Handling** - Automatic handling of 5 req/sec limit
✅ **Quoter Error Format** - Detailed Quoter-specific error messages

## Credentials

### Authentication: OAuth 2.0

**Requirements:**
- Quoter account
- Account Owner permissions

**Setup Steps:**

1. Sign in to [Quoter](https://app.quoter.com)
2. Navigate to **Account > API Keys**
3. Click **Create API Key**
4. Save the **Client ID** and **Client Secret**
5. Enter these credentials in n8n

**Configuration in n8n:**

- **Client ID**: Your OAuth Client ID
- **Client Secret**: Your OAuth Client Secret

**Token Information:**
- Access tokens are valid for **1 hour**
- Tokens refresh automatically
- No manual intervention needed

## Usage

### Example 1: Create a Quote from Template

```
Resource: Quote
Operation: Create
Customer ID: {{$json["customer_id"]}}
Quote Name: Monthly Services - {{$json["month"]}}
Additional Fields:
  Template ID: {{$json["template_id"]}}
  Valid Until: {{$now.plus({days: 30})}}
```

### Example 2: Bulk Update Item Prices

**Workflow:**
1. **Node 1**: Get Many Items
2. **Node 2**: Function - Calculate new prices
3. **Node 3**: Update Item
   ```
   Resource: Item
   Operation: Update
   Item ID: {{$json["id"]}}
   Update Fields:
     Price: {{$json["new_price"]}}
   ```

### Example 3: Get Items with Field Selection

```
Resource: Item
Operation: Get Many
Return All: false
Limit: 50
Options:
  Fields: id,name,price,type
```

### Example 4: Create Customer and Quote in One Flow

**Node 1 - Create Customer:**
```
Resource: Customer
Operation: Create
Name: {{$json["company_name"]}}
Additional Fields:
  Email: {{$json["email"]}}
  Phone: {{$json["phone"]}}
```

**Node 2 - Create Quote:**
```
Resource: Quote
Operation: Create
Customer ID: {{$node["Node1"].json["id"]}}
Quote Name: Initial Proposal
```

### Example 5: Monitor Recent Quotes

```
Resource: Quote
Operation: Get Many
Return All: true
Options:
  Fields: id,name,customer_id,total,status,created_at
```

## API Limits

### Rate Limits

- **Limit**: 5 requests per second
- **Automatic Handling**: The node handles rate limit errors
- **Best Practice**: For bulk operations, consider adding small delays

### Pagination

- **Maximum**: 100 records per request
- **Type**: Page-based pagination
- **Auto-pagination**: Enable "Return All" to automatically fetch all pages

### Field Selection

Optimize performance by requesting only needed fields:

```
Options > Fields: id,name,price
```

Available for all "Get Many" operations.

## Error Handling

The node provides Quoter-specific error handling:

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| **401** | OAuth token invalid/expired | Reconnect credentials in n8n |
| **400** | Bad request / Validation error | Check required fields and data formats |
| **404** | Resource not found | Verify resource ID exists |
| **429** | Rate limit exceeded | Reduce request frequency |

### Error Response Format

Errors include:
- Error key (e.g., `ERR_AUTHORIZATION_TOKEN_INVALID`)
- HTTP status code
- Error title and description
- Suggested resolution

### Common Errors

**ERR_AUTHORIZATION_TOKEN_INVALID:**
- OAuth token expired (1 hour lifetime)
- Solution: Reconnect your credentials in n8n

**Pagination page requested too high:**
- Requested page number doesn't exist
- Solution: Check total pages available

## API Operations

### Partial Updates (PATCH)

The Update operation uses PATCH, allowing partial updates:

```
Update Fields:
  Price: 99.99  // Only update price, leave other fields unchanged
```

No need to send the entire object - only changed fields.

### Creating Quotes

When creating quotes, you can:
- Use existing templates
- Add line items
- Set pricing and terms
- Link to customers

### Managing Items

Items represent products/services and support:
- One-time and recurring pricing
- Categories and vendors
- Custom fields
- Bundles

## Resources

- [Quoter API Documentation](https://docs.quoter.com/api)
- [Quoter Support](https://support.quoter.com/)
- [n8n Documentation](https://docs.n8n.io/)

## Related Packages

- [n8n-nodes-scalepad](https://www.npmjs.com/package/n8n-nodes-scalepad) - ScalePad Core API and Lifecycle Manager

## Version History

### 1.0.0
- Initial release
- Full CRUD operations for all resources
- OAuth 2.0 authentication
- 4 resources: Items, Quotes, Customers, Templates
- Field selection support
- Automatic pagination
- Comprehensive error handling

## Support

- **GitHub Issues**: [Report a bug](https://github.com/ajoshuasmith/n8n-nodes-scalepad/issues)
- **Quoter Support**: [support.quoter.com](https://support.quoter.com/)

## License

[MIT](LICENSE)

## Author

ScalePad Community
