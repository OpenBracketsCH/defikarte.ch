import { Feature } from 'geojson';

export interface AedData {
  id?: string;
  reporter: string;
  location: string;
  level?: string;
  description?: string;
  openingHours?: string;
  operator?: string;
  operatorPhone?: string;
  operatorEmail?: string;
  access?: 'yes' | 'permissive' | 'private';
  indoor?: 'yes' | 'no';
  latitude: number;
  longitude: number;
  source?: string;
  sourceFeature?: Feature;
  wikimediaCommons?: string;
}

export interface TooltipData {
  title: string;
  content: string;
  link?: string;
}