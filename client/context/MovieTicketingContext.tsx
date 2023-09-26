"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress, ownerAddress } from "../utils/constants";
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

  const bookingSeats = async () => {
    try {
      const movieContract = getEthereumContract();

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: ownerAddress,
            gas: "0x5208",
            amount: "0x5208",
          },
        ],
      });

      const movieHash = await movieContract.bookSeat(
        0,
        [0, 3, 4, 2],
        currentAccount
      );
      setIsLoading(true);
      console.log(`Loading - ${movieHash.hash}`);
      await movieHash.wait();
      setIsLoading(false);
      console.log(`Done - ${movieHash.hash}`);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getSeatsByMovieId = async (movieId: number) => {
    try {
      const movieContract = getEthereumContract();

      const seats = await movieContract.getSeatsByMovieId(movieId);
      setIsLoading(true);
      const seatsArr = seats.map((value: string) => parseInt(value, 16));
      console.log(seatsArr);
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
      console.log(movies);
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
      console.log(mySeats);
      setIsLoading(false);
      return mySeats;
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
        bookingSeats,
        getSeatsByMovieId,
        getBookedSeatsByClientId,
        isLoading,
      }}
    >
      {children}
    </MovieTicketingContext.Provider>
  );
};
