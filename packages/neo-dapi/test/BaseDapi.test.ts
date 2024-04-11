import { wallet } from '@cityofzion/neon-core';
import { BaseTransport, formatErrorJson, PostMessageConnection } from '@neongd/json-rpc';
import {
  addressToScriptHash,
  BaseDapi,
  JsonRpcProvider,
  NetworkProvider,
  SigningNetworkProvider,
} from '../src';

jest.retryTimes(3, { logErrorsBeforeRetry: true });

describe('BaseDapi', () => {
  const privateKey = '3eb7d02fb580912d4b9f02373e1468206a3a345e31e207b3d7a649b06b12d25e';
  const address = new wallet.Account(privateKey).address; // NN5FphR5YCYm9iUUbtSyEU923MGhBm5MQL

  const networkConfigs = [
    {
      name: 'MainNet',
      nodeUrl: 'https://n3seed2.ngd.network:10332',
      magicNumber: 8608331020,
    },
    {
      name: 'TestNet',
      nodeUrl: 'https://n3seed2.ngd.network:40332',
      magicNumber: 894710606,
    },
  ];

  const table = [
    (() => {
      const provider = new NetworkProvider(networkConfigs, 'TestNet');
      return { name: 'NetworkProvider', provider, isSigningProvider: false, cleanup: null };
    })(),
    (() => {
      const provider = new SigningNetworkProvider(
        networkConfigs,
        'TestNet',
        privateKey,
        'TestAccount',
      );
      return { name: 'SigningNetworkProvider', provider, isSigningProvider: true, cleanup: null };
    })(),
    (() => {
      const channel = new MessageChannel();

      const remoteProvider = new SigningNetworkProvider(
        networkConfigs,
        'TestNet',
        privateKey,
        'TestAccount',
      );
      const remoteConnection = new PostMessageConnection(
        message => channel.port2.postMessage(message),
        listener => {
          const eventListener = (event: MessageEvent) => listener(event.data);
          channel.port2.addEventListener('message', eventListener);
          return () => channel.port2.removeEventListener('message', eventListener);
        },
      );
      const remoteTransport = new BaseTransport(remoteConnection);
      remoteTransport.on('request', async request => {
        try {
          const result = await remoteProvider.request(request);
          remoteTransport.resolve(request.id, result);
        } catch (error: unknown) {
          remoteTransport.reject(request.id, formatErrorJson(error));
        }
      });
      remoteTransport.connect();

      const localConnection = new PostMessageConnection(
        message => channel.port1.postMessage(message),
        listener => {
          const eventListener = (event: MessageEvent) => listener(event.data);
          channel.port1.addEventListener('message', eventListener);
          return () => channel.port1.removeEventListener('message', eventListener);
        },
      );

      const provider = new JsonRpcProvider(new BaseTransport(localConnection));

      return {
        name: 'JsonRpcProvider',
        provider,
        isSigningProvider: true,
        cleanup: () => channel.port1.close(),
      };
    })(),
  ];

  describe.each(table)('with $name', ({ provider, isSigningProvider, cleanup }) => {
    const dapi = new BaseDapi(provider);

    test('get provider', async () => {
      const result = await dapi.getProvider();
      expect(result).toEqual({
        name: expect.toBeString(),
        website: expect.toBeString(),
        version: expect.toBeString(),
        dapiVersion: expect.toBeString(),
        compatibility: expect.toSatisfyAll(item => (expect(item).toBeString(), true)),
        extra: expect.toBeObject(),
      });
    });

    test('get networks', async () => {
      const result = await dapi.getNetworks();
      expect(result).toEqual({
        networks: expect.toSatisfyAll(item => (expect(item).toBeString(), true)),
        defaultNetwork: expect.toBeString(),
      });
    });

    if (isSigningProvider) {
      test('get account', async () => {
        const result = await dapi.getAccount();
        expect(result).toEqual({
          address: expect.toBeString(),
          publicKey: expect.toBeString(),
          label: expect.toBeOneOf([expect.toBeString(), undefined]),
        });
      });
    }

    test('get block count', async () => {
      const result = await dapi.getBlockCount({});
      expect(result).toBeNumber();
    });

    test('get block', async () => {
      const result = await dapi.getBlock({ blockIndex: 0 });
      expect(result).toBeObject();
    });

    test('get transaction', async () => {
      const result = await dapi.getTransaction({
        txid: '0xfd7da54b831091d3dc261bdf8042d868427cd3480345328ba59d33b10e3c0905',
      });
      expect(result).toBeObject();
    });

    test('get application log', async () => {
      const result = await dapi.getApplicationLog({
        txid: '0xfd7da54b831091d3dc261bdf8042d868427cd3480345328ba59d33b10e3c0905',
      });
      expect(result).toBeObject();
    });

    test('get nep17 balances', async () => {
      const result = await dapi.getNep17Balances({ address });
      expect(result).toBeArray();
    });

    test('invoke read', async () => {
      const result = await dapi.invokeRead({
        scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
        operation: 'balanceOf',
        args: [{ type: 'Hash160', value: addressToScriptHash(address) }],
      });
      expect(result).toBeObject();
    });

    test('invoke read multi', async () => {
      const result = await dapi.invokeReadMulti({
        invocations: [
          {
            scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
            operation: 'balanceOf',
            args: [{ type: 'Hash160', value: addressToScriptHash(address) }],
          },
        ],
      });
      expect(result).toBeObject();
    });

    if (isSigningProvider) {
      test('invoke', async () => {
        const result = await dapi.invoke({
          scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
          operation: 'transfer',
          args: [
            { type: 'Hash160', value: addressToScriptHash(address) },
            { type: 'Hash160', value: addressToScriptHash(address) },
            { type: 'Integer', value: '1' },
            { type: 'Any', value: null },
          ],
          broadcastOverride: true,
        });
        expect(result).toEqual({ txid: expect.toBeString(), signedTx: expect.toBeString() });
      });
    }

    if (isSigningProvider) {
      test('invoke multi', async () => {
        const result = await dapi.invokeMulti({
          invocations: [
            {
              scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
              operation: 'transfer',
              args: [
                { type: 'Hash160', value: addressToScriptHash(address) },
                { type: 'Hash160', value: addressToScriptHash(address) },
                { type: 'Integer', value: '1' },
                { type: 'Any', value: null },
              ],
            },
          ],
          broadcastOverride: true,
        });
        expect(result).toEqual({ txid: expect.toBeString(), signedTx: expect.toBeString() });
      });
    }

    if (isSigningProvider) {
      test('sign message', async () => {
        const result = await dapi.signMessage({ message: 'Hello' });
        expect(result).toEqual({
          salt: expect.toBeString(),
          signature: expect.toBeString(),
          publicKey: expect.toBeString(),
        });
      });
    }

    if (isSigningProvider) {
      test('sign message without salt', async () => {
        const result = await dapi.signMessageWithoutSalt({ message: 'Hello' });
        expect(result).toEqual({ signature: expect.toBeString(), publicKey: expect.toBeString() });
      });
    }

    if (isSigningProvider) {
      test('sign transaction', async () => {
        const result = await dapi.signTransaction({
          version: 0,
          nonce: 2515023354,
          systemFee: '1007753',
          networkFee: '122752',
          validUntilBlock: 3361356,
          script:
            '0b110c1417b1e20e3bbc773326a499c3f6b76a0950c4cdfb0c1417b1e20e3bbc773326a499c3f6b76a0950c4cdfb14c01f0c087472616e736665720c14cf76e28bd0062c4a478ee35561011319f3cfa4d241627d5b52',
          attributes: [],
          invocations: [
            {
              scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
              operation: 'transfer',
              args: [
                { type: 'Hash160', value: addressToScriptHash(address) },
                { type: 'Hash160', value: addressToScriptHash(address) },
                { type: 'Integer', value: '1' },
                { type: 'Any', value: null },
              ],
            },
          ],
        });
        expect(result).toEqual({ signature: expect.toBeString(), publicKey: expect.toBeString() });
      });
    }

    if (isSigningProvider) {
      test.skip('invoke and broadcast transaction', async () => {
        const { signedTx } = await dapi.invoke({
          scriptHash: '0xd2a4cff31913016155e38e474a2c06d08be276cf',
          operation: 'transfer',
          args: [
            { type: 'Hash160', value: addressToScriptHash(address) },
            { type: 'Hash160', value: addressToScriptHash(address) },
            { type: 'Integer', value: '1' },
            { type: 'Any', value: null },
          ],
          broadcastOverride: true,
        });
        const result = await dapi.broadcastTransaction({ signedTx: signedTx as string });
        expect(result).toEqual({ txid: expect.toBeString(), nodeUrl: expect.toBeString() });
      });
    }

    afterAll(async () => {
      await provider.close();
      cleanup?.();
    });
  });
});
