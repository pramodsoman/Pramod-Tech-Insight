const apiKey1 = "API_KEY_1";
const apiKey2 = "API_KEY_2";
let currentApiKey = apiKey1; // Start with apiKey1
let page = 1;
let totalResults = 0;
let apiKeySwitchInterval = 360 * 60 * 1000; // 6 hour in milliseconds

function toggleApiKey() {
  // Toggle between apiKey1 and apiKey2 on each request
  currentApiKey = currentApiKey === apiKey1 ? apiKey2 : apiKey1;
  // Call the function to fetch news with the new API key
  getFullStackNews();
}

function updateDateTime() {
  const dateElement = document.getElementById("date-time");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

// async function getFullStackNews() {
//   // Update the API URL with the new one
//   const fullStackApiUrl = `https://newsapi.org/v2/everything?q=technology&sources=techcrunch&sortBy=popularity&apiKey=${apiKey}&pageSize=100`;

async function getFullStackNews() {
  // // Get the date three days behind the current date and format it as YYYY-MM-DD
  // const currentDate = new Date();
  // currentDate.setDate(currentDate.getDate() - 7); // Subtract 15 days
  // const currentDateFormat = `${currentDate.getFullYear()}-${
  //   currentDate.getMonth() + 1
  // }-${currentDate.getDate()}`;

  // Update the API URL with the calculated date
  // const fullStackApiUrl = `https://newsapi.org/v2/everything?q=tech&sources=techcrunch&from=${currentDateFormat}&sortBy=publishedAt&apiKey=${apiKey}&pageSize=100`;

  // Updated the API URL with the new API key
  const fullStackApiUrl = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${currentApiKey}`;

  try {
    const response = await fetch(fullStackApiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    totalResults = data.totalResults;

    const newsContainer = document.getElementById("news-container");

    data.articles.forEach((article) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");

      const image = document.createElement("img");
      image.classList.add("news-image");
      image.src = article.urlToImage || "placeholder-image.jpg";
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
      source.textContent = `Source: ${article.source.name}`;

      const publishedAt = document.createElement("p");
      publishedAt.classList.add("news-published-at");
      publishedAt.textContent = `Published: ${article.publishedAt}`;

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
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initial call to load the first set of news articles
getFullStackNews();

// Schedule checking for new news every hour (3600000 milliseconds)
setInterval(getFullStackNews, 3600000);

// Toggle API key every 6 Hours
setInterval(toggleApiKey, apiKeySwitchInterval);

// Update the time every second
setInterval(updateDateTime, 1000);
