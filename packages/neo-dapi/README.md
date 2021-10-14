# Neo dAPI

API for dApps on Neo blockchain.

When using Neo dAPI, a suitable Neo Provider is required. The definition of Neo Provider can be found [here](../neo-provider).

This library is written in TypeScript, so all the methods and objects are typed. It is therefore usable in TypeScript projects as well as vanilla JavaScript projects.

## Getting Started

This library can be used as CommonJS/ES module or directly referencing in web page html.

### Install CommonJS/ES module

```sh
npm install @neongd/neo-dapi
```

or

```sh
yarn add @neongd/neo-dapi
```

### Import CommonJS

```typescript
const NeoDapi = require('@neongd/neo-dapi').NeoDapi;
```

### Import ES module

```typescript
import { NeoDapi } from '@neongd/neo-dapi';
```

### Web require

The index.js file under the "/dist/umd" folder needs to be referenced from the page:

```html
<script src="./dist/umd/index.js"></script>
```

The use of the code is required under the global namespace of `neoDapi`.

```typescript
const NeoDapi = neoDapi.NeoDapi;
```

### Initialization

Create a Neo dAPI instance requires a Neo Provider, assuming we already have one (e.g., window.neo, window.OneGate):

```typescript
const dapi = new NeoDapi(window.neo);
```

### Example

Examples of usage can be found in [Neo dAPI Demo](https://github.com/neo-ngd/neo-dapi-monorepo-demo).

## API Reference

### Methods

#### getProvider

##### Description

Gets information about the provider, including who this provider is, the version of their dAPI, and the NEP that the interface is compatible with.

##### Parameters

_(none)_

##### Returns

`: Provider` - a provider object with following members:

- `name: string` - name of the provider
- `website: string` - website of the provider
- `version: string` - version of the dAPI that the the provider supports
- `compatibility: string[]` - a list of all applicable NEPs which the provider supports
- `extra: object` - this object can contain any attributes specific to the provider, such as an app theme

##### Example

```typescript
/* Example */
const provider = await dapi.getProvider();

/* Example Response */
({
  name: 'Awesome Wallet',
  website: 'https://awesome-wallet.org/',
  version: '1.0.0',
  compatibility: ['NEP-14', 'NEP-23', 'NEP-29'],
  extra: {
    theme: 'Dark Mode',
    currency: 'USD',
  },
});
```

#### getNetworks

##### Description

Gets the networks the provider has available to connect to, along with the default network the provider is currently set to.

##### Parameters

_(none)_

##### Returns

`: Networks` - a networks object with following members:

- `networks: string[]` - array of network names the provider has available for the dApp developer to connect to
- `defaultNetwork: string` - network the provider is currently set to

##### Example

```typescript
/* Example */
const networks = await dapi.getNetworks();

/* Example Response */
({
  networks: ['MainNet', 'TestNet'],
  defaultNetwork: 'TestNet',
});
```

#### getAccount

##### Description

Gets the account that is currently connected to the dApp.

##### Parameters

_(none)_

##### Returns

`: Account` - an account object with following members:

- `address: string` - address of the connected account
- `publicKey: string` - public key of the connected account
- `label?: string` - a label the users has set to identify their account

##### Example

```typescript
/* Example */
const account = await dapi.getAccount();

/* Example Response */
({
  address: 'NXufgyw4AAST8tkLqZ5AtFKErjPzPEwnQp',
  publicKey:
    '0267c8a9872df89d8da5bcb5ae6a30966495bbd6721d2a68d37ba2b842ea09b4c6',
  label: 'My Account',
});
```

#### getNep17Balances

##### Description

Gets NEP17 balances of a specific asset for the given account.

##### Parameters

1. `params: object` - an object with following members:
   - `address: string` - address to check balances
   - `assetHashes?: string` - NEP17 asset hashes to check balance, If omited, all NEP17 asset balances will be returned
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

: `Nep17Balance[]` - array of Nep17 balance object with following members:

- `assetHash: string` - NEP17 asset hash
- `amount: string` - Integer Value of the balance represented as a String

##### Example

```typescript
/* Example */
const balances = await dapi.getNep17Balances({
  address: 'NXufgyw4AAST8tkLqZ5AtFKErjPzPEwnQp',
  assetHashes: ['0xd2a4cff31913016155e38e474a2c06d08be276cf'],
});

/* Example Response */
[
  {
    assetHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
    amount: '10000000',
  },
];
```

#### getBlockCount

##### Description

Gets the block count of the blockchain.

##### Parameters

1. `params: object` - an object with following members:
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

: `number` - block count of target network

##### Example

```typescript
/* Example */
const count = await dapi.getBlockCount({});

/* Example Response */
26537;
```

#### getBlock

##### Description

Gets information about a specific block.

##### Parameters

1. `params: object` - an object with following members:
   - `blockIndex: number` - index of the block to get information about
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

: `null | Block` - `null` if no block is found, otherwise a block object returned from remote RPC

##### Example

```typescript
/* Example */
const block = await dapi.getBlock({ blockIndex: 26536 });

/* Example Response */
({
  hash: '0xd373a9afdbe57d79ad788196aa4ef37dbfb28c7d8f22ffa1ccbc236d56268bca',
  size: 5317,
  version: 0,
  previousBlockHash:
    '0x2f384bc40c608333fa9d67179d276381dea3dff33b11cfad8ae6a3b2afa15dce',
  merkleRoot:
    '0xefd4080cb996b8d44dcc313d207a5adb7ed614488a0d636bbfe9d37d157c8e9b',
  time: 1615348136186,
  index: 26536,
  primary: 6,
  nextConsensus: 'NiY2NJTPFPyqjrGtdEhQnryJpJbxnQTvpR',
  witnesses: [
    {
      invocation:
        'DEA2ZR0uduwN/5tFVCKoHJtAnSJINfqlRDcNXnYl0H0Jcb3YBy1M0G4Z1LB3PQMIb6J4kOtFm7TBL0B6vfPuDpigDEBLHKna+SPlL9vn755blCr3vxvc2HLP5dUch0isPARVDbg24QwVuvx3mbQ6awn0cQ/h+Jym/9xFo0MR0ddKXKzCDEAIcXyoqzFq4+3N9JtyK46LLeyx9ikidPLiXg9HWQk9Ps5wx9+XIe8zziS9dRAOqT4od7tW1SA6cRU3U8ZCexJ1DECxN+nyE15RaIvwpJ0JK3/RJvAM++YKou/ljVef5atDx9pce5nkuibfZzvzrjcoJF53qnP8ZSXBKThjrN2kGCxlDEBSVfUQAFNm4j4KihACjt5Kx1A9hN8RIDQkLw7udpcFm7Nf4PtDtucw7pS7WGEkmu3c+yt2BV3KeCzNBAreypb7',
      verification:
        'FQwhAwIkKx3O1j4b9+sUh29+8Ca3lWf5xb6D3hlD3Rhewo5oDCECDfiFi2b/TXsKamjRHd7cx9kNKmT/os0IfExdq/QVC0AMIQIXlUMAAYR4HlRHs/D7rOZk6pK34xInyOcbxOfNr8zbjgwhAl6ElJA7k9w2nwiivX4iH1dMddlnVZHwSQfLqdruuD0QDCEDhBXQvo3BK2HT47drmPRk36t/3e50Jxw14t5iS7UQI6YMIQPJscicbi1KvWKaLbi30DrO1RilZ5O8kPSYXvftPxtIGgwhA+irUYbh3qvNEOwOUJ3tT/+t5v3fU0rD4FBiaLrj/USmF0F7zmyl',
    },
  ],
  tx: [],
  confirmations: 50,
  nextBlockHash:
    '0x568b1d99c5abd460e4a05230d2a70bc7fd432b9f372354076eacd3b9f5cd399e',
});
```

#### getTransaction

##### Description

Gets information about a specific transaction.

##### Parameters

1. `params: object` - an object with following members:
   - `txid: string` - txid of the transaction to get information about
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

: `null | Transaction` - `null` if no transaction is found, otherwise a transaction object returned from remote RPC

##### Example

```typescript
/* Example */
const count = await dapi.getTransaction({
  txid: '0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c',
});

/* Example Response */
({
  hash: '0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c',
  size: 386,
  version: 0,
  nonce: 246876555,
  sender: 'NikhQp1aAD1YFCiwknhM5LQQebj4464bCJ',
  systemFee: '0.0999954',
  networkFee: '0.0235316',
  validUntilBlock: 5899,
  signers: [
    {
      account: '0xebae4ab3f21765e5f604dfdd590fdf142cfb89fa',
      scopes: 'None',
    },
    {
      account: '0x86df72a6b4ab5335d506294f9ce993722253b6e2',
      scopes: 'CalledByEntry',
    },
  ],
  attributes: [],
  script:
    'CwMA5AtUAgAAAAwU+on7LBTfD1nd3wT25WUX8rNKrusMFOK2UyJyk+mcTykG1TVTq7Smct+GFMAfDAh0cmFuc2ZlcgwUKLOtq3Jp+cIYHbPLdB6/VRkw4nBBYn1bUjk=',
  witnesses: [
    {
      invocation:
        'DEC31ZE1kiIFPan7qal/h9FYsD2LTk6Lf0m0Kbbh1GExUqTAfye7BDjyEylfR50/AVNQkr+g+jXXMHGcxF4MUYBQ',
      verification: 'DCECztQyOX3cRO26AxwLw7kz8o/dlnd5LXsg5sA23aqs8eILQZVEDXg=',
    },
    {
      invocation:
        'DED8PagPv03pnEbsxUY7XgFk/qniHcha36hDCzZsmaJkpFg5vbgxk5+QE46K0GFsNpsqDJHNToGD9jeXsPzSvD5T',
      verification:
        'EQwhAs7UMjl93ETtugMcC8O5M/KP3ZZ3eS17IObANt2qrPHiEQtBE43vrw==',
    },
  ],
  blockHash:
    '0x3d87f53c51c93fc08e5ccc09dbd9e21fcfad4dbea66af454bed334824a90262c',
  confirmations: 26,
  blockTime: 1612687482881,
});
```

#### getApplicationLog

##### Description

Gets the application log for a given transaction.

##### Parameters

1. `params: object` - an object with following members:
   - `txid: string` - txid of the transaction to get application log for
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

: `null | ApplicationLog` - `null` if no application log is found, otherwise an application log object returned from remote RPC

##### Example

```typescript
/* Example */
const applicationLog = await dapi.getApplicationLog({
  txid: '0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c',
});

/* Example Response */
({
  txid: '0x7da6ae7ff9d0b7af3d32f3a2feb2aa96c2a27ef8b651f9a132cfaad6ef20724c',
  executions: [
    {
      trigger: 'Application',
      vmState: 'HALT',
      exception: null,
      gasConsumed: '9999540',
      stack: [],
      notifications: [
        {
          contract: '0x70e2301955bf1e74cbb31d18c2f96972abadb328',
          eventName: 'Transfer',
          state: {
            type: 'Array',
            value: [
              {
                type: 'ByteString',
                value: '4rZTInKT6ZxPKQbVNVOrtKZy34Y=',
              },
              {
                type: 'ByteString',
                value: '+on7LBTfD1nd3wT25WUX8rNKrus=',
              },
              {
                type: 'Integer',
                value: '10000000000',
              },
            ],
          },
        },
      ],
    },
  ],
});
```

#### getStorage

##### Description

Reads the raw value in smart contract storage.

##### Parameters

1. `params: object` - an object with following members:
   - `scriptHash: string` - script hash of the smart contract to invoke a read on
   - `key: string` - key of the storage value to retrieve from the contract (base64-encoded)
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

: `null | string` - `null` if no value is found, otherwise an base64-encoded raw value

##### Example

```typescript
/* Example */
const value = await dapi.getStorage({
  scriptHash: '0x99042d380f2b754175717bb932a911bc0bb0ad7d',
  key: 'aGVsbG8=',
});

/* Example Response */
('d29ybGQ=');
```

#### invokeRead

##### Description

Executes a contract invocation in read-only mode.

##### Parameters

1. `params: object` - an object with following members:
   - `scriptHash: string` - script hash of the smart contract to invoke
   - `operation: string` - operation on the smart contract to call
   - `args?: Argument[]` - any input arguments for the operation
   - `signers?: Signer[]` - sender and the scope of signature
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

`: object` - an object with following members:

- `script: string` - the script which was run
- `state: string` - status of the invocation
- `exception: null | string` - error message of the invocation
- `gasConsumed: string` - estimated amount of GAS to be used to execute the invocation
- `stack: Argument[]` - an array of response arguments

##### Example

```typescript
/* Example */
const result = await dapi.invokeRead({
  scriptHash: '0xf61eebf573ea36593fd43aa150c055ad7906ab83',
  operation: 'transfer',
  args: [
    { type: 'Hash160', value: '0x86df72a6b4ab5335d506294f9ce993722253b6e2' },
    { type: 'Hash160', value: '0xebae4ab3f21765e5f604dfdd590fdf142cfb89fa' },
    { type: 'Integer', value: '10000' },
    { type: 'String', value: '' },
  ],
  signers: [
    {
      account: '0x86df72a6b4ab5335d506294f9ce993722253b6e2',
      scopes: 'CalledByEntry',
      allowedcontracts: [],
      allowedgroups: [],
    },
  ],
});

/* Example Response */
({
  script:
    'DAABECcMFPqJ+ywU3w9Z3d8E9uVlF/KzSq7rDBTitlMicpPpnE8pBtU1U6u0pnLfhhTAHwwIdHJhbnNmZXIMFIOrBnmtVcBQoTrUP1k26nP16x72QWJ9W1I=',
  state: 'HALT',
  gasConsumed: '999972',
  exception: null,
  stack: [
    {
      type: 'Boolean',
      value: true,
    },
  ],
});
```

#### invokeReadMulti

##### Description

Same as InvokeRead, but allows to execute multiple read-only invocation in one request.

##### Parameters

1. `params: object` - an object with following members:
   - `invokeArgs: Invocation[]` - array of invocation object with following members:
     - `scriptHash: string` - script hash of the smart contract to invoke
     - `operation: string` - operation on the smart contract to call
     - `args?: Argument[]` - any input arguments for the operation
   - `signers?: Signer[]` - sender and the scope of signature
   - `network?: string` - network to submit this request to. If omitted, will default to network the provider is currently set to

##### Returns

`: object` - an object with following members:

- `script: string` - the script which was run
- `state: string` - status of the invocation
- `exception: null | string` - error message of the invocation
- `gasConsumed: string` - estimated amount of GAS to be used to execute the invocation
- `stack: Argument[]` - an array of response arguments

##### Example

```typescript
/* Example */
const result = await dapi.invokeReadMulti({
  invokeArgs: [
    {
      scriptHash: '0xf61eebf573ea36593fd43aa150c055ad7906ab83',
      operation: 'transfer',
      args: [
        {
          type: 'Hash160',
          value: '0x86df72a6b4ab5335d506294f9ce993722253b6e2',
        },
        {
          type: 'Hash160',
          value: '0xebae4ab3f21765e5f604dfdd590fdf142cfb89fa',
        },
        { type: 'Integer', value: '10000' },
        { type: 'String', value: '' },
      ],
    },
  ],
  signers: [
    {
      account: '0x86df72a6b4ab5335d506294f9ce993722253b6e2',
      scopes: 'CalledByEntry',
      allowedcontracts: [],
      allowedgroups: [],
    },
  ],
});

/* Example Response */
({
  script:
    'DAABECcMFPqJ+ywU3w9Z3d8E9uVlF/KzSq7rDBTitlMicpPpnE8pBtU1U6u0pnLfhhTAHwwIdHJhbnNmZXIMFIOrBnmtVcBQoTrUP1k26nP16x72QWJ9W1I=',
  state: 'HALT',
  gasConsumed: '999972',
  exception: null,
  stack: [
    {
      type: 'Boolean',
      value: true,
    },
  ],
});
```

#### invoke

##### Description

Triggers a contract invocation that requires a user's signature.

#### invokeMulti

##### Description

Same as Invoke, but allows to execute multiple invokes in the same transaction.

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
