export enum MethodName {
  GetAccount = 'getAccount',
  GetApplicationLog = 'getApplicationLog',
  GetBalance = 'getBalance',
  GetBlock = 'getBlock',
  GetBlockCount = 'getBlockCount',
  GetNetworks = 'getNetworks',
  GetProvider = 'getProvider',
  GetPublicKey = 'getPublicKey',
  GetStorage = 'getStorage',
  GetTransaction = 'getTransaction',
  InvokeRead = 'invokeRead',
  InvokeReadMulti = 'invokeReadMulti',
  Invoke = 'invoke',
  InvokeMulti = 'invokeMulti',
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

export enum TransactionAttributeUsage {
  Url = 'Url',
}
