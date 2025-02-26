"use client";

import { useEffect, useState } from "react";
import { BrowserProvider, Contract, parseEther, toBigInt } from "ethers";
import { fetchBalances } from "../utils/fetchBalances";
import contractABI from "../contracts/abi/spicygnomes.json";

const CONTRACT_ADDRESS = "0xb0a6C7C6B4371E83A9919da431de6bAB4f7150b1"; // Replace with your contract address

const PRICES = {
  spice: 490000, // Example price per NFT in $SPICE
  wspice: 1000,  // Example price per NFT in $WSPICE
  pol: 100,      // Example price per NFT in $POL
};

export default function Mint() {
  const [balances, setBalances] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setLoading(true);
          fetchBalances(accounts[0], (data) => {
            setBalances(data);
            setLoading(false);
          });
        }
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setWalletAddress(null);
          setBalances(null);
        } else {
          setWalletAddress(accounts[0]);
          setLoading(true);
          fetchBalances(accounts[0], (data) => {
            setBalances(data);
            setLoading(false);
          });
        }
      });
    }
  }, []);

  const handleMint = async (currency) => {
    if (!window.ethereum || !walletAddress) {
      alert("Wallet not connected!");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);
      let tx;
      const mintAmountBigInt = toBigInt(mintAmount);

      if (currency === "spice") {
        tx = await contract.mintSpice(mintAmountBigInt);
      } else if (currency === "wspice") {
        tx = await contract.mintWspice(mintAmountBigInt);
      } else if (currency === "pol") {
        const price = parseEther((mintAmount * PRICES.pol).toString());
        tx = await contract.mintPol(mintAmountBigInt, { value: price });
      }

      await tx.wait();
      alert("Mint successful!");
    } catch (error) {
      console.error("Minting error:", error);
      alert(`Minting failed! ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {!window.ethereum ? (
        <p className="text-lg font-semibold text-red-500 text-center">
          No wallet detected. Please install MetaMask or another Web3 wallet.
        </p>
      ) : !walletAddress ? (
        <p className="text-lg font-semibold text-center">
          Please connect your wallet to continue.
        </p>
      ) : (
        <div className="backdrop-blur-md bg-white/20 p-8 rounded-2xl shadow-xl w-full max-w-2xl">
          <p className="text-lg font-semibold text-center mb-4">Mint SpicyGnomes NFT</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(PRICES).map((currency) => (
              <div
                key={currency}
                className="p-6 rounded-xl bg-white/30 backdrop-blur-lg shadow-lg text-center flex flex-col justify-between min-h-[230px] flex-grow"
              >
                <div>
                  <p className="text-md font-semibold uppercase">${currency.toUpperCase()}</p>
                  <p className="text-gray-800 text-sm">Price: {PRICES[currency]}</p>
                  <p className="text-gray-600 text-xs">Balance: {balances?.[currency] || 0}</p>
                  <div className="flex items-center justify-center mt-3">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
                      onClick={() => setMintAmount((prev) => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg font-bold w-8 text-center">{mintAmount}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
                      onClick={() => setMintAmount((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 min-h-[24px]">
                    Total: {mintAmount * PRICES[currency]} {currency.toUpperCase()}
                  </p>
                </div>
                <button
                  className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-xl w-full hover:bg-blue-600"
                  onClick={() => handleMint(currency)}
                >
                  Mint
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
