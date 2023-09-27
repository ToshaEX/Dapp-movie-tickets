import { ownerAddress } from "@/constants";
import { ethers } from "ethers";
import { Dispatch } from "react";
import { notify } from "./notify";

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
    notify({ message: "Movie Added", type: "success" });
    console.log(`Loading - ${movieHash.hash}`);
    await movieHash.wait();
    setIsLoading(false);
    console.log(`Done - ${movieHash.hash}`);
    return movieHash;
  } catch (error) {
    console.log(error);
    notify({
      message: "Something went Wrong, Please try again",
      type: "error",
    });
  }
};
