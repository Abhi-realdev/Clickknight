// API Configuration
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
} as const;

// Helper function to construct API URLs
export function getApiUrl(endpoint: string): string {
  return `${config.apiBaseUrl}${endpoint}`;
}