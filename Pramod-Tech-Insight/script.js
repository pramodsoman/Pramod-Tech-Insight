const apiKey = "YOUR_API_KEY";
let page = 1;
let totalResults = 0;

async function getFullStackNews() {
  const fullStackApiUrl = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&category=technology&language=en&page=${page}`;

  try {
    const response = await fetch(fullStackApiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    totalResults = data.news.length;

    const newsContainer = document.getElementById("news-container");

    data.news.forEach((article) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");

      const image = document.createElement("img");
      image.classList.add("news-image");
      image.src = article.image || "placeholder-image.jpg";
      image.alt = article.title;

      const content = document.createElement("div");
      content.classList.add("news-content");

      const title = document.createElement("h2");
      title.classList.add("news-title");
      title.textContent = article.title;

      const description = document.createElement("p");
      description.classList.add("news-description");
      description.textContent = article.description;

      const source = document.createElement("p");
      source.classList.add("news-source");
      source.textContent = `Source: ${article.author}`;

      const publishedAt = document.createElement("p");
      publishedAt.classList.add("news-published-at");
      publishedAt.textContent = `Published: ${article.published}`;

      const readMore = document.createElement("a");
      readMore.classList.add("news-read-more");
      readMore.href = article.url;
      readMore.textContent = "Read More";

      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(source);
      content.appendChild(publishedAt);
      content.appendChild(readMore);

      newsCard.appendChild(image);
      newsCard.appendChild(content);

      newsContainer.appendChild(newsCard);
    });

    page++; 
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initial call to load the first set of news articles
getFullStackNews();


