const BASE_URL = "/api";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || `La solicitud falló (${response.status})`
    );

    error.statusCode = response.status;
    throw error;
  }

  return data;
}

function getAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function register({ name, email, password }) {
  return request("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}

export function login({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser(token, signal) {
  return request("/users/me", {
    headers: getAuthHeaders(token),
    signal,
  });
}

export function getArticles(token, signal) {
  return request("/articles", {
    headers: getAuthHeaders(token),
    signal,
  });
}

export function createArticle(article, token) {
  const {
    keyword,
    title,
    description,
    date,
    source,
    url,
    image,
  } = article;

  return request("/articles", {
    method: "POST",
    headers: {
      ...getAuthHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword,
      title,
      description: description?.trim() || "Descripción no disponible.",
      date,
      source,
      url,
      image,
    }),
  });
}

export function deleteArticle(id, token) {
  return request(`/articles/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
}