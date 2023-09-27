import abi from "./MovieTicketing.json";

export const contractABI = abi.abi;

export enum routes {
  HOME = "/",
  MOVIES = "/movies",
  CREATE_MOVIE = "/movies/create",
  BOOKINGS = "/bookings",
}

//*Replace with your props*/
// Contract Address
export const contractAddress = "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44";
// Movie Application owner Wallet address
export const ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
