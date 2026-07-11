"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { Shield, Eye, Lock, Globe, Database, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: <Database className="w-5 h-5 text-primary" />,
      content:
        "When you use LostLink, you may report items you have lost or found. This includes specifying titles, descriptions, locations, photos, dates, and contact names/phone numbers. Additionally, if you create an account, we record your name, email address, and profile picture url to manage your dashboard.",
    },
    {
      title: "2. How We Store Your Data",
      icon: <Lock className="w-5 h-5 text-secondary" />,
      content:
        "Currently, LostLink operates as a client-side platform. All reported items, user registration profiles, and search analytics are saved directly inside your browser's LocalStorage. This means your personal information remains on your local machine and is not transferred to any remote servers, providing maximum privacy by default.",
    },
    {
      title: "3. The Reveal Gate Safety Feature",
      icon: <Eye className="w-5 h-5 text-accent" />,
      content:
        "To protect listing creators from automated spam bots, web crawlers, and aggressive scrapers, we mask contact numbers and names behind an interactive reveal gate. Only authenticated users can press the reveal button to view listing credentials, keeping details safe from public indexing.",
    },
    {
      title: "4. Sharing & Meetup Security",
      icon: <Shield className="w-5 h-5 text-indigo-500" />,
      content:
        "LostLink facilitates community coordination but does not directly handle item handovers. When arranging meetup locations to exchange found items, we recommend utilizing well-lit public zones (such as police stations, banks, or active coffee shops). Never share private home addresses or passwords.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-flex w-12 h-12 rounded-full bg-primary-light text-primary items-center justify-center mb-3">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-mid mt-2 font-medium max-w-xl mx-auto">
          We believe in trust, transparency, and data privacy. Read below to understand how your data is handled on LostLink.
        </p>
      </div>

      {/* Intro Box */}
      <Card hoverEffect={false} className="p-6 bg-indigo-50/50 border border-indigo-100/60 mb-10 text-xs sm:text-sm text-indigo-950 leading-relaxed rounded-modal">
        <span className="font-bold block mb-1">Effective Date: July 11, 2026</span>
        LostLink is a privacy-first web application designed for community lost and found listings. We take privacy seriously. Because we run our services utilizing browser local storage, you remain in complete control of your data. You can inspect, modify, or erase all your data at any time by simply clearing your browser history or deleting your listings.
      </Card>

      {/* Grid of Sections */}
      <div className="flex flex-col gap-6">
        {sections.map((sec, idx) => (
          <Card key={idx} hoverEffect={false} className="p-6 bg-white border border-neutral-light flex gap-4 items-start">
            <div className="w-10 h-10 rounded-card bg-neutral-light/50 flex items-center justify-center flex-shrink-0">
              {sec.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-neutral-dark mb-1.5">{sec.title}</h3>
              <p className="text-xs text-neutral-mid leading-relaxed">{sec.content}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Legal Notice */}
      <div className="mt-12 text-center text-xs text-neutral-mid leading-relaxed max-w-md mx-auto pt-6 border-t border-neutral-light/60">
        <p className="font-medium">
          If you have questions or concerns regarding our privacy standards, or want to contribute to the open-source platform, contact us at:
        </p>
        <Link href="/contact" className="inline-block mt-3">
          <Button variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />} className="bg-white text-xs py-1.5 h-9">
            Contact Privacy Support
          </Button>
        </Link>
      </div>
    </div>
  );
}
