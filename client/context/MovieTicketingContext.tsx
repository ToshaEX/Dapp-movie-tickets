"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { addMovie } from "./utils/addMovie";

type Prop = {
  children: ReactNode;
};

export const MovieTicketingContext = React.createContext({});

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const movieTicketContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log({ provider, signer, movieTicketContract });
  return movieTicketContract;
};

export const MovieTicketingProvider = ({ children }: Prop) => {
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isWalletConnected = async () => {
    try {
      if (!ethereum) window.alert("Please Install metamask Wallet");
      const accounts = await ethereum?.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) window.alert("Please Install metamask Wallet");
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts:", accounts);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getAllMovies = async () => {
    try {
      const movieContract = getEthereumContract();

      const movieHash = await movieContract.getAllMovies();
      setIsLoading(true);
      console.log(movieHash);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    isWalletConnected();
  }, []);

  return (
    <MovieTicketingContext.Provider
      value={{
        currentAccount,
        connectWallet,
        addMovie: async () =>
          addMovie({
            currentAccount,
            ethereum,
            getEthereumContract,
            setIsLoading,
          }),
        getAllMovies,
      }}
    >
      {children}
    </MovieTicketingContext.Provider>
  );
};
