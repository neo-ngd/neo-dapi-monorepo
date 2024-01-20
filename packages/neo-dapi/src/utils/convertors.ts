import { Buffer } from 'buffer';
import { sc, wallet } from '@cityofzion/neon-core';
import { ApplicationLog, Block, Invocation, Signer, Transaction } from './types';

export function stringToHex(string: string): string {
  return Buffer.from(string).toString('hex');
}

export function hexToBase64(hex: string): string {
  return Buffer.from(hex, 'hex').toString('base64');
}

export function addressToScriptHash(address: string): string {
  return `0x${wallet.getScriptHashFromAddress(address)}`;
}

export function invocationsToScript(invocations: Invocation[]): string {
  return sc.createScript(
    ...invocations.map(invocation => ({
      ...invocation,
      args: invocation.args?.map(arg => sc.ContractParam.fromJson(arg as any)),
    })),
  );
}

export function blockJsonToBlock(blockJson: any): Block {
  return {
    hash: blockJson.hash,
    size: blockJson.size,
    version: blockJson.version,
    previousBlockHash: blockJson.previousblockhash,
    merkleRoot: blockJson.merkleroot,
    time: blockJson.time,
    index: blockJson.index,
    primary: blockJson.primary,
    nextConsensus: blockJson.nextconsensus,
    witnesses: blockJson.witnesses,
    tx: blockJson.tx.map(transactionJsonToTransaction),
    confirmations: blockJson.confirmations,
    nextBlockHash: blockJson.nextblockhash,
  };
}

export function transactionJsonToTransaction(transactionJson: any): Transaction {
  return {
    hash: transactionJson.hash,
    size: transactionJson.size,
    version: transactionJson.version,
    nonce: transactionJson.nonce,
    sender: transactionJson.sender,
    systemFee: transactionJson.sysfee,
    networkFee: transactionJson.netfee,
    validUntilBlock: transactionJson.validuntilblock,
    signers: transactionJson.signers.map(signerJsonToSigner),
    attributes: transactionJson.attributes,
    script: transactionJson.script,
    witnesses: transactionJson.witnesses,
    blockHash: transactionJson.blockhash,
    confirmations: transactionJson.confirmations,
    blockTime: transactionJson.blocktime,
  };
}

export function signerJsonToSigner(signerJson: any): Signer {
  return {
    account: signerJson.account,
    scopes: signerJson.scopes,
    allowedContracts: signerJson.allowedcontracts,
    allowedGroups: signerJson.allowedgroups,
    rules: signerJson.rules,
  };
}

export function signerToSignerJson(signer: Signer): any {
  return {
    account: signer.account,
    scopes: signer.scopes,
    allowedcontracts: signer.allowedContracts,
    allowedgroups: signer.allowedGroups,
    rules: signer.rules,
  };
}

export function applicationLogJsonToApplicationLog(applicationLogJson: any): ApplicationLog {
  return {
    txid: applicationLogJson.txid,
    executions: applicationLogJson.executions.map((execution: any) => ({
      trigger: execution.trigger,
      vmState: execution.vmstate,
      exception: execution.exception,
      gasConsumed: execution.gasconsumed,
      stack: execution.stack,
      notifications: execution.notifications.map((notification: any) => ({
        contract: notification.contract,
        eventName: notification.eventname,
        state: notification.state,
      })),
    })),
  };
}
