import { ownerAddress } from "@/utils/constants";
import { ethers } from "ethers";
import { Dispatch } from "react";

interface Props {
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  getEthereumContract: () => ethers.Contract;
  currentAccount: string;
  ethereum: any;
  movieTitle: string;
  rating: number;
}

export const addMovie = async ({
  setIsLoading,
  getEthereumContract,
  currentAccount,
  rating,
  ethereum,
  movieTitle,
}: Props) => {
  try {
    const movieContract = getEthereumContract();
    console.log("get contract");
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: currentAccount,
          to: ownerAddress,
          gas: "0x5208",
          amount: "0x00",
        },
      ],
    });
    const movieHash = await movieContract.addMovie(movieTitle, rating, 20);
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
