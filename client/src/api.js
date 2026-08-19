const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
const baseUrl = apiUrl.endsWith('/api') ? apiUrl : `${apiUrl}/api`;

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue.');
  }

  return data;
}

export const api = {
  categories: () => request('/categories'),
  artisans: (params = '') => request(`/artisans${params}`),
  artisan: (id) => request(`/artisans/${id}`),
  contact: (id, body) => request(`/artisans/${id}/contact`, {
    method: 'POST',
    body: JSON.stringify(body)
  })
};

