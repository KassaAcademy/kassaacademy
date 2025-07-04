const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

const signinForm = document.getElementById('signinForm');
const contactForm = document.getElementById('contactForm');
const newCourseForm = document.getElementById('newCourseForm');
const uploadTutorialForm = document.getElementById('uploadTutorialForm');
const courseList = document.getElementById('course-list');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

let courses = [];

// Sign In
if (signinForm) {
  signinForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true');
      window.location.href = 'admin.html';
    } else {
      alert('Access Denied');
    }
  });
}

// Add Course
if (newCourseForm) {
  newCourseForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('courseTitle').value;
    const category = document.getElementById('courseCategory').value;
    const description = document.getElementById('courseDescription').value;
    const course = { title, category, description, lessons: [] };
    courses.push(course);
    renderCourses();
    newCourseForm.reset();
  });
}

// Upload Tutorial
if (uploadTutorialForm) {
  uploadTutorialForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('lessonTitle').value;
    const url = document.getElementById('videoURL').value;
    const question = document.getElementById('lessonQuestion').value;
    const status = document.getElementById('lessonStatus').value;
    if (courses.length > 0) {
      courses[courses.length - 1].lessons.push({ title, url, question, status });
      alert('Lesson uploaded');
      uploadTutorialForm.reset();
    } else {
      alert('Please create a course first');
    }
  });
}

// Render Courses
function renderCourses() {
  if (!courseList) return;
  courseList.innerHTML = '';
  courses.forEach(course => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${course.title} (${course.category})</h3><p>${course.description}</p>`;
    courseList.appendChild(div);
  });
}

// Search
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.innerHTML = '';
    courses
      .filter(c => c.title.toLowerCase().includes(query))
      .forEach(c => {
        const div = document.createElement('div');
        div.textContent = c.title;
        searchResults.appendChild(div);
      });
  });
  function toggleMenu() {
  const nav = document.getElementById('mainNav').querySelector('ul');
  nav.classList.toggle('show');
}

}

// Contact Form to Google Sheets
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // Replace with your own URL
    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(contactForm)
    })
    .then(response => alert('Message sent successfully'))
    .catch(error => alert('Message failed: ' + error.message));
    contactForm.reset();
  });
}
