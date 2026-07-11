"use client";

import React, { useState } from "react";
import { Item } from "@/types/item";
import { formatDate } from "@/utils/formatDate";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MapPin, Calendar, User, Phone, ArrowLeft, ImageOff, Lock } from "lucide-react";

interface ItemDetailsViewProps {
  item: Item;
  onBack: () => void;
}

export const ItemDetailsView: React.FC<ItemDetailsViewProps> = ({ item, onBack }) => {
  const {
    itemType,
    title,
    category,
    description,
    location,
    date,
    imageUrl,
    status,
    contactName,
    contactNumber,
  } = item;

  const [revealContact, setRevealContact] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-mid hover:text-primary transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side: Product Image */}
        <div className="bg-neutral-light/50 border border-neutral-light rounded-modal overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[450px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover max-h-[500px]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-mid/50 gap-3 p-8">
              <ImageOff className="w-16 h-16" />
              <span className="text-sm font-bold uppercase tracking-wider">
                No Image Uploaded
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant={itemType === "lost" ? "lost" : "found"}>
                {itemType}
              </Badge>
              {status === "recovered" ? (
                <Badge variant="recovered">Recovered</Badge>
              ) : (
                <Badge variant="active">Active</Badge>
              )}
              <span className="text-xs font-bold text-neutral-mid/70 bg-neutral-light px-2.5 py-0.5 rounded-badge border border-neutral-mid/10">
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-dark leading-tight">
              {title}
            </h1>

            {/* Meta (Location & Date) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-y border-neutral-light/70 py-4 my-2">
              <div className="flex items-center gap-2 text-sm text-neutral-mid">
                <MapPin className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-neutral-dark/40 uppercase">Location</span>
                  <span className="font-medium text-neutral-dark">{location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-mid">
                <Calendar className="w-4.5 h-4.5 text-secondary flex-shrink-0" />
                <div>
                  <span className="block text-xs font-semibold text-neutral-dark/40 uppercase">Date Logged</span>
                  <span className="font-medium text-neutral-dark">{formatDate(date)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-neutral-dark uppercase tracking-wider">Description</h3>
              <p className="text-sm text-neutral-mid leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="mt-8 border border-neutral-light bg-neutral-light/5 rounded-card p-5">
            <h3 className="text-sm font-bold text-neutral-dark uppercase tracking-wider mb-3">
              Reporter Info
            </h3>

            {!revealContact ? (
              <div className="flex flex-col items-center justify-center p-4 border border-dashed border-neutral-mid/20 rounded-card bg-white text-center gap-3">
                <Lock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs font-bold text-neutral-dark">Contact Information Locked</p>
                  <p className="text-[11px] text-neutral-mid">Click the button below to view contact details.</p>
                </div>
                <Button size="sm" onClick={() => setRevealContact(true)}>
                  Reveal Contact Details
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-white rounded-card border border-neutral-light/50 p-4 animate-fade-in">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 text-sm text-neutral-dark">
                    <User className="w-4.5 h-4.5 text-primary" />
                    <div>
                      <span className="text-[11px] block font-semibold text-neutral-mid">Name</span>
                      <span className="font-bold">{contactName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm text-neutral-dark">
                    <Phone className="w-4.5 h-4.5 text-secondary" />
                    <div>
                      <span className="text-[11px] block font-semibold text-neutral-mid">Phone Number</span>
                      <a href={`tel:${contactNumber}`} className="font-bold hover:text-primary transition-colors">
                        {contactNumber}
                      </a>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={() => setRevealContact(false)}>
                  Hide Info
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsView;
