// Test script to verify API connection
import { config } from './config';

export async function testApiConnection(): Promise<{
  success: boolean;
  error?: string;
  response?: any;
}> {
  try {
    console.log('Testing API connection to:', config.apiBaseUrl);
    
    const response = await fetch(`${config.apiBaseUrl}/api/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API connection successful!', data);
    
    return {
      success: true,
      response: data,
    };
  } catch (error) {
    console.error('API connection failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Test a URL check request
export async function testUrlCheck(testUrl: string = 'https://google.com'): Promise<{
  success: boolean;
  error?: string;
  response?: any;
}> {
  try {
    console.log('Testing URL check API with:', testUrl);
    
    const response = await fetch(`${config.apiBaseUrl}/api/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: testUrl,
        source: 'test',
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('URL check API successful!', data);
    
    return {
      success: true,
      response: data,
    };
  } catch (error) {
    console.error('URL check API failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}