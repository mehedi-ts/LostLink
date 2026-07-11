import React from "react";
import Link from "next/link";
import { Mail, HelpCircle } from "lucide-react";

const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark text-white border-t border-neutral-mid/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-button bg-primary flex items-center justify-center text-white font-bold text-sm">
                L
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Lost<span className="text-secondary">Link</span>
              </span>
            </Link>
            <p className="text-neutral-mid text-sm max-w-sm">
              LostLink is a modern lost-and-found community platform designed to bridge the gap between lost items and their rightful owners.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-neutral-mid hover:text-white transition-colors"
                aria-label="LostLink on Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="text-neutral-mid hover:text-white transition-colors"
                aria-label="LostLink on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="text-neutral-mid hover:text-white transition-colors"
                aria-label="LostLink on GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href="mailto:support@lostlink.com"
                className="text-neutral-mid hover:text-white transition-colors"
                aria-label="Email LostLink Support"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-light mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-sm text-neutral-mid hover:text-white transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link href="/items/add" className="text-sm text-neutral-mid hover:text-white transition-colors">
                  Report Found/Lost
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-neutral-mid hover:text-white transition-colors">
                  FAQs & Support
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-mid hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-light mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-neutral-mid hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-neutral-mid hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-neutral-mid hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-mid/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-mid">
            &copy; {currentYear} LostLink Inc. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <span className="text-xs text-neutral-mid flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Need help? Contact support@lostlink.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
