"use client";

import React from "react";
import Link from "next/link";
import Bg from "@/components/ui/background";

const Page = () => {

  return (
    <div className="w-full h-screen flex items-center justify-center text-white relative">
      <Bg/>
      <div className="g-zinc-950 border border-zinc-900 bg-black rounded-2xl p-10 shadow-xl w-full max-w-sm text-center z-10">
        <span className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-700 to-neutral-200 dark:from-neutral-600 dark:to-white text-3xl font-sans relative z-20 font-bold tracking-tight">Mindrift</span>
        <p className="text-zinc-400 mb-10">Choose your action to get started</p>
        <div className="flex flex-col gap-4">
          <Link href="/lobby/create">
            <div className="bg-white text-black py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity">
              Create
            </div>
          </Link>

          <Link href="/lobby/join">
            <div className="bg-zinc-800 text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity">
              Join
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
