export interface AedData {
  id?: string;
  reporter: string;
  location: string;
  level?: string;
  description?: string;
  openingHours?: string; // Opening hours of the AED location
  operator?: string; // Name of the organization or person responsible for the AED
  operatorPhone?: string; // Contact phone number for the operator
  access?: 'yes' | 'permissive' | 'private';
  indoor?: 'yes' | 'no';
  latitude: number;
  longitude: number;
}

export interface TooltipData {
  title: string;
  content: string;
  link?: string; // Optional link for more information
}
