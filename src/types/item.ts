export interface Item {
  _id: string;
  itemType: "lost" | "found";
  title: string;
  category: string; // Electronics, ID Card, Bag, Keys, Documents, Accessories, Clothing, Pet, Other
   shortDescription: string;
  description: string;
  location: string;
  date: string; // ISO date string (YYYY-MM-DD)
  imageUrl?: string;
  contactName: string;
  contactNumber: string;
  status: "active" | "recovered";
  postedBy: string; // mock user id
  createdAt: string;
  updatedAt: string;
}
