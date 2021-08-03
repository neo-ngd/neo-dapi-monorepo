export interface SignMessageParams {
  message: string;
}

export interface SignMessageResult {
  publicKey: string;
  data: string;
  salt: string;
  message: string;
}
