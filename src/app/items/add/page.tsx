"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { itemService } from "@/services/itemService";
import ItemForm, { ItemFormData } from "@/components/features/items/ItemForm";
import ProtectedRouteWrapper from "@/components/layout/ProtectedRouteWrapper";
import Card from "@/components/ui/Card";
import { AlertCircle } from "lucide-react";

export default function AddItemPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: ItemFormData) => {
    if (!user) {
      showToast("You must be signed in to list items.", "error");
      return;
    }

    setLoading(true);
    try {
      await itemService.createItem(
        {
          itemType: data.itemType,
          title: data.title,
          category: data.category,
          description: data.description,
          location: data.location,
          date: data.date,
          imageUrl: data.imageUrl || undefined,
          contactName: data.contactName,
          contactNumber: data.contactNumber,
        },
        user.id
      );

      showToast("Listing published successfully! It is now visible to the community.", "success");
      router.push("/items/manage");
    } catch {
      showToast("Failed to create report. Please check required fields.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRouteWrapper>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
            Report Lost or Found Belonging
          </h1>
          <p className="text-sm text-neutral-mid mt-1 font-medium">
            Fill out the report description below. Try to be as descriptive as possible.
          </p>
        </div>

        {/* Form Envelope Card */}
        <Card hoverEffect={false} className="bg-white border border-neutral-light shadow-md p-6 sm:p-10">
          {/* Mock banner info */}
          <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-card mb-8">
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 font-medium">
              <span className="font-extrabold">Public Safety Reminder:</span> For your safety, do not share passwords, credit card credentials, or home addresses in description copy. Keep meetings in populated, public areas during daytime.
            </div>
          </div>

          <ItemForm onSubmit={handleFormSubmit} isLoading={loading} />
        </Card>
      </div>
    </ProtectedRouteWrapper>
  );
}
