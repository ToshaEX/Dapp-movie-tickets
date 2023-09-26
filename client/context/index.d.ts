import { ExternalProviders } from "@ethers/providers";

declare global {
  interface Window {
    ethereum?: ExternalProviders;
  }
}
