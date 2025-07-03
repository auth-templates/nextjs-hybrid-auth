import { customFetch } from '@/api/fetcher';
import type { CreateClientConfig } from './src/api/generated/client.gen';

// Read this: https://heyapi.dev/openapi-ts/clients/fetch#runtime-api

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: 'http://localhost:3001',
  fetch: customFetch,
  credentials: "include"
});