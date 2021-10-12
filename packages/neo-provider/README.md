# Neo Provider

A JavaScript Neo Provider API for consistency across clients and applications.

In the Neo web application ("dapp") ecosystem, key management software ("wallets") expose their API via a JavaScript object in the web page. This object is called "the Provider".

Historically, Provider implementations have exhibited conflicting interfaces and behaviors between wallets. This project formalizes the Neo Provider API to promote wallet interoperability. It is designed to be minimal, event-driven, and agnostic of transport and RPC protocols. Its functionality is easily extended by defining new RPC methods and `message` event types.

## API Reference

### Methods

request

on

removeListener

### Events

connect

disconnect

message

networkChanged

accountChanged

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.
