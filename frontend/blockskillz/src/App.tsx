import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import detectEthereumProvider from "@metamask/detect-provider";
import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BlockSkillz from "./BlockSkillz.json";
import AwardCertificate from "./containers/AwardCertificate";
import Home from "./containers/Home";
import Institutions from "./containers/Institutions";
import RegisterInstitution from "./containers/RegisterInstitution";
import { Ethereum } from "./Ethereum";

const CONTRACT_ADDRESS = "0xAcDcB9E164D15a9b9071508a6791f7Cc26DB1Ba8";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
  },
});

const App = () => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [web3, setWeb3] = useState<Web3>();

  const getContract = useCallback(async () => {
    if (currentAccount && web3) {
      const contract = new web3.eth.Contract(
        BlockSkillz as AbiItem[],
        CONTRACT_ADDRESS
      );
      contract.defaultAccount = currentAccount;

      return contract;
    }

    return;
  }, [currentAccount, web3]);

  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      if (accounts.length > 0) {
        const account = accounts[0];
        if (account !== currentAccount) {
          setCurrentAccount(account);
        }
      } else {
        setCurrentAccount(undefined);
      }
    },
    [currentAccount]
  );

  const initializeProvider = useCallback(async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      provider
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch((err: any) => {
          console.log(err);
        });

      provider.on("accountsChanged", handleAccountsChanged);

      provider.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [handleAccountsChanged]);

  useEffect(() => {
    initializeProvider();
  }, [initializeProvider]);

  useEffect(() => {
    getContract().then((contract) => {
      if (contract && currentAccount) {
        contract.methods
          .owner()
          .call()
          .then((contractOwner: string) => {
            setIsAdmin(
              currentAccount.toLowerCase() === contractOwner.toLowerCase()
            );
          });
      }
    });
  }, [currentAccount, getContract]);

  return (
    <Ethereum.Provider value={{ currentAccount, isAdmin, web3, getContract }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/register">
              <RegisterInstitution />
            </Route>
            <Route path="/award">
              <AwardCertificate />
            </Route>
            {isAdmin && (
              <Route exact path="/institutions">
                <Institutions />
              </Route>
            )}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Ethereum.Provider>
  );
};

export default App;
