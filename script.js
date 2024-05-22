// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '9ec30827116543edb1f1ec942c265272';
const newsContainer = document.querySelector('.news-container');
const navLinks = document.querySelectorAll('nav a');

// Function to fetch news articles from the API
async function fetchNewsArticles(category) {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
  const data = await response.json();
  return data.articles;
}

// Function to display news articles
function displayNewsArticles(articles) {
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const newsArticle = document.createElement('div');
    newsArticle.classList.add('news-article');
    newsArticle.innerHTML = `
      <img src="${article.urlToImage}" alt="${article.title}">
      <h2>${article.title}</h2>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;
    newsContainer.appendChild(newsArticle);
  });
}

// Function to handle category selection
function handleCategorySelection(category) {
  // Remove active class from all nav links
  navLinks.forEach(link => link.classList.remove('active'));
  // Add active class to the selected category link
  const selectedLink = document.querySelector(`nav a[data-category="${category}"]`);
  selectedLink.classList.add('active');

  // Fetch and display news articles for the selected category
  fetchNewsArticles(category)
    .then(articles => displayNewsArticles(articles))
    .catch(error => console.error(error));
}

// Event listeners for category selection
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const category = event.target.dataset.category;
    handleCategorySelection(category);
  });
});

// Load news articles for the default category (general)
handleCategorySelection('general');