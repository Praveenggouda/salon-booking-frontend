  

  // Run after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const myBookings = document.getElementById('myBookings');
  const profileMenu = document.getElementById('profileMenu');
  const userNameSpan = document.getElementById('userName');

  if (user && user.name) {
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';

    myBookings.style.display = 'block';
    profileMenu.style.display = 'block';

    userNameSpan.textContent = user.name;
  } else {
    loginLink.style.display = 'block';
    registerLink.style.display = 'block';

    myBookings.style.display = 'none';
    profileMenu.style.display = 'none';
  }
});

function logout() {
  console.log("Logout clicked");
  localStorage.removeItem('user');
  // rest of code...



  // Hide user-related items
  document.getElementById('myBookings').style.display = 'none';
  document.getElementById('profileMenu').style.display = 'none';

  // Show login/register buttons
  document.getElementById('loginLink').style.display = 'block';
  document.getElementById('registerLink').style.display = 'block';

  // Optionally clear username
  document.getElementById('userName').textContent = '';

  // If you want, redirect after a short delay or immediately:
  window.location.href = 'index.html';
}


  const citySearchInput = document.getElementById("city-search");
  const cityList = document.getElementById("city-list");
  const noResults = document.getElementById("no-results");

  citySearchInput.addEventListener("input", () => {
    const searchValue = citySearchInput.value.toLowerCase().trim();
    const cityButtons = cityList.getElementsByClassName("city-btn");

    let matchCount = 0;

    Array.from(cityButtons).forEach(btn => {
      const cityName = btn.textContent.toLowerCase();
      const isMatch = cityName.includes(searchValue);

      btn.style.display = isMatch ? "inline-block" : "none";

      if (isMatch) matchCount++;
    });

    noResults.style.display = searchValue && matchCount === 0 ? "block" : "none";
  });





//hero section//
const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.dots');

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create dots dynamically
  for(let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }
  const dots = dotsContainer.querySelectorAll('button');

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function goToSlide(index) {
    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    updateDots(index);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  // Auto slide every 4 seconds
  let autoSlideInterval = setInterval(nextSlide, 4000);

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  // Swipe support for mobile
  let startX = 0;
  let isDragging = false;

  slidesContainer.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slidesContainer.addEventListener('touchmove', e => {
    if(!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if(diff > 50) {
      nextSlide();
      isDragging = false;
      resetAutoSlide();
    } else if(diff < -50) {
      prevSlide();
      isDragging = false;
      resetAutoSlide();
    }
  });

  slidesContainer.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Initialize first slide
  goToSlide(0);

const adminLink = document.getElementById('adminLink');

  adminLink.addEventListener('click', function(e) {
    e.preventDefault();

    // Check if user is logged in by verifying a key in localStorage, e.g. "userEmail"
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      alert('Please login first to access the Admin Panel');
      // Redirect to login page
      window.location.href = 'login.html';
    } else {
      // User is logged in, proceed to admin panel
      window.location.href = 'admin-panel.html';
    }
  });
// Example dynamic city link
const cityName = "Haliyal";
const cityLink = document.createElement('a');
cityLink.href = `salons.html?city=${encodeURIComponent(cityName)}`;
cityLink.textContent = cityName;

    function showSalons(city) {
      document.getElementById('salon-results').innerHTML = 'Loading salons for ' + city + '...';

      fetch(`/salons/city/${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(salons => {
          const container = document.getElementById('salon-results');
          if (salons.length === 0) {
            container.innerHTML = `<p>No salons found in ${city}.</p>`;
            return;
          }

          let html = `<h2>Salons in ${city}</h2><ul class="salon-list">`;
          salons.forEach(salon => {
            html += `
              <li>
                <strong>${salon.salonName}</strong> - ₹${salon.priceRange} - Rating: ${salon.rating} ⭐<br />
                <img src="/uploads/${salon.photoURL}" alt="${salon.salonName}" />
                <p>${salon.description}</p>
              </li>
            `;
          });
          html += '</ul>';
          container.innerHTML = html;
        })
        .catch(() => {
          document.getElementById('salon-results').innerHTML = '<p>Error loading salons.</p>';
        });
    }

 async function fetchStats() {
      try {
        const response = await fetch('https://salon-booking-backend-vsaz.onrender.com/api/stats');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        document.getElementById('totalUsers').textContent = data.totalUsers;
        document.getElementById('totalSalons').textContent = data.totalSalons;
        document.getElementById('totalBookings').textContent = data.totalBookings;
      } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('totalUsers').textContent = 'Error';
        document.getElementById('totalSalons').textContent = 'Error';
        document.getElementById('totalBookings').textContent = 'Error';
      }
    }

    fetchStats();

fetch("/api/website-stats")
  .then(res => res.json())
  .then(data => {
    document.getElementById("total-users").innerText = data.users;
    document.getElementById("total-salons").innerText = data.salons;
    document.getElementById("total-bookings").innerText = data.bookings;
  });

  const toggle = document.getElementById('darkToggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

