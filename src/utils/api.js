// src/utils/api.js

// Mock version for testing without backend
export const shortenURL = async (data) => {
  return {
    data: {
      short_url: `http://short.ly/${data.shortcode || Math.random().toString(36).substring(2, 8)}`,
      original_url: data.url,
      expires_at: new Date(Date.now() + (data.validity || 30) * 60000).toISOString(),
    },
  };
};

// Stats and redirect will still error unless also mocked
export const getStats = async () => {
  return { data: [] }; // empty stats for now
};

export const getRedirect = async (shortcode) => {
  return {
    data: {
      original_url: 'https://www.google.com',
    },
  };
};

export default {};
