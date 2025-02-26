"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ConnectWallet from "../components/ConnectWallet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background text-foreground shadow-md w-full">
      <div className="flex justify-between items-center h-20 px-4 md:px-8 lg:px-12 relative">
        {/* Logo - left-aligned */}
        <div className="text-2xl font-bold tracking-wide flex-1">
          <Link href="/">SpicyGnomes</Link>
        </div>

        {/* Centered Desktop Links */}
        <div className="hidden md:flex space-x-20 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/mint" className="hover:text-gray-400">Mint</Link>
          <Link href="/about" className="hover:text-gray-400">About</Link>
        </div>

        {/* Wallet Button - right-aligned */}
        <div className="flex-1 flex justify-end">
          <div className="hidden md:block">
            <ConnectWallet />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background py-4 space-y-4 text-center">
          <Link href="/" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/mint" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>Mint</Link>
          <Link href="/about" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link>
          <div className="mt-4 flex justify-center">
  <ConnectWallet />
</div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
