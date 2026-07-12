import { Item } from "@/types/item";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getItems(params: {
  query?: string;
  itemType?: "lost" | "found" | "all";
  category?: string;
  status?: "active" | "recovered" | "all";
  location?: string;
  sortBy?: "newest" | "oldest" | "updated";
  page?: number;
  limit?: number;
} = {}): Promise<{ items: Item[]; total: number; page: number; limit: number }> {
  const queryParams = new URLSearchParams();
  
  if (params.query) queryParams.set("search", params.query);
  if (params.category) queryParams.set("category", params.category);
  if (params.itemType && params.itemType !== "all") queryParams.set("itemType", params.itemType);
  if (params.status && params.status !== "all") queryParams.set("status", params.status);
  if (params.location) queryParams.set("location", params.location);
  if (params.sortBy) queryParams.set("sortBy", params.sortBy);
  if (params.page) queryParams.set("page", params.page.toString());
  if (params.limit) queryParams.set("limit", params.limit.toString());

  const url = `${API_BASE}/api/items?${queryParams.toString()}`;
  const res = await fetch(url, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch items from backend: ${res.statusText}`);
  }

  const data = await res.json();
  
  // Map backend return shape `{ items, totalCount, totalPages, currentPage }`
  // to frontend expected shape `{ items, total, page, limit }`
  return {
    items: data.items || [],
    total: data.totalCount || 0,
    page: data.currentPage || params.page || 1,
    limit: params.limit || 12,
  };
}

export async function getItemById(id: string): Promise<Item | null> {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch item by ID from backend: ${res.statusText}`);
  }

  return res.json();
}
