import { Feature } from 'geojson';

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
  source?: string; // Source of the data, e.g., 'local_knowledge, defikarte.ch'
  sourceFeature?: Feature; // original feature with eventually additional data
}

export interface TooltipData {
  title: string;
  content: string;
  link?: string; // Optional link for more information
}
