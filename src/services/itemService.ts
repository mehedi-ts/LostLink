import { Item } from "@/types/item";
import { INITIAL_ITEMS } from "./mockData";

const isBrowser = typeof window !== "undefined";

// Delay helper to simulate network latency
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredItems = (): Item[] => {
  if (!isBrowser) return INITIAL_ITEMS;
  const stored = localStorage.getItem("lostlink_items");
  if (!stored) {
    localStorage.setItem("lostlink_items", JSON.stringify(INITIAL_ITEMS));
    return INITIAL_ITEMS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_ITEMS;
  }
};

const saveStoredItems = (items: Item[]): void => {
  if (isBrowser) {
    localStorage.setItem("lostlink_items", JSON.stringify(items));
  }
};

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
    await delay(500);
    const items = getStoredItems();

    const query = params.query?.toLowerCase().trim() || "";
    const itemType = params.itemType || "all";
    const category = params.category || "";
    const status = params.status || "all";
    const location = params.location?.toLowerCase().trim() || "";
    const sortBy = params.sortBy || "newest";
    const page = params.page || 1;
    const limit = params.limit || 12;

    // Apply filtering
    const filtered = items.filter((item) => {
      // 1. Text Search (title & description)
      if (query && !item.title.toLowerCase().includes(query) && !item.description.toLowerCase().includes(query)) {
        return false;
      }
      // 2. Item Type (lost / found)
      if (itemType !== "all" && item.itemType !== itemType) {
        return false;
      }
      // 3. Category
      if (category && item.category !== category) {
        return false;
      }
      // 4. Status
      if (status !== "all" && item.status !== status) {
        return false;
      }
      // 5. Location
      if (location && !item.location.toLowerCase().includes(location)) {
        return false;
      }
      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === "updated") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else {
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      items: paginated,
      total,
      page,
      limit,
    };
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
    await delay(300);
    const items = getStoredItems();

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
    await delay(400);
    const items = getStoredItems();
    const found = items.find((item) => item._id === id);
    return found || null;
  },

  /**
   * Get related items (matching category, excluding current item ID, max 4)
   */
  async getRelatedItems(category: string, excludeId: string): Promise<Item[]> {
    await delay(300);
    const items = getStoredItems();
    return items
      .filter((item) => item.category === category && item._id !== excludeId && item.status === "active")
      .slice(0, 4);
  },

  /**
   * Create a new item listing
   */
  async createItem(
    itemData: Omit<Item, "_id" | "createdAt" | "updatedAt" | "postedBy" | "status">,
    postedBy: string
  ): Promise<Item> {
    await delay(600);
    const items = getStoredItems();

    const newItem: Item = {
      ...itemData,
      _id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "active",
      postedBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    items.unshift(newItem);
    saveStoredItems(items);
    return newItem;
  },

  /**
   * Delete an item listing
   */
  async deleteItem(id: string, postedBy: string): Promise<boolean> {
    await delay(500);
    const items = getStoredItems();
    const initialLength = items.length;

    // Filter out item ensuring it was posted by the user
    const updated = items.filter((item) => !(item._id === id && item.postedBy === postedBy));

    if (updated.length === initialLength) {
      return false; // Not found or unauthorized
    }

    saveStoredItems(updated);
    return true;
  },

  /**
   * Retrieve posts created by a specific user
   */
  async getMyItems(postedBy: string): Promise<Item[]> {
    await delay(450);
    const items = getStoredItems();
    return items.filter((item) => item.postedBy === postedBy);
  },

  /**
   * Toggle item status (active <-> recovered)
   */
  async toggleItemStatus(id: string, postedBy: string): Promise<Item | null> {
    await delay(400);
    const items = getStoredItems();
    let updatedItem: Item | null = null;

    const updated = items.map((item) => {
      if (item._id === id && item.postedBy === postedBy) {
        updatedItem = {
          ...item,
          status: item.status === "active" ? "recovered" : "active",
          updatedAt: new Date().toISOString(),
        };
        return updatedItem;
      }
      return item;
    });

    if (updatedItem) {
      saveStoredItems(updated);
    }
    return updatedItem;
  },
};
