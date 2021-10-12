# Neo Dapi

API for dApps on Neo blockchain.

When using Neo Dapi, a suitable Neo Provider is required. The definition of Neo Provider can be found in [here](../neo-provider).

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
var NeoDapi = require('@neongd/neo-dapi').NeoDapi;
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
var NeoDapi = neoDapi.NeoDapi;
```

### Initialization

Create a Neo Dapi instance requires a Neo Provider, assuming we already have one (eg: window.neo):

```
var dapi = new NeoDapi(window.neo);
```

### Example

Examples of usage can be found in [Neo Dapi Demo](https://github.com/neo-ngd/neo-dapi-monorepo-demo).

## API Reference

### Methods

getProvider

getAccount

getPublicKey

getNetworks

getNep17Balances

getBlockCount

getBlock

getTransaction

getApplicationLog

getStorage

invokeRead

invokeReadMulti

invoke

invokeMulti

### Error Codes

| Code   | Message          | Meaning                            |
| ------ | ---------------- | ---------------------------------- |
| -32700 | Parse error      | Invalid JSON                       |
| -32600 | Invalid request  | JSON is not a valid request object |
| -32601 | Method not found | Method does not exist              |
| -32602 | Invalid params   | Invalid method parameters          |
| -32603 | Internal error   | Internal JSON-RPC error            |

-32700 ParseError

-32600 InvalidRequest

-32601 MethodNotFound

-32602 InvalidParams

-32603 InternalError

-32000 NetworkError

100 InternalError

101 UnsupportedNetwork

102 NoAccount

103 MalformedInput

104 InsufficientFunds

105 RemoteRpcError

106 UserRejected

| Status code | Name                  | Description                                                              |
| ----------- | --------------------- | ------------------------------------------------------------------------ |
| 4001        | User Rejected Request | The user rejected the request.                                           |
| 4100        | Unauthorized          | The requested method and/or account has not been authorized by the user. |
| 4200        | Unsupported Method    | The Provider does not support the requested method.                      |
| 4900        | Disconnected          | The Provider is disconnected from all chains.                            |
| 4901        | Chain Disconnected    | The Provider is not connected to the requested chain.                    |

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
