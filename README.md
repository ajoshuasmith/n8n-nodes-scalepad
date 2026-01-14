# ScalePad n8n Community Nodes

This monorepo contains two separate n8n community node packages for ScalePad's suite of MSP tools:

## Packages

### 📦 [n8n-nodes-scalepad](./packages/n8n-nodes-scalepad)

**ScalePad Core API + Lifecycle Manager**

Integrate with ScalePad's operational and financial insights platform. Access client data, contracts, tickets, hardware assets, and lifecycle management.

- **Authentication**: API Key
- **API Status**: Beta (Read-Only)
- **Rate Limit**: 50 requests per 5 seconds
- **Resources**: 9 (Clients, Contacts, Contracts, Hardware Assets, Hardware Lifecycle, Members, Opportunities, SaaS, Tickets)

```bash
npm install n8n-nodes-scalepad
```

[View Documentation →](./packages/n8n-nodes-scalepad/README.md)

---

### 📦 [n8n-nodes-quoter](./packages/n8n-nodes-quoter)

**Quoter by ScalePad**

Automate quote creation and management. Full CRUD operations for items, quotes, customers, and templates.

- **Authentication**: OAuth 2.0
- **API Status**: Full CRUD
- **Rate Limit**: 5 requests per second
- **Resources**: 4 (Items, Quotes, Customers, Templates)

```bash
npm install n8n-nodes-quoter
```

[View Documentation →](./packages/n8n-nodes-quoter/README.md)

---

## Why Two Packages?

While both products are part of the ScalePad ecosystem, they have distinct characteristics:

| Aspect | ScalePad Core | Quoter |
|--------|---------------|--------|
| **Base URL** | api.scalepad.com | api.quoter.com |
| **Authentication** | API Key | OAuth 2.0 |
| **Operations** | Read-Only (Beta) | Full CRUD |
| **Rate Limits** | 50 req/5 sec | 5 req/sec |
| **Permissions** | Administrator | Account Owner |

Separating them into independent packages provides:
- ✅ Users can install only what they need
- ✅ Independent versioning and updates
- ✅ Cleaner separation of concerns
- ✅ Follows n8n community best practices

## Quick Start

### Install Both Packages

```bash
# Install ScalePad Core
npm install n8n-nodes-scalepad

# Install Quoter
npm install n8n-nodes-quoter
```

### Install via n8n Community Nodes

1. Go to **Settings > Community Nodes** in n8n
2. Click **Install**
3. Enter the package name:
   - `n8n-nodes-scalepad` for ScalePad Core
   - `n8n-nodes-quoter` for Quoter
4. Click **Install**
5. Restart n8n

## Features

### n8n-nodes-scalepad

- ✅ 9 ScalePad resources
- ✅ Automatic cursor-based pagination
- ✅ Advanced filtering and sorting
- ✅ Hardware lifecycle tracking
- ✅ Warranty and EOL monitoring
- ✅ Client and ticket management

### n8n-nodes-quoter

- ✅ Full CRUD operations
- ✅ OAuth 2.0 with auto-refresh
- ✅ Field selection for performance
- ✅ Quote creation from templates
- ✅ Customer management
- ✅ Item and pricing automation

## Example Workflows

### End-to-End Client Onboarding

Combine both nodes for comprehensive automation:

1. **ScalePad Core**: Get new client details
2. **Quoter**: Create customer record
3. **Quoter**: Generate welcome quote from template
4. **ScalePad Core**: Monitor hardware lifecycle
5. **Quoter**: Create quarterly service quotes

### Hardware Lifecycle to Quote Automation

1. **ScalePad Core**: Get hardware approaching EOL
2. **Function**: Calculate replacement costs
3. **Quoter**: Create quote with replacement items
4. **Notification**: Alert team of pending renewals

## Development

Each package is independently buildable and publishable.

### Build a Package

```bash
cd packages/n8n-nodes-scalepad
npm install
npm run build
```

### Test Locally

```bash
cd packages/n8n-nodes-scalepad
npm link
cd ~/.n8n/nodes
npm link n8n-nodes-scalepad
```

Restart n8n to load the linked package.

### Publish to npm

```bash
cd packages/n8n-nodes-scalepad
npm publish

cd ../n8n-nodes-quoter
npm publish
```

## Project Structure

```
n8n-nodes-scalepad/
├── packages/
│   ├── n8n-nodes-scalepad/
│   │   ├── credentials/
│   │   │   └── ScalePadCoreApi.credentials.ts
│   │   ├── nodes/
│   │   │   ├── ScalePadCore/
│   │   │   │   ├── ScalePadCore.node.ts
│   │   │   │   ├── scalepad.svg
│   │   │   │   └── descriptions/
│   │   │   │       ├── ClientDescription.ts
│   │   │   │       ├── ContactDescription.ts
│   │   │   │       ├── ...
│   │   │   └── shared/
│   │   │       ├── GenericFunctions.ts
│   │   │       └── types.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   └── n8n-nodes-quoter/
│       ├── credentials/
│       │   └── ScalePadQuoterOAuth2Api.credentials.ts
│       ├── nodes/
│       │   ├── ScalePadQuoter/
│       │   │   ├── ScalePadQuoter.node.ts
│       │   │   ├── quoter.svg
│       │   │   └── descriptions/
│       │   │       ├── ItemDescription.ts
│       │   │       ├── QuoteDescription.ts
│       │   │       ├── ...
│       │   └── shared/
│       │       ├── GenericFunctions.ts
│       │       └── types.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── LICENSE
└── README.md (this file)
```

## Resources

### Documentation

- [ScalePad Core API Docs](https://developer.scalepad.com/)
- [Quoter API Docs](https://docs.quoter.com/api)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

### Support

- **GitHub Issues**: [Report a bug](https://github.com/ajoshuasmith/n8n-nodes-scalepad/issues)
- **ScalePad Community**: [community.scalepad.com](https://community.scalepad.com/)
- **Quoter Support**: [support.quoter.com](https://support.quoter.com/)

### Community

- [n8n Community Forum](https://community.n8n.io/)
- [ScalePad Community](https://community.scalepad.com/)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Version History

### 1.0.0 (Latest)

**n8n-nodes-scalepad:**
- Initial release
- ScalePad Core API support (read-only)
- Lifecycle Manager integration
- 9 resources with filtering and sorting
- Automatic pagination

**n8n-nodes-quoter:**
- Initial release
- Full CRUD operations
- OAuth 2.0 authentication
- 4 resources with field selection
- Automatic pagination

## License

[MIT](LICENSE)

## Author

ScalePad Community

---

**Note**: Both packages are independently maintained. Check each package's README for specific documentation, features, and usage examples.
