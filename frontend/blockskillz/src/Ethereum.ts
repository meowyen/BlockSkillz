import React from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

interface IEthereum {
  currentAccount?: string;
  isAdmin: boolean;
  web3?: Web3 | null;

  getContract: () => Promise<Contract | undefined>;
}

export const Ethereum = React.createContext<IEthereum>({
  isAdmin: false,
  getContract: async () => {
    return Promise.resolve(undefined);
  },
});
