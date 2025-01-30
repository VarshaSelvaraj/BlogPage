
function addBlog(event) {
    event.preventDefault(); 
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const image = document.getElementById('blog-image').value;
    if (!title || !content || !image) {
      alert("Please fill all fields.");
      return;
    }
    const newBlog = {
      title,
      content,
      image,
      views: 0,
      id: Date.now() 
    };
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-content').value = '';
    document.getElementById('blog-image').value = '';
    renderBlogs();
  }
  function renderBlogs() {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogCardsContainer = document.getElementById('blog-cards');
    blogCardsContainer.innerHTML = '';
    blogs.forEach(blog => {
      const blogCard = document.createElement('div');
      blogCard.className = 'bg-white p-4 rounded-lg shadow-md';
      blogCard.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover rounded-md mb-4">
        <h3 class="text-2xl font-semibold text-sky-900 cursor-pointer">${blog.title}</h3>
        <div class="flex justify-between items-center mt-4">
            <span class="text-gray-500">Views: <span id="view-count-${blog.id}">${blog.views}</span></span>
            <button onclick="readBlog(${blog.id})" title="Read Blog" class="bg-green-100 text-sky-900 p-2 rounded-md hover:bg-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M7 6h10"></path>
            </svg>
            </button>
            <button onclick="editBlog(${blog.id})"  title="Edit Blog" class="bg-yellow-100 text-sky-900 p-2 rounded-md hover:bg-yellow-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3h2v10h-2zM9 13h6v2H9z"></path>
            </svg>
            </button>
            <button onclick="deleteBlog(${blog.id})" title="Delete Blog" class="bg-red-100 text-sky-900 p-2 rounded-md hover:bg-red-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            </button>
        </div>
        `;
    blogCardsContainer.appendChild(blogCard);
    });
  }
  function readBlog(id) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs.find(blog => blog.id === id);
    blog.views += 1;
    localStorage.setItem('blogs', JSON.stringify(blogs));
    renderBlogs();
    document.getElementById('modal-title').innerText = blog.title;
    document.getElementById('modal-content').innerText = blog.content;
    document.getElementById('blog-modal').classList.remove('hidden');
  }
  function closeModal() {
    document.getElementById('blog-modal').classList.add('hidden');
  }
  function editBlog(id) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs.find(blog => blog.id === id);
    document.getElementById('blog-title').value = blog.title;
    document.getElementById('blog-content').value = blog.content;
    document.getElementById('blog-image').value = blog.image;
    blogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    renderBlogs();
  }
  function deleteBlog(id) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    renderBlogs();
  }
  window.onload = renderBlogs;
  document.getElementById('blog-form').addEventListener('submit', addBlog);
  