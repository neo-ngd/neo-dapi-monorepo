export interface SendParams {
  fromAddress: string;
  toAddress: string;
  asset: string;
  amount: string;
  fee?: string;
  broadcastOverride?: boolean;
}

export interface SendResult {
  txid: string;
  nodeUrl?: string;
  signedTx?: string;
}
