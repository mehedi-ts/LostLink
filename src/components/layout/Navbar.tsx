"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "bg-white/85 backdrop-blur-md shadow-[0_1px_24px_-4px_rgba(79,70,229,0.15)] border-b border-primary/10"
          : "bg-white/0 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-button bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/25 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:-translate-y-0.5 transition-all-custom">
                L
              </div>
              <span className="font-extrabold text-xl text-neutral-dark tracking-tight">
                Lost<span className="text-secondary">Link</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-semibold transition-colors rounded-button hover:bg-neutral-light/70 ${
                  pathname === link.href ? "text-primary" : "text-neutral-mid hover:text-neutral-dark"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-primary origin-left transition-transform duration-300 ${
                    pathname === link.href ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Actions & Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Special corner routes — visible only when logged in */}
            {isAuthenticated && (
              <div className="glass flex items-center gap-1 p-1 mr-1 rounded-button shadow-sm">
                <Link
                  href="/dashboard"
                  className={`group relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-button text-sm font-semibold transition-all-custom ${
                    pathname === "/dashboard"
                      ? "text-neutral-dark"
                      : "text-neutral-mid hover:text-neutral-dark"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-md transition-all-custom ${
                      pathname === "/dashboard"
                        ? "bg-gradient-to-br from-accent to-accent-hover text-white shadow-sm"
                        : "bg-white/70 text-neutral-mid group-hover:bg-accent-light group-hover:text-accent"
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                  </span>
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/items/manage"
                  className={`group relative flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-button text-sm font-semibold transition-all-custom ${
                    pathname === "/items/manage"
                      ? "text-neutral-dark"
                      : "text-neutral-mid hover:text-neutral-dark"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-md transition-all-custom ${
                      pathname === "/items/manage"
                        ? "bg-gradient-to-br from-accent to-accent-hover text-white shadow-sm"
                        : "bg-white/70 text-neutral-mid group-hover:bg-accent-light group-hover:text-accent"
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </span>
                  <span>Manage Listings</span>
                </Link>
              </div>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  href="/items/add"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-secondary hover:bg-secondary-hover rounded-button shadow-sm shadow-secondary/30 hover:shadow-md hover:shadow-secondary/40 hover:-translate-y-0.5 transition-all-custom"
                >
                  <PlusCircle className="w-4 h-4" />
                  Report Item
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                    aria-label="User menu"
                  >
                    <div className="relative">
                      <Image
                        src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                        alt={user?.name || "User"}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full border-2 border-white ring-2 ring-primary/70 object-cover"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-white" />
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-card bg-white ring-1 ring-neutral-dark/5 shadow-xl py-1 z-50 animate-slide-up">
                      <div className="px-4 py-3 border-b border-neutral-light">
                        <p className="text-sm font-semibold text-neutral-dark truncate">{user?.name}</p>
                        <p className="text-xs text-neutral-mid truncate">{user?.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-dark hover:bg-neutral-light font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-neutral-mid" />
                        Dashboard
                      </Link>

                      <Link
                        href="/items/manage"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-dark hover:bg-neutral-light font-medium"
                      >
                        <List className="w-4 h-4 text-neutral-mid" />
                        Manage Listings
                      </Link>

                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-error hover:bg-error-light font-medium border-t border-neutral-light mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-neutral-dark hover:text-primary rounded-button hover:bg-neutral-light/70 transition-all-custom"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-secondary hover:bg-secondary-hover rounded-button shadow-sm shadow-secondary/30 hover:shadow-md hover:-translate-y-0.5 transition-all-custom"
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
              className={`p-2 rounded-button transition-all-custom ${
                isOpen ? "bg-primary-light text-primary" : "text-neutral-dark hover:bg-neutral-light"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-light shadow-lg animate-slide-up">
          <div className="px-3 pt-3 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 rounded-button text-base font-semibold transition-all-custom ${
                  pathname === link.href
                    ? "bg-primary-light text-primary"
                    : "text-neutral-dark hover:bg-neutral-light"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 pb-5 border-t border-neutral-light px-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-1 py-2">
                  <div className="relative">
                    <Image
                      src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                      alt={user?.name || "User"}
                      width={44}
                      height={44}
                      className="w-11 h-11 rounded-full border-2 border-white ring-2 ring-primary/70 object-cover"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-neutral-dark truncate">{user?.name}</div>
                    <div className="text-sm font-medium text-neutral-mid truncate">{user?.email}</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Link
                    href="/items/add"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-button text-base font-semibold bg-secondary text-white shadow-sm shadow-secondary/30"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Report Item
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-button text-base font-semibold text-neutral-dark hover:bg-neutral-light"
                  >
                    <LayoutDashboard className="w-5 h-5 text-neutral-mid" />
                    Dashboard
                  </Link>

                  <Link
                    href="/items/manage"
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-button text-base font-semibold text-neutral-dark hover:bg-neutral-light"
                  >
                    <List className="w-5 h-5 text-neutral-mid" />
                    Manage Listings
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-button text-base font-semibold text-error hover:bg-error-light"
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
                  className="flex items-center justify-center w-full px-4 py-2.5 text-base font-semibold text-neutral-dark border border-neutral-mid/20 rounded-button hover:bg-neutral-light transition-all-custom"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center w-full px-4 py-2.5 text-base font-semibold text-white bg-secondary hover:bg-secondary-hover rounded-button shadow-sm shadow-secondary/30 transition-all-custom"
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