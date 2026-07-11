"use client";

import React from "react";
import Link from "next/link";
import { Item } from "@/types/item";
import { formatDate } from "@/utils/formatDate";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { MapPin, Calendar, ImageOff } from "lucide-react";

interface RelatedItemsListProps {
  items: Item[];
}

export const RelatedItemsList: React.FC<RelatedItemsListProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-5 mt-12 border-t border-neutral-light pt-8">
      <h2 className="text-lg md:text-xl font-extrabold text-neutral-dark">
        Related Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link key={item._id} href={`/listings/${item._id}`} className="group block">
            <Card hoverEffect={true} className="h-full">
              {/* Mini Image */}
              <div className="relative h-32 bg-neutral-light/50 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-mid/40">
                    <ImageOff className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge variant={item.itemType === "lost" ? "lost" : "found"} className="scale-90 origin-top-left">
                    {item.itemType}
                  </Badge>
                </div>
              </div>

              {/* Title & Location */}
              <div className="p-3.5 flex flex-col gap-1.5 flex-1 justify-between">
                <h4 className="text-xs font-bold text-neutral-dark line-clamp-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <div className="flex flex-col gap-1 text-[11px] text-neutral-mid">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-secondary flex-shrink-0" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedItemsList;
