"use client";

import React from "react";
import Link from "next/link";
import { Item } from "@/types/item";
import { formatDate } from "@/utils/formatDate";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { MapPin, Calendar, ArrowRight, ImageOff } from "lucide-react";

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { _id, itemType, title, category, description, location, date, imageUrl, status } = item;

  // Shorten description for card view
  const truncateText = (text: string, limit = 90) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        {/* Card Image */}
        <div className="relative w-full h-48 bg-neutral-light/50 flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-mid/60 gap-2">
              <ImageOff className="w-10 h-10" />
              <span className="text-xs font-semibold uppercase tracking-wider">No Image Provided</span>
            </div>
          )}

          {/* Floating badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <Badge variant={itemType === "lost" ? "lost" : "found"}>
              {itemType}
            </Badge>
          </div>
          {status === "recovered" && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="recovered">Recovered</Badge>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col gap-2">
          {/* Category */}
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {category}
          </span>

          {/* Title */}
          <Link href={`/listings/${_id}`} className="hover:text-primary transition-colors">
            <h3 className="text-md font-bold text-neutral-dark line-clamp-1">
              {title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-neutral-mid leading-relaxed line-clamp-2">
            {truncateText(description)}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-neutral-light/40 flex flex-col gap-2 bg-neutral-light/5">
        <div className="flex items-center text-xs text-neutral-mid gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="truncate" title={location}>
            {location}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-mid mt-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span>{formatDate(date)}</span>
          </div>
          <Link
            href={`/listings/${_id}`}
            className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-0.5 group"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
