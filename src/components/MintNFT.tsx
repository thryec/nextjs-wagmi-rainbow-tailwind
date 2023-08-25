"use client";

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import Hexa from "../abis/Hexa.json";

const MintNFT = () => {
  const sepoliaContractAddr = "0xC6d07Fa81Bbd738692Aa109DC1BA751881380D40";
  const ownerAddr = "0x6c8EEDEb14a0b1297530F45fAcf4f85025694b50";

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: sepoliaContractAddr,
    chainId: 11155111,
    abi: Hexa.abi,

    functionName: "ownerMint",
    args: [ownerAddr],
    account: ownerAddr,
    onMutate({ args }) {
      console.log("Mutate", { args });
    },
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return (
    <div>
      <button onClick={() => write()}>Mint Token</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default MintNFT;
