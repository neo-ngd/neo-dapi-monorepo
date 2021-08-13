export enum MethodName {
  GetApplicationLog = 'getapplicationlog',
  GetBlock = 'getblock',
  GetBlockCount = 'getblockcount',
  GetNep17Balances = 'getnep17balances',
  GetRawTransaction = 'getrawtransaction',
  GetStorage = 'getstorage',
  InvokeFunction = 'invokefunction',
  InvokeScript = 'invokescript',
  SendRawTransaction = 'sendrawtransaction',
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
