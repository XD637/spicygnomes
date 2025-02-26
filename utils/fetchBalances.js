import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Use env variable
  network: Network.MATIC_MAINNET, // or Network.MATIC_MUMBAI for testnet
};

const alchemy = new Alchemy(settings);

export const fetchBalances = async (walletAddress, setBalances) => {
  if (!walletAddress) return;

  try {
    const balances = await alchemy.core.getTokenBalances(walletAddress);
    const polBalanceBN = await alchemy.core.getBalance(walletAddress);
    let polBalance = parseFloat(ethers.formatUnits(polBalanceBN.toString(), 18)).toFixed(4);

    const formatBalance = (balance) => {
      let formatted = parseFloat(ethers.formatUnits(balance.toString(), 18)).toFixed(4);
      return parseFloat(formatted) < 0.0001 ? "0" : formatted;
    };

    setBalances({
      spice: balances.tokenBalances[0] ? formatBalance(balances.tokenBalances[0].tokenBalance) : "0",
      wspice: balances.tokenBalances[1] ? formatBalance(balances.tokenBalances[1].tokenBalance) : "0",
      pol: parseFloat(polBalance) < 0.0001 ? "0" : polBalance,
    });
  } catch (error) {
    console.error("Error fetching balances:", error);
  }
};
