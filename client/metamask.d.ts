import { ExternalProvider } from "@ethersproject/providers";
export // Extend the Window interface to include the Ethereum object
declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}
