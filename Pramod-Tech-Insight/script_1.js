
const apiKey = "YOUR_API_KEY";
let page = 1;
let totalResults = 0;

async function getFullStackNews() {
    const fullStackApiUrl = `https://api.currentsapi.services/v1/search?&apiKey=${apiKey}&category=business&language=en&page=${page}`;
  
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
  
        // Create a container for source, publishedAt, and readMore
        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("news-details");
  
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
  
        // Append source, publishedAt, and readMore to the details container
        detailsContainer.appendChild(source);
        detailsContainer.appendChild(publishedAt);
        detailsContainer.appendChild(readMore);
  
        // Append detailsContainer to the content
        content.appendChild(title);
        content.appendChild(description);
  
        // Append detailsContainer at the bottom
        content.appendChild(detailsContainer);
  
        newsCard.appendChild(image);
        newsCard.appendChild(content);
  
        newsContainer.appendChild(newsCard);
      });
  
      page++; // Increment the page number for the next request
    } catch (error) {
      console.error("Error:", error);
    }
  }



// Function to update the news container with articles
function updateNewsContainer(articles) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = ""; // Clear previous results

  articles.forEach((article) => {
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

    // Create a container for source, publishedAt, and readMore
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("news-details");

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

    // Append source, publishedAt, and readMore to the details container
    detailsContainer.appendChild(source);
    detailsContainer.appendChild(publishedAt);
    detailsContainer.appendChild(readMore);

    // Append detailsContainer to the content
    content.appendChild(title);
    content.appendChild(description);

    // Append detailsContainer at the bottom
    content.appendChild(detailsContainer);

    newsCard.appendChild(image);
    newsCard.appendChild(content);

    newsContainer.appendChild(newsCard);
  });
}

// Function to fetch news based on search keyword
async function searchNews(keyword) {
  const searchApiUrl = `https://api.currentsapi.services/v1/search?&apiKey=${apiKey}&language=en&keywords=${keyword}`;

  try {
    const response = await fetch(searchApiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    updateNewsContainer(data.news);

    totalResults = data.news.length;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to handle search submission
function handleSearchFormSubmit(event) {
  event.preventDefault(); // Prevent the default search submission behavior
  const searchInput = document.getElementById("search-input");
  const keyword = searchInput.value.trim(); // Get the search keyword entered by the user

  if (keyword !== "") {
    searchNews(keyword); // Call the searchNews function with the user's keyword
  }
}

// Add an event listener to the search 
const searchForm = document.querySelector(".search-container");
searchForm.addEventListener("submit", handleSearchFormSubmit);

// Initial call to load the first set of news articles
getFullStackNews();











