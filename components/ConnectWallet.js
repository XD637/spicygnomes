import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight } from "lucide-react"; // Ensure you have lucide-react installed

export default function ConnectWallet() {
  return (
    <ConnectButton
      label={
        <span className="flex items-center gap-1">
          Connect Wallet <ArrowRight className="w-4 h-4 stroke-[3]" />
        </span>
      }
      accountStatus="full"
      chainStatus={{ smallScreen: "icon", largeScreen: "full" }}
      showBalance={{ smallScreen: false, largeScreen: true }}
    />
  );
}
