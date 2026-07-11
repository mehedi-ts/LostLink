"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import Card from "@/components/ui/Card";

interface DataItem {
  name: string;
  value: number;
}

interface CategoryDistributionChartProps {
  data: DataItem[];
}

const COLORS = [
  "#4F46E5", // Primary Indigo
  "#F97316", // Secondary Coral
  "#10B981", // Accent Emerald
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#06B6D4", // Cyan
  "#3B82F6", // Blue
  "#64748B", // Slate
];

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return (
      <Card className="p-6 h-[380px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-neutral-mid/60 text-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
          <span>Loading chart graphics...</span>
        </div>
      </Card>
    );
  }

  // Handle empty state
  if (data.length === 0) {
    return (
      <Card className="p-6 h-[380px] flex items-center justify-center text-center">
        <div className="text-neutral-mid max-w-xs text-xs font-semibold">
          No items logged to compile statistics. Category distribution will render once items are added.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-[380px] flex flex-col justify-between">
      <div>
        <h3 className="font-extrabold text-neutral-dark text-md">
          Category Distribution
        </h3>
        <p className="text-xs text-neutral-mid mt-0.5 font-medium">
          Breakdown of logged lost and found items by category
        </p>
      </div>

      <div className="w-full h-64 flex-1 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "12px",
                borderColor: "#F1F5F9",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
                fontWeight: "600",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-[11px] font-semibold text-neutral-dark">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryDistributionChart;
