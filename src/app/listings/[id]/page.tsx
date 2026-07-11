"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Item } from "@/types/item";
import { itemService } from "@/services/itemService";
import ItemDetailsView from "@/components/features/items/ItemDetailsView";
import RelatedItemsList from "@/components/features/items/RelatedItemsList";
import EmptyState from "@/components/ui/EmptyState";
import { ImageOff } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ItemDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [item, setItem] = useState<Item | null>(null);
  const [related, setRelated] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const foundItem = await itemService.getItemById(id);
        if (foundItem) {
          setItem(foundItem);
          // Fetch related items from the same category
          const relatedItems = await itemService.getRelatedItems(
            foundItem.category,
            foundItem._id
          );
          setRelated(relatedItems);
        } else {
          setItem(null);
        }
      } catch (e) {
        console.error("Failed to load item detail:", e);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const handleBack = () => {
    router.push("/listings");
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col gap-6">
        <div className="w-24 h-4 bg-neutral-light/75 rounded-badge animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
          <div className="h-96 bg-neutral-light/75 rounded-modal"></div>
          <div className="flex flex-col gap-6">
            <div className="w-1/3 h-5 bg-neutral-light/75 rounded-badge"></div>
            <div className="w-3/4 h-8 bg-neutral-light/75 rounded-badge"></div>
            <div className="w-full h-24 bg-neutral-light/75 rounded-card"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow">
        <EmptyState
          title="Listing Not Found"
          description="The item you are searching for does not exist, or has been removed by the publisher."
          actionLabel="Return to Directory"
          onAction={handleBack}
          icon={<ImageOff className="w-8 h-8 text-neutral-mid" />}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
      {/* Details Box */}
      <ItemDetailsView item={item} onBack={handleBack} />

      {/* Related listings */}
      <RelatedItemsList items={related} />
    </div>
  );
}
