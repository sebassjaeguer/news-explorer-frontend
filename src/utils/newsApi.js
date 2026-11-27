const NEWS_API_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

async function getNews(keyword, apiKey) {
  const url = new URL(NEWS_API_URL);

  const currentDate = new Date();
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const to = currentDate.toISOString().split("T")[0];
  const from = sevenDaysAgo.toISOString().split("T")[0];

  url.searchParams.set("q", keyword);
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("pageSize", "100");
  url.searchParams.set("language", "es");

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.status === "error") {
    throw new Error(
      data.message || `No se pudieron obtener noticias (${response.status})`
    );
  }

  return data;
}

export { getNews };