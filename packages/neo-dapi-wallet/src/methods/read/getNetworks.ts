interface Result {
  networks: string[];
  defaultNetwork: string;
}

export type GetNetworks = () => Promise<Result>;
