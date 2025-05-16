"use client";

import React from "react";
import Link from "next/link";
import Bg from "@/components/ui/background";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomKey, setRoomKey] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    if (playerName && roomKey) {
      setIsJoined(true);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center text-white relative">
      <Bg />
      <div className="g-zinc-950 border border-zinc-900 bg-black rounded-2xl p-10 shadow-xl w-full max-w-sm text-center z-10">
        <p className="text-zinc-200 mb-10">
          {isJoined ? "Waiting Room" : "Join Quiz Room"}
        </p>

        {!isJoined ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="playerName" className="text-zinc-400">
                Player Name
              </Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="border-zinc-900 bg-zinc-800"
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="roomKey" className="text-zinc-400">
                Room Key
              </Label>
              <Input
                id="roomKey"
                value={roomKey}
                onChange={(e) => setRoomKey(e.target.value)}
                placeholder="e.g., WXYZ1234"
                className="border-zinc-900 bg-zinc-800"
              />
            </div>
            <div className="flex flex-col gap-4">
              {/* <Link href="/lobby/join">
            <div className="bg-zinc-800 text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity">
              Join
            </div>
          </Link> */}
              <Button
                onClick={handleJoin}
                disabled={!playerName || !roomKey}
                className="bg-zinc-800 cursor-pointer text-white mt-4 py-7 font-medium rounded-xl text-lg hover:opacity-90 hover:bg-zinc-800 transition-opacity"
              >
                Join & Stake 1 USDC
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-zinc-800/50 p-4">
                <p className="text-sm text-zinc-400">Topic</p>
                <p className="text-lg font-medium text-white">Web3</p>
              </div>

              <div className="rounded-xl bg-zinc-800/50 p-4">
                <p className="text-sm text-zinc-400">Current Players</p>
                <p className="text-lg font-medium text-white">2</p>
              </div>

              <div className="rounded-xl bg-zinc-800/50 p-4">
                <p className="text-sm text-zinc-400">Total Stake</p>
                <p className="text-lg font-medium text-white">2 USDC</p>
              </div>

              <div className="flex items-center justify-center rounded-lg bg-purple-500/10 p-4 text-center">
                <p className="text-purple-300">Waiting for host to start...</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
