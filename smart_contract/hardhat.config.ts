import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/SJ1Bjy99bhmww7SivP113H6SL0PsbJVG",
      accounts: [
        "a490327cc406ddb61fd00143f85494fb83f25e31b0541ca8b609c901cabd45cc",
      ],
    },
  },
};

export default config;
