import { ownerAddress } from "@/constants";
import { ethers } from "ethers";
import { Dispatch } from "react";
import { notify } from "./notify";

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
    notify({ message: "Booked seats", type: "success" });
    console.log(`Done - ${bookHash.hash}`);
    window.location.reload();
  } catch (error) {
    console.log(error);
    notify({
      message: "Something went wrong,Please try again later",
      type: "error",
    });
  }
};
