"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { itemService } from "@/services/itemService";
import { Item } from "@/types/item";
import ItemCard from "@/components/features/items/ItemCard";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
import {
  Search,
  PlusCircle,
  FileText,
  ShieldCheck,
  Bell,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Compass,
} from "lucide-react";

// Hero animation variants
const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const heroFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroCard = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  const [stats, setStats] = useState<{
    totalLost: number;
    totalFound: number;
    totalRecovered: number;
    recentItems: Item[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await itemService.getStats();
        setStats({
          totalLost: res.totalLost,
          totalFound: res.totalFound,
          totalRecovered: res.totalRecovered,
          recentItems: res.recentItems,
        });
      } catch (e) {
        console.error("Error loading home stats:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Submit a Report",
      desc: "Fill out our simple form. Provide a description, location, date, and optionally upload a photo of the lost or found item.",
      icon: <FileText className="w-6 h-6 text-primary" />,
    },
    {
      num: "02",
      title: "Search & Filter",
      desc: "Browse our live database. Filter items by category, location, status, and dates to locate matches in real-time.",
      icon: <Search className="w-6 h-6 text-secondary" />,
    },
    {
      num: "03",
      title: "Recover Safely",
      desc: "Use our secured privacy-first contact cards to connect, verify ownership credentials, and arrange a safe recovery meetup.",
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
    },
  ];

  const categories = [
    { name: "Electronics", icon: "💻", count: "12 active" },
    { name: "ID Card", icon: "🪪", count: "8 active" },
    { name: "Bag", icon: "🎒", count: "14 active" },
    { name: "Keys", icon: "🔑", count: "10 active" },
    { name: "Documents", icon: "📄", count: "5 active" },
    { name: "Accessories", icon: "🕶️", count: "7 active" },
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "NYU Student",
      text: "I lost my backpack containing my laptop and class notes on the subway. Within 24 hours of posting a report on LostLink, a fellow commuter reached out. I got my bag back safe and sound!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Clara Higgins",
      role: "Dog Owner",
      text: "Our puppy Max slipped out of his leash during thunderstorms. We were devastated. The LostLink community was incredible—we received a sighting tip that led us right to him at a local shelter.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Arthur Pendelton",
      role: "Software Engineer",
      text: "Found a Honda key fob in the library park. Listed it here in 2 minutes. The owner contacted me that evening with verification. Glad to have helped out using this amazing tool!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-orange-50/30 py-20 lg:py-28 border-b border-neutral-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Column */}
            <motion.div
              className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left"
              variants={heroContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={heroFadeUp}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-extrabold w-fit mx-auto lg:mx-0 shadow-sm border border-primary/10"
              >
                <Sparkles className="w-3.5 h-3.5" />
                COMMUNITY DRIVEN LOST & FOUND
              </motion.div>
              <motion.h1
                variants={heroFadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-dark tracking-tight leading-none"
              >
                Reconnecting You With Your{" "}
                <span className="text-primary bg-gradient-to-r from-primary to-indigo-700 bg-clip-text text-transparent">
                  Belongings
                </span>
              </motion.h1>
              <motion.p
                variants={heroFadeUp}
                className="text-base sm:text-lg text-neutral-mid leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                LostLink is a modern lost-and-found community platform designed to bridge the gap between lost items and their rightful owners. Report, search, and recover easily.
              </motion.p>

              {/* Action CTAs */}
              <motion.div
                variants={heroFadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
              >
                <Link href="/items/add" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full flex items-center gap-2"
                    leftIcon={<PlusCircle className="w-5 h-5" />}
                  >
                    Report an Item
                  </Button>
                </Link>
                <Link href="/listings" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full flex items-center gap-2 bg-white"
                    leftIcon={<Search className="w-5 h-5 text-primary" />}
                  >
                    Search Database
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Hero Column: Illustration Grid */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                {/* Visual grid cards */}
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={heroContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={heroCard}
                    whileHover={{ rotate: 0, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-card shadow-md p-5 border border-neutral-light -rotate-2"
                  >
                    <span className="text-3xl block mb-2">🎒</span>
                    <span className="text-xs font-bold text-secondary uppercase">Lost</span>
                    <h4 className="font-bold text-neutral-dark text-sm mt-0.5">Osprey Backpack</h4>
                    <p className="text-[10px] text-neutral-mid line-clamp-2 mt-1">Grey backpack left on northbound N Train...</p>
                  </motion.div>
                  <motion.div
                    variants={heroCard}
                    whileHover={{ rotate: 0, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-card shadow-md p-5 border border-neutral-light translate-y-6 rotate-3"
                  >
                    <span className="text-3xl block mb-2">🐶</span>
                    <span className="text-xs font-bold text-accent uppercase">Found</span>
                    <h4 className="font-bold text-neutral-dark text-sm mt-0.5">Golden Pup Max</h4>
                    <p className="text-[10px] text-neutral-mid line-clamp-2 mt-1">Found friendly Golden retriever puppy near...</p>
                  </motion.div>
                  <motion.div
                    variants={heroCard}
                    whileHover={{ rotate: 0, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-card shadow-md p-5 border border-neutral-light -translate-y-2 -rotate-1"
                  >
                    <span className="text-3xl block mb-2">🔑</span>
                    <span className="text-xs font-bold text-accent uppercase">Found</span>
                    <h4 className="font-bold text-neutral-dark text-sm mt-0.5">Honda Key Fob</h4>
                    <p className="text-[10px] text-neutral-mid line-clamp-2 mt-1">Found key fob with brass Totoro ring on...</p>
                  </motion.div>
                  <motion.div
                    variants={heroCard}
                    whileHover={{ rotate: 0, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-card shadow-md p-5 border border-neutral-light translate-y-4 rotate-2"
                  >
                    <span className="text-3xl block mb-2">💻</span>
                    <span className="text-xs font-bold text-secondary uppercase">Lost</span>
                    <h4 className="font-bold text-neutral-dark text-sm mt-0.5">MacBook Air M2</h4>
                    <p className="text-[10px] text-neutral-mid line-clamp-2 mt-1">Slipped out of backpack near central library...</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Strip */}
      <section className="bg-neutral-dark text-white py-6 border-b border-neutral-mid/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center divide-x divide-neutral-mid/20">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {loading ? "..." : stats?.totalLost || 0}
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-neutral-mid uppercase tracking-widest mt-1">
                Active Lost Reports
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {loading ? "..." : stats?.totalFound || 0}
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-neutral-mid uppercase tracking-widest mt-1">
                Active Found Reports
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-accent tracking-tight">
                {loading ? "..." : stats?.totalRecovered || 0}
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-neutral-mid uppercase tracking-widest mt-1">
                Recovered Items
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
              How LostLink Works
            </h2>
            <p className="text-sm text-neutral-mid leading-relaxed mt-2.5 font-medium">
              We make the process of reporting, discovering, and reclaiming items simple and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col gap-4 p-6 rounded-card border border-neutral-light bg-neutral-light/5">
                <div className="absolute top-4 right-6 text-4xl font-extrabold text-neutral-light select-none">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-card bg-white border border-neutral-light shadow-sm flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-md font-bold text-neutral-dark mt-2">{step.title}</h3>
                <p className="text-xs text-neutral-mid leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings Preview */}
      <section className="py-16 bg-neutral-light/10 border-y border-neutral-light/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
                Recent Reports
              </h2>
              <p className="text-sm text-neutral-mid leading-relaxed mt-1 font-medium">
                Check the latest lost and found items posted by the community.
              </p>
            </div>
            <Link href="/listings">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />} className="bg-white">
                View All Listings
              </Button>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="card" />)
              : stats?.recentItems.slice(0, 3).map((item) => <ItemCard key={item._id} item={item} />)}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
              Explore by Category
            </h2>
            <p className="text-sm text-neutral-mid leading-relaxed mt-2 font-medium">
              Filter through our database based on item categories to narrow down your searches.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/listings?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center text-center p-6 border border-neutral-light bg-neutral-light/5 hover:border-primary/20 hover:bg-primary-light rounded-card transition-all-custom shadow-sm hover:shadow-md"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </span>
                <span className="font-bold text-xs text-neutral-dark mt-1 block">
                  {cat.name}
                </span>
                <span className="text-[10px] font-bold text-neutral-mid mt-1 uppercase block tracking-wider">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-neutral-light/20 border-y border-neutral-light/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
              Why Choose LostLink?
            </h2>
            <p className="text-sm text-neutral-mid leading-relaxed mt-2 font-medium">
              We design our features with the community&apos;s security, speed, and privacy in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-card p-6 border border-neutral-light shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-card bg-primary-light text-primary flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-dark">100% Free & Open</h3>
                <p className="text-xs text-neutral-mid leading-relaxed mt-1.5">
                  No subscriptions or paywalled contacts. Our platform is completely community-driven, open, and free to use for everyone.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-card p-6 border border-neutral-light shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-card bg-secondary-light text-secondary flex items-center justify-center flex-shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-dark">Privacy Protection</h3>
                <p className="text-xs text-neutral-mid leading-relaxed mt-1.5">
                  Your phone number and name are masked behind our interactive reveal gates. We prevent bots and scrapers from indexing your data.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-card p-6 border border-neutral-light shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-card bg-accent-light text-accent flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-dark">Smart Match Notifications</h3>
                <p className="text-xs text-neutral-mid leading-relaxed mt-1.5">
                  Our system matches key attributes from lost reports with found reports in real-time, sending you immediate verification alerts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
              Community Success Stories
            </h2>
            <p className="text-sm text-neutral-mid leading-relaxed mt-2 font-medium">
              Read how people in our neighborhood successfully recovered their lost items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white border border-neutral-light rounded-card p-6 shadow-sm flex flex-col justify-between">
                <p className="text-xs text-neutral-mid leading-relaxed italic mb-6">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-primary/20" />
                  <div>
                    <h4 className="font-bold text-xs text-neutral-dark">{t.name}</h4>
                    <span className="text-[10px] text-neutral-mid font-semibold block">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-primary to-indigo-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 items-center">
          <Award className="w-12 h-12 text-secondary animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight max-w-xl">
            Ready to find what you lost?
          </h2>
          <p className="text-sm text-indigo-100 max-w-md leading-relaxed">
            Join thousands of neighbors who use LostLink daily to report lost objects, list found items, and reconnect.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="/items/add">
              <Button variant="secondary" size="lg">
                Report Item Now
              </Button>
            </Link>
            <Link href="/listings">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Browse Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}