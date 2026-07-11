"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { Users, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Community Gated Support",
      desc: "We believe in the power of local citizens looking out for one another. LostLink acts as a centralized board connecting neighbors.",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Privacy First",
      desc: "We shield personal numbers, credentials, and contact logs from malicious crawlers. Users choose when to reveal contact channels.",
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
    },
    {
      title: "Always Free",
      desc: "Finding what you lost shouldn't come with a price tag. LostLink is and will always remain completely free of charge.",
      icon: <Heart className="w-6 h-6 text-secondary" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
          About LostLink
        </h1>
        <p className="text-sm text-neutral-mid mt-2 font-medium max-w-xl mx-auto">
          Learn about our mission to reconnect people with their lost items, build trust, and leverage the power of neighborhood communities.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-10">
        {/* Intro Banner */}
        <div className="relative rounded-modal overflow-hidden bg-primary text-white p-8 sm:p-12 shadow-md">
          <div className="absolute inset-0 bg-indigo-900 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-indigo-900 to-neutral-dark"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-3">Our Core Mission</h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Every day, thousands of critical items—keys, phones, documents, wallets, and beloved family pets—are misplaced. Often, someone finds them but has no easy way to contact the owner. LostLink is built to bridge this communication gap. We provide a clean, secure, and intuitive platform for community lost-and-found items, making recovery fast and hassle-free.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-dark mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <Card key={idx} hoverEffect={true} className="p-6 bg-white border border-neutral-light">
                <div className="w-12 h-12 rounded-card bg-neutral-light/50 flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="font-bold text-sm text-neutral-dark mb-2">{val.title}</h3>
                <p className="text-xs text-neutral-mid leading-relaxed">{val.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Started */}
        <div className="prose prose-neutral max-w-none text-neutral-mid leading-relaxed space-y-4">
          <h2 className="text-xl font-extrabold text-neutral-dark">How It Started</h2>
          <p className="text-sm">
            LostLink began as a small passion project in Brooklyn. After seeing dozens of &quot;Lost Dog&quot; fliers taped to telephone poles and post-it notes about found keys left on park benches, we realized that neighborhood communication was fragmented. Social media groups were noisy, and flyers were easily ruined by weather.
          </p>
          <p className="text-sm">
            We set out to create a dedicated, searchable bulletin board that allows users to instantly search local listings by neighborhood, date, and description keyword. Today, LostLink helps thousands of users catalog objects, share sighting notifications, and safely arrange returns.
          </p>
        </div>
      </div>
    </div>
  );
}
