import { Item } from "@/types/item";
import { getItems, getItemById } from "@/app/lib/api";
import { createItem, updateItem, deleteItem, getMyItems } from "@/app/lib/actions";

export const itemService = {
  /**
   * Browse, search, filter, sort, and paginate listings
   */
  async getItems(params: {
    query?: string;
    itemType?: "lost" | "found" | "all";
    category?: string;
    status?: "active" | "recovered" | "all";
    location?: string;
    sortBy?: "newest" | "oldest" | "updated";
    page?: number;
    limit?: number;
  } = {}): Promise<{ items: Item[]; total: number; page: number; limit: number }> {
    return getItems(params);
  },

  /**
   * Get dynamic stats for home and dashboard charts
   */
  async getStats(): Promise<{
    totalLost: number;
    totalFound: number;
    totalRecovered: number;
    categoryDistribution: { name: string; value: number }[];
    recentItems: Item[];
  }> {
    // Fetch items with a large limit to compute stats locally
    const response = await this.getItems({ limit: 1000 });
    const items = response.items;

    const totalLost = items.filter((i) => i.itemType === "lost" && i.status === "active").length;
    const totalFound = items.filter((i) => i.itemType === "found" && i.status === "active").length;
    const totalRecovered = items.filter((i) => i.status === "recovered").length;

    // Category Distribution for active items
    const catMap: Record<string, number> = {};
    items.forEach((item) => {
      catMap[item.category] = (catMap[item.category] || 0) + 1;
    });

    const categoryDistribution = Object.keys(catMap).map((cat) => ({
      name: cat,
      value: catMap[cat],
    }));

    // Get 6 most recent active items
    const recentItems = [...items]
      .filter((item) => item.status === "active")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    return {
      totalLost,
      totalFound,
      totalRecovered,
      categoryDistribution,
      recentItems,
    };
  },

  /**
   * Fetch details of a single item
   */
  async getItemById(id: string): Promise<Item | null> {
    return getItemById(id);
  },

  /**
   * Get related items (matching category, excluding current item ID, max 4)
   */
  async getRelatedItems(category: string, excludeId: string): Promise<Item[]> {
    const response = await this.getItems({ category, limit: 10 });
    return response.items
      .filter((item) => item._id !== excludeId && item.status === "active")
      .slice(0, 4);
  },

  /**
   * Create a new item listing
   */
  async createItem(
    itemData: Omit<Item, "_id" | "createdAt" | "updatedAt" | "postedBy" | "status">,
    postedBy: string
  ): Promise<Item> {
    return createItem(itemData, postedBy);
  },

  /**
   * Delete an item listing
   */
  async deleteItem(id: string, postedBy: string): Promise<boolean> {
    return deleteItem(id);
  },

  /**
   * Retrieve posts created by a specific user
   */
  async getMyItems(postedBy: string): Promise<Item[]> {
    return getMyItems(postedBy);
  },

  /**
   * Toggle item status (active <-> recovered)
   */
  async toggleItemStatus(id: string, postedBy: string): Promise<Item | null> {
    const item = await this.getItemById(id);
    if (!item) return null;

    const newStatus = item.status === "active" ? "recovered" : "active";
    return updateItem(id, { status: newStatus });
  },
};

