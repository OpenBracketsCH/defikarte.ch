export interface AedData {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  phone?: string;
  imageUrl?: string;
  isAvailable?: boolean; // Indicates if the AED is available for use
  createdAt?: Date; // Timestamp of when the AED was created
  updatedAt?: Date; // Timestamp of when the AED was last updated
}

export interface TooltipData {
  title: string;
  content: string;
  link?: string; // Optional link for more information
}
