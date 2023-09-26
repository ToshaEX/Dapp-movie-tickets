import { ownerAddress } from "@/utils/constants";
import { ethers } from "ethers";
import { Dispatch } from "react";

interface Props {
  currentAccount: string;
  ethereum: any;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  getEthereumContract: () => ethers.Contract;
  amount: number;
  seats: number[];
  movieId: number;
}

export const bookingSeats = async ({
  currentAccount,
  ethereum,
  getEthereumContract,
  setIsLoading,
  amount,
  seats,
  movieId,
}: Props) => {
  try {
    const movieContract = getEthereumContract();
    console.log(seats);
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: currentAccount,
          to: ownerAddress,
          gas: "0x13880",
          amount: amount,
        },
      ],
    });

    const bookHash = await movieContract.bookSeat(
      movieId,
      seats,
      currentAccount
    );
    setIsLoading(true);
    console.log(`Loading - ${bookHash.hash}`);
    await bookHash.wait();
    setIsLoading(false);
    console.log(`Done - ${bookHash.hash}`);
  } catch (error) {
    console.log(error);
    throw new Error("No ethereum object");
  }
};
