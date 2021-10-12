# Neo Dapi

API for dApps on Neo blockchain.

When using Neo Dapi, a suitable Neo Provider is required. The definition of Neo Provider can be found [here](../neo-provider).

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

#### getProvider

##### Description

##### Parameters

##### Returns

##### Example

#### getAccount

#### getPublicKey

#### getNetworks

#### getNep17Balances

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

The errors thrown by the Dapi methods have a code member and descriptive message member. The following list contains all possible error codes and associated messages:

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
| -32003 | No account          | Wallet has no account                              |
| -32004 | Insufficient funds  | Insufficient funds                                 |
| -32005 | Remote rpc error    | Error when calling remote rpc service              |

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
