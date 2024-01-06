export enum MethodName {
  GetProvider = 'getProvider',
  GetNetworks = 'getNetworks',
  GetAccount = 'getAccount',
  GetBlockCount = 'getBlockCount',
  GetBlock = 'getBlock',
  GetTransaction = 'getTransaction',
  GetApplicationLog = 'getApplicationLog',
  GetStorage = 'getStorage',
  GetNep17Balances = 'getNep17Balances',
  InvokeRead = 'invokeRead',
  InvokeReadMulti = 'invokeReadMulti',
  Invoke = 'invoke',
  InvokeMulti = 'invokeMulti',
  SignMessage = 'signMessage',
  SignMessageWithoutSalt = 'signMessageWithoutSalt',
  SignTransaction = 'signTransaction',
  BroadcastTransaction = 'broadcastTransaction',
}
