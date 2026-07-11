"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { itemService } from "@/services/itemService";
import { Item } from "@/types/item";
import DashboardStatCard from "@/components/features/dashboard/DashboardStatCard";
import CategoryDistributionChart from "@/components/features/dashboard/CategoryDistributionChart";
import ProtectedRouteWrapper from "@/components/layout/ProtectedRouteWrapper";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  FileText,
  Search,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Award,
  PlusCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<{
    totalLost: number;
    totalFound: number;
    totalRecovered: number;
    categoryDistribution: { name: string; value: number }[];
  } | null>(null);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const statsRes = await itemService.getStats();
        const userItemsRes = await itemService.getMyItems(user.id);
        
        setStats({
          totalLost: statsRes.totalLost,
          totalFound: statsRes.totalFound,
          totalRecovered: statsRes.totalRecovered,
          categoryDistribution: statsRes.categoryDistribution,
        });
        setUserItems(userItemsRes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  // Calculate user aggregates
  const userTotalPosted = userItems.length;
  const userTotalRecovered = userItems.filter((i) => i.status === "recovered").length;
  const userActivePostings = userTotalPosted - userTotalRecovered;

  if (loading) {
    return (
      <ProtectedRouteWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full space-y-6">
          <div className="h-8 w-48 bg-neutral-light/70 rounded-badge animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 bg-neutral-light/50 rounded-card animate-pulse"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-neutral-light/50 rounded-card animate-pulse"></div>
            <div className="h-96 bg-neutral-light/50 rounded-card animate-pulse"></div>
          </div>
        </div>
      </ProtectedRouteWrapper>
    );
  }

  return (
    <ProtectedRouteWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
              Activity Dashboard
            </h1>
            <p className="text-sm text-neutral-mid mt-1 font-medium">
              Real-time analytics and statistics of the LostLink network.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/items/add">
              <Button size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
                Report Item
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Main Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStatCard
            title="Total Active Lost Reports"
            value={stats?.totalLost || 0}
            subtext="Items reported lost waiting for discovery"
            icon={<HelpCircle className="w-6 h-6" />}
            variant="secondary"
          />
          <DashboardStatCard
            title="Total Active Found Reports"
            value={stats?.totalFound || 0}
            subtext="Items secured waiting for rightful owners"
            icon={<Search className="w-6 h-6" />}
            variant="primary"
          />
          <DashboardStatCard
            title="Total Recovered Items"
            value={stats?.totalRecovered || 0}
            subtext="Successful reunions matches completed"
            icon={<CheckCircle className="w-6 h-6" />}
            variant="accent"
          />
        </div>

        {/* Charts & Personal contribution split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recharts Pie Chart */}
          <div className="lg:col-span-2">
            <CategoryDistributionChart data={stats?.categoryDistribution || []} />
          </div>

          {/* User Contribution Sub-Stat Card */}
          <div className="flex flex-col gap-6">
            <Card hoverEffect={false} className="p-6 bg-gradient-to-br from-indigo-50/50 to-orange-50/20 border border-neutral-light h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-secondary" />
                  <h3 className="font-extrabold text-neutral-dark text-md">
                    Your Contributions
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-light/50">
                    <span className="text-xs font-semibold text-neutral-mid flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-primary" />
                      Total Items Reported
                    </span>
                    <span className="font-extrabold text-neutral-dark text-md">
                      {userTotalPosted}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5 border-b border-neutral-light/50">
                    <span className="text-xs font-semibold text-neutral-mid flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      Active Postings
                    </span>
                    <span className="font-extrabold text-neutral-dark text-md">
                      {userActivePostings}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-xs font-semibold text-neutral-mid flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Resolved / Recovered
                    </span>
                    <span className="font-extrabold text-accent text-md">
                      {userTotalRecovered}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action prompt */}
              <div className="mt-8 pt-4 border-t border-neutral-light/50 flex flex-col gap-2.5">
                <div className="text-[11px] text-neutral-mid leading-relaxed">
                  Your contributions directly help keep our community records accurate. Mark found items resolved once reclaimed.
                </div>
                <Link href="/items/manage">
                  <Button variant="outline" size="sm" className="w-full text-xs bg-white">
                    Manage My Reports
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRouteWrapper>
  );
}
