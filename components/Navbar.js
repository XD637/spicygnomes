"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ConnectWallet from "../components/ConnectWallet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-300 ease-in-out z-50 ${
        isScrolled ? "bg-background/80 shadow-lg backdrop-blur-md h-16" : "bg-background shadow-md h-20"
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-8 lg:px-12 relative h-full">
        {/* Logo - left-aligned */}
        <div className="text-2xl font-bold tracking-wide flex-1">
          <Link href="/">SpicyGnomes</Link>
        </div>

        {/* Centered Desktop Links */}
        <div className="hidden md:flex space-x-20 absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <a href="https://mint.littlebaonft.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Mint</a>
          <a href="https://littlebaonft.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">About</a>
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
          <a href="https://mint.littlebaonft.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>Mint</a>
          <a href="https://littlebaonft.com/" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-400" onClick={() => setIsOpen(false)}>About</a>
          <div className="mt-4 flex justify-center">
            <ConnectWallet />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
