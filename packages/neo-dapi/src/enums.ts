export enum MethodName {
  GetAccount = 'getAccount',
  GetApplicationLog = 'getApplicationLog',
  GetNep17Balances = 'getNep17Balances',
  GetBlock = 'getBlock',
  GetBlockCount = 'getBlockCount',
  GetNetworks = 'getNetworks',
  GetProvider = 'getProvider',
  GetStorage = 'getStorage',
  GetTransaction = 'getTransaction',
  InvokeRead = 'invokeRead',
  InvokeReadMulti = 'invokeReadMulti',
  Invoke = 'invoke',
  InvokeMulti = 'invokeMulti',
  SignMessage = 'signMessage',
  VerifyMessage = 'verifyMessage',
  SignTransaction = 'signTransaction',
  RelayTransaction = 'relayTransaction',
}

export enum ArgumentType {
  Any = 'Any',
  Boolean = 'Boolean',
  Integer = 'Integer',
  ByteArray = 'ByteArray',
  String = 'String',
  Hash160 = 'Hash160',
  Hash256 = 'Hash256',
  PublicKey = 'PublicKey',
  Signature = 'Signature',
  Array = 'Array',
  Map = 'Map',
  InteropInterface = 'InteropInterface',
  Void = 'Void',
}

export enum AttributeUsage {
  Url = 'Url',
}

export enum SignerScope {
  None = 'None',
  CalledByEntry = 'CalledByEntry',
  CustomContracts = 'CustomContracts',
  CustomGroups = 'CustomGroups',
  Global = 'Global',
}
