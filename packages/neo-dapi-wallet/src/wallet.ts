import { INeoProvider } from '@neongd/neo-provider';
import {
  DEPLOY_METHOD,
  DeployParams,
  DeployResult,
  GET_ACCOUNT_METHOD,
  GET_APPLICATION_LOG_METHOD,
  GET_BALANCE_METHOD,
  GET_BLOCK_HEIGHT_METHOD,
  GET_BLOCK_METHOD,
  GET_NETWORKS_METHOD,
  GET_PROVIDER_METHOD,
  GET_PUBLIC_KEY_METHOD,
  GET_STORAGE_METHOD,
  GET_TRANSACTION_METHOD,
  GetAccountResult,
  GetApplicationLogParams,
  GetApplicationLogResult,
  GetBalanceParams,
  GetBalanceResult,
  GetBlockHeightParams,
  GetBlockHeightResult,
  GetBlockParams,
  GetBlockResult,
  GetNetworksResult,
  GetProviderResult,
  GetPublicKeyResult,
  GetStorageParams,
  GetStorageResult,
  GetTransactionParams,
  GetTransactionResult,
  INVOKE_METHOD,
  INVOKE_MULTI_METHOD,
  INVOKE_READ_METHOD,
  INVOKE_READ_MULTI_METHOD,
  InvokeMultiParams,
  InvokeMultiResult,
  InvokeParams,
  InvokeReadMultiParams,
  InvokeReadMultiResult,
  InvokeReadParams,
  InvokeReadResult,
  InvokeResult,
  PICK_ADDRESS_METHOD,
  PickAddressResult,
  SEND_METHOD,
  SendParams,
  SendResult,
  SIGN_MESSAGE_METHOD,
  SignMessageParams,
  SignMessageResult,
  VERIFY_MESSAGE_METHOD,
  VerifyMessageParams,
  VerifyMessageResult,
} from './methods';

export class NeoDapiWallet {
  constructor(private provider: INeoProvider) {}

  setProvider(provider: INeoProvider) {
    this.provider = provider;
  }

  async getProvider(): Promise<GetProviderResult> {
    return this.provider.request({ method: GET_PROVIDER_METHOD });
  }

  async getAccount(): Promise<GetAccountResult> {
    return this.provider.request({ method: GET_ACCOUNT_METHOD });
  }

  async getPublicKey(): Promise<GetPublicKeyResult> {
    return this.provider.request({ method: GET_PUBLIC_KEY_METHOD });
  }

  async getNetworks(): Promise<GetNetworksResult> {
    return this.provider.request({ method: GET_NETWORKS_METHOD });
  }

  async getBalance(params: GetBalanceParams): Promise<GetBalanceResult> {
    return this.provider.request({ method: GET_BALANCE_METHOD, params });
  }

  async getBlockHeight(params: GetBlockHeightParams): Promise<GetBlockHeightResult> {
    return this.provider.request({ method: GET_BLOCK_HEIGHT_METHOD, params });
  }

  async getBlock(params: GetBlockParams): Promise<GetBlockResult> {
    return this.provider.request({ method: GET_BLOCK_METHOD, params });
  }

  async getTransaction(params: GetTransactionParams): Promise<GetTransactionResult> {
    return this.provider.request({ method: GET_TRANSACTION_METHOD, params });
  }

  async getApplicationLog(params: GetApplicationLogParams): Promise<GetApplicationLogResult> {
    return this.provider.request({ method: GET_APPLICATION_LOG_METHOD, params });
  }

  async getStorage(params: GetStorageParams): Promise<GetStorageResult> {
    return this.provider.request({ method: GET_STORAGE_METHOD, params });
  }

  async pickAddress(): Promise<PickAddressResult> {
    return this.provider.request({ method: PICK_ADDRESS_METHOD });
  }

  async verifyMessage(params: VerifyMessageParams): Promise<VerifyMessageResult> {
    return this.provider.request({ method: VERIFY_MESSAGE_METHOD, params });
  }

  async invokeRead(params: InvokeReadParams): Promise<InvokeReadResult> {
    return this.provider.request({ method: INVOKE_READ_METHOD, params });
  }

  async invokeReadMulti(params: InvokeReadMultiParams): Promise<InvokeReadMultiResult> {
    return this.provider.request({ method: INVOKE_READ_MULTI_METHOD, params });
  }

  async deploy(params: DeployParams): Promise<DeployResult> {
    return this.provider.request({ method: DEPLOY_METHOD, params });
  }

  async invoke(params: InvokeParams): Promise<InvokeResult> {
    return this.provider.request({ method: INVOKE_METHOD, params });
  }

  async invokeMulti(params: InvokeMultiParams): Promise<InvokeMultiResult> {
    return this.provider.request({ method: INVOKE_MULTI_METHOD, params });
  }

  async send(params: SendParams): Promise<SendResult> {
    return this.provider.request({ method: SEND_METHOD, params });
  }

  async signMessage(params: SignMessageParams): Promise<SignMessageResult> {
    return this.provider.request({ method: SIGN_MESSAGE_METHOD, params });
  }
}
