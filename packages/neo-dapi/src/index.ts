import { NeoDapiFura } from '@neongd/neo-dapi-fura';
import { NeoDapiNode } from '@neongd/neo-dapi-node';
import { NeoDapiWallet } from '@neongd/neo-dapi-wallet';
import { INeoProvider, JsonRpcNeoProvider } from '@neongd/neo-provider';

export class NeoDapi {
  node: NeoDapiNode;
  wallet: NeoDapiWallet;
  fura: NeoDapiFura;

  constructor(provider: INeoProvider | string) {
    let finalProvider: INeoProvider;
    if (typeof provider === 'string') {
      finalProvider = new JsonRpcNeoProvider(provider);
    } else {
      finalProvider = provider;
    }
    this.node = new NeoDapiNode(finalProvider);
    this.wallet = new NeoDapiWallet(finalProvider);
    this.fura = new NeoDapiFura(finalProvider);
  }
}
