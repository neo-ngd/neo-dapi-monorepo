# Neo Provider

A JavaScript Neo Provider API for consistency across dApps and wallets.

In the Neo web application ("dApp") ecosystem, key management software ("wallets") expose their API via a JavaScript object in the web page. This object is called "the Provider".

Historically, Provider implementations have exhibited conflicting interfaces and behaviors between wallets. This project defines some interfaces that the wallet should comply with to improve the interoperability of dapps and wallets. It is designed to be minimal, event-driven, and agnostic of transport and RPC protocols. Its functionality is easily extended by defining new RPC methods and `message` event types.

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

RPC requests should be handled such that the returned Promise either resolves with a value per the requested RPC method's specification, or rejects with an error.

If resolved, the Promise should resolve with a result per the RPC method's specification.

If the returned Promise rejects, it should reject with a `ProviderRpcError` as specified in the [RPC Errors](#rpc-errors) section below.

#### on

Should be implemented per the Node.js [`EventEmitter` API](https://nodejs.org/api/events.html).

#### removeListener

Should be implemented per the Node.js [`EventEmitter` API](https://nodejs.org/api/events.html).

### Events

#### connect

See the section [Connectivity](#connectivity) for the definition of "connected".

If the Provider becomes connected, the Provider should emit the event named `connect`.

#### disconnect

See the section [Connectivity](#connectivity) for the definition of "disconnected".

If the Provider becomes disconnected, the Provider should emit the event named `disconnect` with value `error: ProviderRpcError`, per the interfaced defined in the [RPC Errors](#rpc-errors) section. The value of the error's `code` property should follow the [status codes for `CloseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes).

#### message

> The `message` event is intended for arbitrary notifications not covered by other events.

When emitted, the `message` event be emitted with an object argument of the following form:

```
export interface ProviderMessage {
  type: string;
  data?: any;
}
```

#### networkChanged

If the default network of the Provider changes, the Provider should emit the event named `networkChanged` with value `network: string`.

#### accountChanged

If the default account of the Provider changes, the Provider should emit the event named `accountChanged` with value `account: string`.

### RPC Errors

```
export interface ProviderRpcError extends Error {
  code: number;
  data?: any;
}
```

- message
  - should be a human-readable string
  - should adhere to the specifications in the [Error Standards](#error-standards) section below
- code
  - should be an integer number
  - should adhere to the specifications in the [Error Standards](#error-standards) section below
- data
  - should contain any other useful information about the error

### Error Standards

`ProviderRpcError` codes and messages should follow these conventions, in order of priority:

1. Any errors mandated by the erroring RPC method's specification

2. The [`CloseEvent` status codes](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes)

### Connectivity

The Provider is said to be "connected" when it can service RPC requests to at least one network.

The Provider is said to be "disconnected" when it cannot service RPC requests to any network at all.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
