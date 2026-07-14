"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import { validators } from "@/utils/validators";
import { CATEGORIES } from "./ItemFilterPanel";
import { ImageOff, UploadCloud, Info } from "lucide-react";

interface ItemFormData {
  itemType: "lost" | "found";
  title: string;
  category: string;
   shortDescription: string;
  description: string;
  location: string;
  date: string;
  imageUrl?: string;
  contactName: string;
  contactNumber: string;
}

interface ItemFormProps {
  onSubmit: (data: ItemFormData) => void;
  isLoading: boolean;
  initialValues?: Partial<ItemFormData>;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  onSubmit,
  isLoading,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ItemFormData>({
    defaultValues: {
      itemType: "lost",
      category: "Electronics",
      ...initialValues,
    },
  });

  // Watch values for reactive rendering (toggle status & image url preview)
  const itemType = useWatch({ control, name: "itemType" });
  const imageUrl = useWatch({ control, name: "imageUrl" });

  const handleTypeToggle = (type: "lost" | "found") => {
    setValue("itemType", type);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Lost / Found Toggle */}
      <div>
        <label className="text-sm font-bold text-neutral-dark block mb-2">
          Report Status
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleTypeToggle("lost")}
            className={`flex-1 py-3 text-sm font-bold text-center border-2 rounded-card transition-all cursor-pointer ${
              itemType === "lost"
                ? "border-secondary bg-secondary-light text-secondary shadow-sm"
                : "border-neutral-mid/10 hover:border-neutral-mid/30 hover:bg-neutral-light text-neutral-dark"
            }`}
          >
            I Lost Something
          </button>
          <button
            type="button"
            onClick={() => handleTypeToggle("found")}
            className={`flex-1 py-3 text-sm font-bold text-center border-2 rounded-card transition-all cursor-pointer ${
              itemType === "found"
                ? "border-primary bg-primary-light text-primary shadow-sm"
                : "border-neutral-mid/10 hover:border-neutral-mid/30 hover:bg-neutral-light text-neutral-dark"
            }`}
          >
            I Found Something
          </button>
        </div>
        <input type="hidden" {...register("itemType")} />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Item Title"
            placeholder="e.g. Lost iPhone 13 in red leather case"
            error={errors.title?.message}
            {...register("title", validators.itemTitle)}
          />
        </div>

        <div>
          <Select
            label="Category"
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
            {...register("category")}
          />
        </div>

        <div>
          <Input
            label="Date Lost/Found"
            type="date"
            error={errors.date?.message}
            {...register("date", validators.date)}
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Location"
            placeholder="e.g. Starbucks at 5th Ave, or Central Park near the fountain"
            error={errors.location?.message}
            {...register("location", validators.location)}
          />
        </div>
      </div>

     {/* Short Description */}
<div>
  <Input
    label="Short Description"
    placeholder="e.g. Black wallet with keys inside"
    error={errors.shortDescription?.message}
    {...register("shortDescription", validators.itemShortDescription)}
  />
  <p className="text-[11px] text-neutral-mid mt-1">
    One-line summary shown on listing cards (max ~100 characters).
  </p>
</div>

{/* Full Description */}
<div>
  <TextArea
    label="Full Description"
    placeholder="Describe unique characteristics, markings, brand, contents of the bag, or details that can prove ownership..."
    error={errors.description?.message}
    {...register("description", validators.itemDescription)}
  />
</div>

      {/* Image Preview & URL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <Input
            label="Image URL"
            placeholder="e.g. https://images.unsplash.com/... or any hosted image link"
            error={errors.imageUrl?.message}
            {...register("imageUrl")}
          />
          <div className="flex items-start gap-1.5 mt-2 bg-indigo-50 border border-indigo-100 rounded-badge p-2">
            <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-indigo-900 leading-normal">
              In this mock phase, paste any web image URL (e.g. from unsplash.com) to view a live preview of the listing asset.
            </p>
          </div>
        </div>

        {/* Live Image Preview panel */}
        <div>
          <span className="text-xs font-semibold text-neutral-dark block mb-2">
            Image Preview
          </span>
          <div className="w-full h-32 bg-neutral-light border border-neutral-light rounded-card flex flex-col items-center justify-center overflow-hidden text-neutral-mid/60">
            {imageUrl && imageUrl.trim().startsWith("http") ? (
              <img
                src={imageUrl}
                alt="Form Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "";
                  (e.target as HTMLImageElement).parentElement?.classList.add("show-fallback");
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <ImageOff className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wide">No Image Preview</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="border-t border-neutral-light/70 pt-6">
        <h3 className="text-md font-bold text-neutral-dark mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              label="Contact Name"
              placeholder="e.g. Jane Doe"
              error={errors.contactName?.message}
              {...register("contactName", validators.name)}
            />
          </div>
          <div>
            <Input
              label="Contact Phone Number"
              placeholder="e.g. 555-0199"
              error={errors.contactNumber?.message}
              {...register("contactNumber", validators.phone)}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex gap-4">
        <Button type="submit" isLoading={isLoading} className="flex-1">
          Publish Report
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;
export type { ItemFormData };
