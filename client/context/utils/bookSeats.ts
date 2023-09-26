import { ownerAddress } from "@/utils/constants";
import { ethers } from "ethers";
import { Dispatch } from "react";

interface Props {
  currentAccount: string;
  ethereum: any;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  getEthereumContract: () => ethers.Contract;
  movieTitle: string;
}

export const addMovie = async ({
  currentAccount,
  ethereum,
  setIsLoading,
  getEthereumContract,
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
          amount: "0x5208",
        },
      ],
    });

    const movieHash = await movieContract.addMovie(movieTitle, 20);
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
