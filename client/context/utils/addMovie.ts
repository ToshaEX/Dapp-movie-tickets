export const addMovie = async ({
  currentAccount,
  ethereum,
  setIsLoading,
  getEthereumContract,
}) => {
  try {
    const movieContract = getEthereumContract();
    console.log("get contract");
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: currentAccount,
          to: "0x736F86b27D3B9d52123777819e898A4e463a5105",
          gas: "0x5208",
          amount: "0x5208",
        },
      ],
    });

    const movieHash = await movieContract.addMovie("Gindhari", 20);
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
