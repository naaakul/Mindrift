"use client";

import Bg from "@/components/ui/background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useWallet, useConnection } from "@solana/wallet-adapter-react";

const page = () => {
  // const { publicKey } = useWallet();
  // const { connection } = useConnection();

  return (
    <div className="relative w-full h-screen flex items-center justify-center flex-col px-4">
      <Bg />
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-700 to-neutral-200 dark:from-neutral-600 dark:to-white text-4xl md:text-7xl lg:text-9xl font-sans relative z-20 font-bold tracking-tight">
        Mindrift
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg z-20 text-neutral-400 text-center">
        Put $1 in your IQ.
      </p>
      <HoverBorderGradient
        containerClassName="rounded-lg border-zinc-950 cursor-pointer mt-9"
        as="button"
        className="dark:bg-black dark:text-white flex items-center space-x-2"
      >
      <WalletMultiButton className="mb-4 !rounded-full" />
      {/* {publicKey ? (
        <p>Connected: {publicKey.toBase58()}</p>
      ) : (
        <p>Not connected</p>
      )} */}
        {/* <span>Connect your wallet</span> */}
      </HoverBorderGradient>
    </div>
  );
};

export default page;
