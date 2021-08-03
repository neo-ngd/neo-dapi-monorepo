export interface VerifyMessageParams {
  message: string;
  publicKey: string;
  data: string;
}

export type VerifyMessageResult = boolean;
