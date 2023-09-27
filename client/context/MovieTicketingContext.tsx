"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress, ownerAddress } from "../constants";
import { addMovie } from "./utils/addMovie";
import { bookingSeats } from "./utils/bookSeats";
import { ExternalProvider } from "@ethersproject/providers";
import { notify } from "./utils/notify";

type Prop = {
  children: ReactNode;
};

export const MovieTicketingContext = React.createContext({});

export const MovieTicketingProvider = ({ children }: Prop) => {
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ethereum, setEthereum] = useState<ExternalProvider>(window.ethereum);

  const getEthereumContract = () => {
    if (!ethereum) window.alert("Please Install metamask Wallet");

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const movieTicketContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return movieTicketContract;
  };

  const isWalletConnected = async () => {
    try {
      if (!ethereum?.request) {
        window.alert("Please Install metamask Wallet");
        return;
      }
      const accounts = await ethereum?.request({ method: "eth_accounts" });

      if (accounts.length) {
        setIsLoading(false);
        setCurrentAccount(accounts[0]);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum?.request) {
        window.alert("Please Install metamask Wallet");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      notify({ message: "Wallet Connected", type: "success" });
    } catch (error) {
      console.log(error);
      notify({ message: "Please install Metamask", type: "error" });
    }
  };

  const getSeatsByMovieId = async (movieId: number) => {
    try {
      const movieContract = getEthereumContract();

      const seats = await movieContract.getSeatsByMovieId(movieId);
      setIsLoading(true);
      const seatsArr = seats.map(
        (value: string) => +ethers.BigNumber.from(value).toString()
      );
      setIsLoading(false);
      return seatsArr;
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getAllMovies = async () => {
    try {
      const movieContract = getEthereumContract();

      const movies = await movieContract.getAllMovies();
      setIsLoading(true);
      setIsLoading(false);
      return movies;
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  const getBookedSeatsByClientId = async () => {
    try {
      const movieContract = getEthereumContract();

      const mySeats = await movieContract.getSeatsByClientId();
      setIsLoading(true);
      setIsLoading(false);
      return mySeats;
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setEthereum(window.ethereum as ExternalProvider);
    isWalletConnected();
  }, []);

  return (
    <MovieTicketingContext.Provider
      value={{
        currentAccount,
        connectWallet,
        addMovie: async (movieTitle: string, rating: number) => {
          addMovie({
            getEthereumContract,
            setIsLoading,
            movieTitle,
            ethereum,
            currentAccount,
            rating,
          });
        },
        getAllMovies,
        bookingSeats: async (
          amount: number,
          seats: number[],
          movieId: number
        ) =>
          bookingSeats({
            amount,
            seats,
            movieId,
            currentAccount,
            ethereum,
            getEthereumContract,
            setIsLoading,
          }),
        getSeatsByMovieId,
        getBookedSeatsByClientId,
        isLoading,
        ownerAddress,
      }}
    >
      {children}
    </MovieTicketingContext.Provider>
  );
};
