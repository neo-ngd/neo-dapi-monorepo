# Neo Provider

A JavaScript Neo Provider API for consistency across clients and applications.

In the Neo web application ("dapp") ecosystem, key management software ("wallets") expose their API via a JavaScript object in the web page. This object is called "the Provider".

Historically, Provider implementations have exhibited conflicting interfaces and behaviors between wallets. This project formalizes the Neo Provider API to promote wallet interoperability. It is designed to be minimal, event-driven, and agnostic of transport and RPC protocols. Its functionality is easily extended by defining new RPC methods and `message` event types.

## API Reference

### Methods

#### request

> The `request` method is intended as a transport- and protocol-agnostic wrapper function for Remote Procedure Calls (RPCs).

```
interface RequestArguments<T = any> {
  method: string;
  params?: T;
}

NeoProvider.request<R = any, P = any>(args: RequestArguments<P>): Promise<R>;
```

The Provider should identify the requested RPC method by the value of `RequestArguments.method`.

If the requested RPC method takes any parameters, the Provider should accept them as the value of `RequestArguments.params`.

RPC requests should be handled such that the returned Promise either resolves with a value per the requested RPC method’s specification, or rejects with an error.

If resolved, the Promise should resolve with a result per the RPC method’s specification.

If the returned Promise rejects, it should reject with a `ProviderRpcError` as specified in the [RPC Errors](#rpc-errors) section below.

<h5><a id="rpc-errors"></a>RPC Errors</h5>

```
export interface ProviderRpcError extends Error {
  code: number;
  data?: any;
}
```

- message
  - should be a human-readable string
  - should adhere to the RPC method’s specification
- code
  - should be an integer number
  - should adhere to the RPC method’s specification
- Data
  - should contain any other useful information about the error

#### on

Same as the Node.js [`EventEmitter` API](https://nodejs.org/api/events.html).

#### removeListener

Same as the Node.js [`EventEmitter` API](https://nodejs.org/api/events.html).

### Events

#### connect

#### disconnect 

#### message

#### networkChanged

#### accountChanged

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
