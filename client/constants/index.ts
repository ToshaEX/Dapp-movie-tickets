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
export const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
// Movie Application owner Wallet address
export const ownerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
