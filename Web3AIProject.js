import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ethers } from "ethers";

export default function Web3AIProject() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Metamask not detected. Please install Metamask.");
    }
  };

  const connectPhantom = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
      } catch (error) {
        console.error("Error connecting Phantom wallet:", error);
      }
    } else {
      alert("Phantom wallet not detected. Please install Phantom.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold mb-4">Web3 AI Project</h1>
            <p className="mb-4 text-gray-700">
              Connect your wallet to explore our AI-powered Web3 platform.
            </p>
            <div className="flex flex-col gap-4">
              {!walletAddress ? (
                <>
                  <Button onClick={connectWallet} className="w-full">
                    Connect Metamask
                  </Button>
                  <Button onClick={connectPhantom} className="w-full">
                    Connect Phantom
                  </Button>
                </>
              ) : (
                <p className="text-green-600 font-semibold">
                  Connected: {walletAddress}
                </p>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
