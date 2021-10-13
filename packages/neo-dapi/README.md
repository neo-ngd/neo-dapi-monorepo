# Neo dAPI

API for dApps on Neo blockchain.

When using Neo dAPI, a suitable Neo Provider is required. The definition of Neo Provider can be found [here](../neo-provider).

This library is written in TypeScript, so all the methods and objects are typed. It is therefore usable in TypeScript projects as well as vanilla JavaScript projects.

## Getting Started

This library can be used as CommonJS/ES module or directly referencing in web page html.

### Install CommonJS/ES module

```
npm install @neongd/neo-dapi
```

or

```
yarn add @neongd/neo-dapi
```

### Import CommonJS

```
const NeoDapi = require('@neongd/neo-dapi').NeoDapi;
```

### Import ES module

```
import { NeoDapi } from '@neongd/neo-dapi';
```

### Web require

The index.js file under the '/dist/umd' folder needs to be referenced from the page:

```
<script src="./dist/umd/index.js"></script>
```

The use of the code is required under the global namespace of `neoDapi`.

```
const NeoDapi = neoDapi.NeoDapi;
```

### Initialization

Create a Neo dAPI instance requires a Neo Provider, assuming we already have one (e.g., window.neo, window.OneGate):

```
const dapi = new NeoDapi(window.neo);
```

### Example

Examples of usage can be found in [Neo dAPI Demo](https://github.com/neo-ngd/neo-dapi-monorepo-demo).

## API Reference

### Methods

#### getProvider

##### Description

Get information about the provider, including who this provider is, the version of their dAPI, and the NEP that the interface is compatible with.

##### Parameters

_(none)_

##### Returns

`: Provider` - a provider object with following members:

- `name: string` - The name of the provider
- `website: string` - The website of the provider
- `version: string` - The version of the dAPI that the the provider supports
- `compatibility: string[]` - A list of all applicable NEPs which the provider supports
- `extra: object` - This object can contain any attributes specific to the provider, such as an app theme

##### Example

```
/* Example */
const provider = await dapi.getProvider();

/* Example Response */
{
  name: 'Awesome Wallet',
  website: 'https://awesome-wallet.org/',
  version: '1.0.0',
  compatibility: [
    'NEP-14',
    'NEP-23',
    'NEP-29'
  ],
  extra: {
    theme: 'Dark Mode',
    currency: 'USD'
  }
}
```

#### getNetworks

##### Description

Get the networks the provider has available to connect to, along with the default network the provider is currently set to.

##### Parameters

_(none)_

##### Returns

`: Networks` - a networks object with following members:

- `networks: string[]` - Array of network names the provider has available for the dApp developer to connect to
- `defaultNetwork: string` - Network the provider is currently set to

##### Example

```
/* Example */
const networks = await dapi.getNetworks();

/* Example Response */
{
  networks: ["MainNet", "TestNet"],
  defaultNetwork: "TestNet"
}
```

#### getAccount

##### Description

Get the account that is currently connected to the dApp.

##### Parameters

_(none)_

##### Returns

`: Account` - an account object with following members:

- `address: string` - Address of the connected account
- `publicKey: string` - Public key of the connected account
- `label?: string` - A label the users has set to identify their account

##### Example

```
/* Example */
const account = await dapi.getAccount();

/* Example Response */
{
  address: 'NXufgyw4AAST8tkLqZ5AtFKErjPzPEwnQp',
  publicKey: '0267c8a9872df89d8da5bcb5ae6a30966495bbd6721d2a68d37ba2b842ea09b4c6',
  label: 'My Account'
}
```

#### getNep17Balances

##### Description

Get nep17 balances of a specific asset for the given account.

If the asset is omited, all asset balances will be returned.

#### getBlockCount

#### getBlock

#### getTransaction

#### getApplicationLog

#### getStorage

#### invokeRead

#### invokeReadMulti

#### invoke

#### invokeMulti

### Events

Events related functions are provided by [Neo Provider](../neo-provider#events).

### Errors

The errors thrown by the dAPI methods have a code member and descriptive message member. The following list contains all possible error codes and associated messages:

| Code   | Message             | Description                                        |
| ------ | ------------------- | -------------------------------------------------- |
| -32700 | Parse error         | Invalid JSON                                       |
| -32600 | Invalid request     | JSON is not a valid request object                 |
| -32601 | Method not found    | Method does not exist                              |
| -32602 | Invalid params      | Invalid method parameters                          |
| -32603 | Internal error      | Error due to faulty logic or coding in the program |
| -32000 | Network error       | Underlying network error                           |
| -32001 | User rejected       | The user rejected the request                      |
| -32002 | Unsupported network | The target network is not supported                |
| -32003 | No account          | Provider has no account                            |
| -32004 | Insufficient funds  | Insufficient funds                                 |
| -32005 | Remote rpc error    | Error when calling remote rpc service              |

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
