import { NeoDapiFura } from '@neongd/neo-dapi-fura';
import { NeoDapiNode } from '@neongd/neo-dapi-node';
import { NeoDapiWallet } from '@neongd/neo-dapi-wallet';
import { INeoProvider } from '@neongd/neo-provider';

export class NeoDapi {
  node: NeoDapiNode;
  wallet: NeoDapiWallet;
  fura: NeoDapiFura;

  constructor(provider: INeoProvider) {
    this.node = new NeoDapiNode(provider);
    this.wallet = new NeoDapiWallet(provider);
    this.fura = new NeoDapiFura(provider);
  }
}
