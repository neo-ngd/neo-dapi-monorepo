interface Result {
  address: string;
  publicKey: string;
}

export type GetPublicKey = () => Promise<Result>;
