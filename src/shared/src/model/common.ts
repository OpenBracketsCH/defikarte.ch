export interface ApiConfiguration {
  baseUrl: string;
  apiKey: string;
}

export type RequestOptions = {
  signal?: AbortSignal;
};
