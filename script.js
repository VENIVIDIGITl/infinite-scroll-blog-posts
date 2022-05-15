const postsContainer = document.getElementById('posts-container');
const filter = document.getElementById('filter');
const loaderEl = document.querySelector('.loader');

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com';
let limit = 5;
let page = 1;


// Fetch Posts from API
async function getPosts() {
  try {
    const response = await fetch(`${API_ENDPOINT}/posts?_limit=${limit}&_page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Failed to fetch posts from API');
    console.log(error);
  }
}


// Create Post Element
function createPostElement(post) {
  const postEl = document.createElement('div');
  postEl.classList.add('post');

  const number = document.createElement('div');
  number.classList.add('number');
  number.textContent = post.id;

  const postInfo = document.createElement('div');
  postInfo.classList.add('post-info');
 
  const postTitle = document.createElement('h2');
  postTitle.classList.add('post-title');
  postTitle.textContent = post.title;

  const postBody = document.createElement('p');
  postBody.classList.add('post-body');
  postBody.textContent = post.body;

  postInfo.appendChild(postTitle);
  postInfo.appendChild(postBody);

  postEl.appendChild(number);
  postEl.appendChild(postInfo);

  // Insert into DOM
  postsContainer.appendChild(postEl);
}


// Create and Insert post elements into DOM for each fetched post
async function showPosts() {
  try {
    const posts = await getPosts();
    posts.forEach(createPostElement);
  } catch (error) {
    console.log('Failed to show posts');
  }
}


// Show loader animation & fetch more posts
function showLoadingAnimation() {
  loaderEl.classList.add('show');

  setTimeout(() => {
    loaderEl.classList.remove('show');
  }, 1000);
}


// Handle Scrolling Event
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoadingAnimation();

    setTimeout(() => {
      page++;
      showPosts();
    }, 1300);
  }
}


// Filter posts by input
function filterPosts(event) {
  const term = event.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').textContent.toUpperCase();
    const body = post.querySelector('.post-body').textContent.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}


// On page load, show initial posts
showPosts();

// Event Listeners
window.addEventListener('scroll', handleScroll);
filter.addEventListener('input', filterPosts);
