/**
 * CSRF (Cross-Site Request Forgery) Protection
 *
 * When using HttpOnly cookies for authentication, we need CSRF protection.
 * The server should implement one of these strategies:
 *
 * 1. SameSite Cookie Attribute (Recommended)
 *    - Set cookies with SameSite=Strict or SameSite=Lax
 *    - This is the modern approach and works well
 *
 * 2. CSRF Token (Double Submit Cookie)
 *    - Server sends a CSRF token in response header
 *    - Client includes it in subsequent requests
 *
 * 3. Custom Header Verification
 *    - Server checks for custom headers like X-Requested-With
 */

import { axiosInstance } from './axios';

// If your server uses CSRF tokens, uncomment and use this
export const getCsrfToken = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/auth/csrf-token');
    return response.data.csrfToken;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    throw error;
  }
};

// Add CSRF token to request headers if available
export const addCsrfToken = (csrfToken: string | null) => {
  if (csrfToken) {
    axiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  }
};
