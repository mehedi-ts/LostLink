"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { itemService } from "@/services/itemService";
import { Item } from "@/types/item";
import { formatDate } from "@/utils/formatDate";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import EmptyState from "@/components/ui/EmptyState";
import ProtectedRouteWrapper from "@/components/layout/ProtectedRouteWrapper";
import Card from "@/components/ui/Card";
import {
  List,
  Grid,
  Search,
  Eye,
  Trash2,
  CheckCircle,
  Inbox,
  ImageOff,
  PlusCircle,
  AlertTriangle,
} from "lucide-react";

export default function ManageItemsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchQuery, setSearchQuery] = useState("");

  // Deletion Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUserItems = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const myItems = await itemService.getMyItems(user.id);
      setItems(myItems);
    } catch (e) {
      console.error(e);
      showToast("Failed to fetch your listings.", "error");
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUserItems();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchUserItems]);

  // Handle status toggle (active <-> recovered)
  const handleToggleStatus = async (id: string) => {
    if (!user) return;
    try {
      const updated = await itemService.toggleItemStatus(id, user.id);
      if (updated) {
        showToast(
          `Listing marked as ${updated.status === "recovered" ? "recovered" : "active"}!`,
          "success"
        );
        // Refresh local state items array
        setItems((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: updated.status } : item))
        );
      }
    } catch {
      showToast("Failed to update item status.", "error");
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (item: Item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  // Execute deletion
  const handleDeleteConfirm = async () => {
    if (!user || !itemToDelete) return;
    setDeleteLoading(true);
    try {
      const success = await itemService.deleteItem(itemToDelete._id, user.id);
      if (success) {
        showToast("Listing deleted successfully.", "success");
        setItems((prev) => prev.filter((i) => i._id !== itemToDelete._id));
      } else {
        showToast("Failed to delete listing. Unauthorized.", "error");
      }
    } catch {
      showToast("Error deleting item.", "error");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  // Filter items based on local search query (title / category / location)
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRouteWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-dark tracking-tight">
              Manage Your Listings
            </h1>
            <p className="text-sm text-neutral-mid mt-1 font-medium">
              View, edit status, or delete reports you have created.
            </p>
          </div>
          <Link href="/items/add">
            <Button leftIcon={<PlusCircle className="w-4 h-4" />}>
              Create New Report
            </Button>
          </Link>
        </div>

        {/* Inner controls bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-card border border-neutral-light shadow-sm mb-6">
          {/* Search within own listings */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search your posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-mid/20 rounded-input focus:outline-none focus:border-primary"
            />
            <Search className="w-4 h-4 text-neutral-mid absolute left-3.5 top-3" />
          </div>

          {/* Table/Card View Toggle button */}
          <div className="flex border border-neutral-mid/10 rounded-badge overflow-hidden p-0.5 bg-neutral-light/50 self-end sm:self-auto">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-badge transition-colors cursor-pointer ${
                viewMode === "table" ? "bg-white text-primary shadow-sm" : "text-neutral-mid hover:text-neutral-dark"
              }`}
              title="Table View"
            >
              <List className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-badge transition-colors cursor-pointer ${
                viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-neutral-mid hover:text-neutral-dark"
              }`}
              title="Grid View"
            >
              <Grid className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-neutral-light/40 rounded-card animate-pulse"></div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="No Listings Created"
            description="You haven't posted any lost or found items yet. Get started by reporting an item today!"
            actionLabel="Report Lost/Found Item"
            onAction={() => router.push("/items/add")}
            icon={<Inbox className="w-8 h-8 text-neutral-mid" />}
          />
        ) : filteredItems.length === 0 ? (
          <EmptyState
            title="No Matching Listings"
            description="We couldn't find any of your posts matching that query term."
            actionLabel="Clear Search"
            onAction={() => setSearchQuery("")}
          />
        ) : viewMode === "grid" ? (
          // Grid view representation
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item._id} className="p-5 flex flex-col justify-between h-full bg-white relative">
                <div className="flex gap-4">
                  {/* Mini-thumbnail */}
                  <div className="w-20 h-20 bg-neutral-light rounded-card overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-mid/40">
                        <ImageOff className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Body text */}
                  <div className="flex-grow flex flex-col gap-1">
                    <div className="flex gap-1.5 items-center flex-wrap">
                      <Badge variant={item.itemType === "lost" ? "lost" : "found"}>{item.itemType}</Badge>
                      <Badge variant={item.status === "recovered" ? "recovered" : "active"}>{item.status}</Badge>
                    </div>
                    <h3 className="font-bold text-neutral-dark text-sm mt-1 line-clamp-1">{item.title}</h3>
                    <span className="text-[10px] text-neutral-mid font-semibold uppercase">{item.category}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-light flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-neutral-mid">Posted {formatDate(item.createdAt)}</span>
                  <div className="flex gap-2">
                    <Link href={`/listings/${item._id}`}>
                      <Button variant="outline" size="sm" className="p-2 h-8 w-8">
                        <Eye className="w-4 h-4 text-neutral-mid" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleToggleStatus(item._id)}
                      variant="outline"
                      size="sm"
                      className="p-2 h-8 w-8 text-accent border-accent/20 hover:bg-accent-light"
                      title={item.status === "active" ? "Mark Recovered" : "Mark Active"}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => openDeleteModal(item)}
                      variant="outline"
                      size="sm"
                      className="p-2 h-8 w-8 text-error border-error/20 hover:bg-error-light"
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Table view representation (Responsive horizontal scroll)
          <div className="bg-white rounded-card border border-neutral-light shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-neutral-light/50 border-b border-neutral-light font-bold text-xs uppercase text-neutral-mid tracking-wider">
                    <th className="px-6 py-4">Thumbnail</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date Logged</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-light text-sm">
                  {filteredItems.map((item) => (
                    <tr key={item._id} className="hover:bg-neutral-light/20 transition-colors">
                      <td className="px-6 py-3">
                        <div className="w-12 h-12 rounded-card bg-neutral-light overflow-hidden">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-mid/45">
                              <ImageOff className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3 font-bold text-neutral-dark">
                        <Link href={`/listings/${item._id}`} className="hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={item.itemType === "lost" ? "lost" : "found"}>{item.itemType}</Badge>
                      </td>
                      <td className="px-6 py-3 text-xs font-semibold text-neutral-mid uppercase">
                        {item.category}
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={item.status === "recovered" ? "recovered" : "active"}>{item.status}</Badge>
                      </td>
                      <td className="px-6 py-3 text-xs text-neutral-mid font-medium">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <Link href={`/listings/${item._id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="p-1.5 h-8 w-8"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-neutral-mid" />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleToggleStatus(item._id)}
                            variant="outline"
                            size="sm"
                            className="p-1.5 h-8 w-8 text-accent border-accent/20 hover:bg-accent-light"
                            title={item.status === "active" ? "Mark Recovered" : "Mark Active"}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => openDeleteModal(item)}
                            variant="outline"
                            size="sm"
                            className="p-1.5 h-8 w-8 text-error border-error/20 hover:bg-error-light"
                            title="Delete Report"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Delete Listing"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={deleteLoading}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm} isLoading={deleteLoading}>
                Delete Report
              </Button>
            </>
          }
        >
          <div className="flex gap-3.5 items-start">
            <div className="w-10 h-10 bg-rose-50 border border-rose-200 text-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-neutral-dark text-sm">Are you sure you want to delete this listing?</p>
              <p className="text-xs text-neutral-mid leading-relaxed mt-1">
                You are about to remove <span className="font-semibold text-neutral-dark">&quot;{itemToDelete?.title}&quot;</span>. This action is permanent and cannot be undone. All database records and photos will be removed.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </ProtectedRouteWrapper>
  );
}
