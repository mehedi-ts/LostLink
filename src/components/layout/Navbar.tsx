"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Menu, X, PlusCircle, LayoutDashboard, List, LogOut, Search, User } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Monitor scroll for premium glassmorphism visual change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setIsUserMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navLinks = [
    { name: "Browse Listings", href: "/listings" },
    { name: "About Us", href: "/about" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-neutral-dark/80 backdrop-blur-md shadow-sm border-b border-neutral-light/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-button bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                L
              </div>
              <span className="font-extrabold text-xl text-neutral-dark tracking-tight">
                Lost<span className="text-secondary">Link</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-neutral-mid"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions & Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/items/add"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-button shadow-sm hover:shadow-md transition-all-custom"
                >
                  <PlusCircle className="w-4 h-4" />
                  Report Item
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                    aria-label="User menu"
                  >
                    <img
                      src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                      alt={user?.name || "User"}
                      className="w-9 h-9 rounded-full border-2 border-primary object-cover"
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-card bg-white border border-neutral-light/75 shadow-lg py-1 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-neutral-light">
                        <p className="text-sm font-semibold text-neutral-dark">{user?.name}</p>
                        <p className="text-xs text-neutral-mid truncate">{user?.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-neutral-mid" />
                        Dashboard
                      </Link>

                      <Link
                        href="/items/manage"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-dark hover:bg-neutral-light font-medium"
                      >
                        <List className="w-4 h-4 text-neutral-mid" />
                        Manage Listings
                      </Link>

                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error-light font-medium border-t border-neutral-light mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-neutral-dark hover:text-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-button shadow-sm transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-dark hover:text-primary p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-neutral-light shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-button text-base font-semibold ${
                  pathname === link.href
                    ? "bg-primary-light text-primary"
                    : "text-neutral-dark hover:bg-neutral-light"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 pb-3 border-t border-neutral-light px-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                    alt={user?.name || "User"}
                    className="w-10 h-10 rounded-full border border-primary object-cover"
                  />
                  <div>
                    <div className="text-base font-bold text-neutral-dark">{user?.name}</div>
                    <div className="text-sm font-medium text-neutral-mid">{user?.email}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/items/add"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-button text-base font-semibold bg-primary text-white"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Report Item
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-button text-base font-semibold text-neutral-dark hover:bg-neutral-light"
                  >
                    <LayoutDashboard className="w-5 h-5 text-neutral-mid" />
                    Dashboard
                  </Link>

                  <Link
                    href="/items/manage"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-button text-base font-semibold text-neutral-dark hover:bg-neutral-light"
                  >
                    <List className="w-5 h-5 text-neutral-mid" />
                    Manage Listings
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-button text-base font-semibold text-error hover:bg-error-light"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-neutral-dark border border-neutral-mid/20 rounded-button hover:bg-neutral-light transition-all"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white bg-primary hover:bg-primary-hover rounded-button transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
