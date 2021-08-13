import { NeoDapiFura } from '@neongd/neo-dapi-fura';
import { NeoDapiNode } from '@neongd/neo-dapi-node';
import { NeoDapiWallet } from '@neongd/neo-dapi-wallet';
import { INeoProvider, JsonRpcNeoProvider } from '@neongd/neo-provider';

export class BaseNeoDapi {
  node: NeoDapiNode;
  wallet: NeoDapiWallet;
  fura: NeoDapiFura;

  constructor(provider: INeoProvider) {
    this.node = new NeoDapiNode(provider);
    this.wallet = new NeoDapiWallet(provider);
    this.fura = new NeoDapiFura(provider);
  }
}

export class NeoDapi extends BaseNeoDapi {
  static parseProvider(provider: INeoProvider | string): INeoProvider {
    return typeof provider === 'string' ? new JsonRpcNeoProvider(provider) : provider;
  }

  constructor(provider: INeoProvider | string) {
    super(NeoDapi.parseProvider(provider));
  }
}
