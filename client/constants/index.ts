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
export const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
// Movie Application owner Wallet address
export const ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
