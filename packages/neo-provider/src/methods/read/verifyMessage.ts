export const VERIFY_MESSAGE_METHOD = 'verifyMessage';

export interface VerifyMessageParams {
  message: string;
  publicKey: string;
  data: string;
}

export type VerifyMessageResult = boolean;
