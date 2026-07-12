"use server";

import { Item } from "@/types/item";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function extractError(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    return body?.message || body?.error || fallback;
  } catch {
    return fallback;
  }
}

export async function createItem(
  itemData: Omit<Item, "_id" | "createdAt" | "updatedAt" | "postedBy" | "status">,
  postedBy: string
): Promise<Item> {
  const res = await fetch(`${API_BASE}/api/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...itemData, postedBy }),
  });

  if (!res.ok) {
    const message = await extractError(res, res.statusText);
    throw new Error(`Failed to create item in backend: ${message}`);
  }

  return res.json();
}

export async function updateItem(id: string, data: Partial<Item>): Promise<Item> {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await extractError(res, res.statusText);
    throw new Error(`Failed to update item in backend: ${message}`);
  }

  return res.json();
}

export async function deleteItem(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const message = await extractError(res, res.statusText);
    throw new Error(`Failed to delete item in backend: ${message}`);
  }

  return res.status === 200 || res.status === 204;
}

export async function getMyItems(postedBy: string): Promise<Item[]> {
  const res = await fetch(`${API_BASE}/api/items/user/${postedBy}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await extractError(res, res.statusText);
    throw new Error(`Failed to fetch user items from backend: ${message}`);
  }

  return res.json();
}