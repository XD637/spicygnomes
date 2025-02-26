"use client";

import { useEffect, useState } from "react";
import { fetchBalances } from "../utils/fetchBalances";
import { ImSpinner2 } from "react-icons/im";

const PRICES = {
  spice: 10, // Example price per NFT in $SPICE
  wspice: 5,  // Example price per NFT in $WSPICE
  pol: 2,    // Example price per NFT in $POL
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

  const handleMint = (currency) => {
    console.log(`Minting ${mintAmount} NFT(s) using ${currency}`);
    // Call the smart contract mint function here
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
