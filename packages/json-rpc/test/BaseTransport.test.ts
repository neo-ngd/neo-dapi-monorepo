import { BaseTransport, HttpConnection, PostMessageConnection, WebSocketConnection } from '../src';

jest.retryTimes(3, { logErrorsBeforeRetry: true });

describe('BaseJsonRpcTransport', () => {
  const table = [
    (() => {
      const connection = new HttpConnection('https://ethereum.publicnode.com');
      return { name: 'HttpConnection', connection, cleanup: null };
    })(),
    (() => {
      const connection = new WebSocketConnection('wss://ethereum.publicnode.com');
      return { name: 'WebSocketConnection', connection, cleanup: null };
    })(),
    (() => {
      const channel = new MessageChannel();

      const remoteConnection = new PostMessageConnection(
        message => channel.port2.postMessage(message),
        listener => {
          const eventListener = (event: MessageEvent) => listener(event.data);
          channel.port2.addEventListener('message', eventListener);
          return () => channel.port2.removeEventListener('message', eventListener);
        },
      );
      const remoteTransport = new BaseTransport(remoteConnection);
      remoteTransport.on('request', request => {
        remoteTransport.resolve(request.id, '0x01');
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
      return {
        name: 'PostMessageConnection',
        connection: localConnection,
        cleanup: () => channel.port1.close(),
      };
    })(),
  ];

  describe.each(table)('with $name', ({ connection, cleanup }) => {
    const transport = new BaseTransport(connection);

    test.concurrent('get block number', async () => {
      const result = await transport.request({ method: 'eth_blockNumber' });
      expect(result).toBeString();
    });

    afterAll(async () => {
      await transport.disconnect();
      cleanup?.();
    });
  });
});
