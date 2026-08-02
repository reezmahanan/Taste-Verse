let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

  // Scroll animations
  animateOnScroll();
  
  // Update scroll progress bar
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
  }
}

// Scroll Animation Function
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Close mobile menu if open
      menu.classList.remove('fa-times');
      navbar.classList.remove('active');
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation classes to elements
window.addEventListener('DOMContentLoaded', () => {
  // Add fade-in to specialty boxes
  document.querySelectorAll('.speciality .box').forEach((box, index) => {
    box.classList.add('fade-in');
    box.style.transitionDelay = `${index * 0.05}s`;
  });

  // Add slide-in to steps
  document.querySelectorAll('.steps .box').forEach((box, index) => {
    box.classList.add('slide-in-left');
    box.style.transitionDelay = `${index * 0.1}s`;
  });

  // Add animation to gallery
  document.querySelectorAll('.gallery .box').forEach((box, index) => {
    box.classList.add('fade-in');
    box.style.transitionDelay = `${index * 0.05}s`;
  });

  // Add animation to reviews
  document.querySelectorAll('.review .box').forEach((box, index) => {
    box.classList.add('slide-in-right');
    box.style.transitionDelay = `${index * 0.1}s`;
  });

  const heading = document.querySelector('.home .content h3');
  if (heading) {
    heading.classList.add('fade-in-text');
  }

  // Animate stats counter
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statItems = document.querySelectorAll('.stat-item h4');
        statItems.forEach(stat => {
          const target = stat.textContent;
          const isNumber = /\d+/.test(target);
          
          if (isNumber) {
            const number = parseInt(target);
            let current = 0;
            const increment = number / 50;
            const suffix = target.replace(/\d+/, '');
            
            const counter = setInterval(() => {
              current += increment;
              if (current >= number) {
                stat.textContent = number + suffix;
                clearInterval(counter);
              } else {
                stat.textContent = Math.floor(current) + suffix;
              }
            }, 30);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const homeStats = document.querySelector('.home-stats');
  if (homeStats) {
    statsObserver.observe(homeStats);
  }

  // Initial animation check
  animateOnScroll();
  createParticles();
  
  // Set default active stars in review form
  highlightStarsInput(5, 'active');
});

// Add hover effect to general buttons
function setupButtonRipple(btn) {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
  
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

document.querySelectorAll('.btn').forEach(setupButtonRipple);

// Parallax effect for home section
window.addEventListener('scroll', () => {
  const homeImage = document.querySelector('.home .image img');
  if (homeImage) {
    const scrolled = window.pageYOffset;
    homeImage.style.transform = `translateY(${scrolled * 0.15}px)`;
  }
});

// Add floating particles to home section
function createParticles() {
  const homeSection = document.querySelector('.home');
  if (!homeSection) return;
  
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '0px';
    particle.style.width = (Math.random() * 6 + 4) + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    homeSection.appendChild(particle);
  }
}

// Custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateCursor() {
  const distX = mouseX - followerX;
  const distY = mouseY - followerY;
  
  followerX += distX * 0.12;
  followerY += distY * 0.12;
  
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Enlarge cursor on interactive elements
function setupCursorHovers() {
  document.querySelectorAll('a, button, .btn, input, textarea, select, .menu-tab, .remove-cart-item, #rating-stars-input i').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursorFollower.style.transform = 'scale(1.3)';
      cursorFollower.style.borderColor = 'rgba(255, 56, 56, 0.4)';
    });
    
    elem.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorFollower.style.transform = 'scale(1)';
      cursorFollower.style.borderColor = 'var(--red)';
    });
  });
}

setupCursorHovers();

// Add tilt effect to cards
document.querySelectorAll('.popular .box, .gallery .box, .speciality .box').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// Add confetti effect on button click
function createConfetti(x, y) {
  const colors = ['#ff3838', '#ffd700', '#ff6b6b', '#4CAF50', '#2196F3'];
  
  for (let i = 0; i < 15; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
    confetti.style.setProperty('--ty', -Math.random() * 200 - 50 + 'px');
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 1000);
  }
}



/* ==========================================================================
   CART OPERATIONS & ORDER FLOW STATE
   ========================================================================== */

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedDiscount = false;
let trackingTimeouts = [];

const themeToggle = document.querySelector('#theme-toggle');
const cartBtn = document.querySelector('#cart-btn');
const cartDrawer = document.querySelector('#cart-drawer');
const closeCart = document.querySelector('#close-cart');

// Theme Switcher Logic
themeToggle.onclick = () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
};

// Init Theme state
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.classList.replace('fa-moon', 'fa-sun');
}

// Cart Drawer open/close
cartBtn.onclick = () => {
  cartDrawer.classList.add('active');
};

closeCart.onclick = () => {
  cartDrawer.classList.remove('active');
};

// Apply button effects on dyn elements
function refreshDynamicBtnEvents() {
  document.querySelectorAll('.cart-item-qty button, .remove-cart-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursorFollower.style.transform = 'scale(1.3)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorFollower.style.transform = 'scale(1)';
    });
  });
}

// Cart state management
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(id, name, price, img) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price: parseFloat(price), img, qty: 1 });
  }
  saveCart();
  
  // Update cart icon styling dynamically
  cartBtn.classList.add('pulse');
  setTimeout(() => cartBtn.classList.remove('pulse'), 600);
}

function updateQty(id, delta) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    saveCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

// Render cart items to panel
function renderCart() {
  const container = document.getElementById('cart-items-container');
  const badge = document.querySelector('.cart-badge');
  if (!container || !badge) return;
  
  container.innerHTML = '';
  
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalQty;
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-message">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty. Add some delicious treats!</p>
      </div>
    `;
    appliedDiscount = false;
    document.querySelector('.discount-row').style.display = 'none';
  } else {
    cart.forEach(item => {
      const itemHTML = `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <div class="item-price">Rs. ${item.price}</div>
            <div class="cart-item-qty">
              <button onclick="updateQty('${item.id}', -1)">-</button>
              <span>${item.qty}</span>
              <button onclick="updateQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <i class="fas fa-trash remove-cart-item" onclick="removeFromCart('${item.id}')"></i>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', itemHTML);
    });
  }
  
  calculateTotals();
  updateCheckoutSummaryFields();
  refreshDynamicBtnEvents();
}

// Calculations
function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.1);
  const delivery = subtotal > 0 ? 150 : 0;
  let discount = 0;
  
  if (appliedDiscount && subtotal > 0) {
    discount = Math.round(subtotal * 0.2);
    document.querySelector('.discount-row').style.display = 'flex';
    document.getElementById('cart-discount').textContent = `-Rs. ${discount}`;
  } else {
    document.querySelector('.discount-row').style.display = 'none';
  }
  
  const total = subtotal + tax + delivery - discount;
  
  document.getElementById('cart-subtotal').textContent = `Rs. ${subtotal}`;
  document.getElementById('cart-tax').textContent = `Rs. ${tax}`;
  document.getElementById('cart-delivery').textContent = `Rs. ${delivery}`;
  document.getElementById('cart-total').textContent = `Rs. ${total}`;
  
  // Order page summary indicators
  const itemsCountLabel = document.getElementById('summary-items-count');
  const totalPriceLabel = document.getElementById('summary-total-price');
  if (itemsCountLabel && totalPriceLabel) {
    itemsCountLabel.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    totalPriceLabel.textContent = `Rs. ${total}`;
  }
}

// Apply Promo Code
const applyPromoBtn = document.getElementById('apply-promo');
if (applyPromoBtn) {
  applyPromoBtn.onclick = () => {
    const promoInput = document.getElementById('promo-code');
    const code = promoInput.value.trim().toUpperCase();
    
    if (code === 'TASTE20') {
      if (cart.length > 0) {
        appliedDiscount = true;
        calculateTotals();
        alert('Promo code applied! 20% discount on food subtotal has been deducted.');
      } else {
        alert('Please add dishes to your cart first.');
      }
    } else {
      alert('Invalid promo code. Try "TASTE20" for 20% off.');
    }
  };
}

// Wire add-to-cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.onclick = (e) => {
    e.preventDefault();
    const box = btn.closest('.box');
    const id = box.getAttribute('data-id');
    const name = box.getAttribute('data-name');
    const price = box.getAttribute('data-price');
    const img = box.getAttribute('data-img');
    
    addToCart(id, name, price, img);
    createConfetti(e.clientX, e.clientY);
    
    const originalText = btn.textContent;
    btn.textContent = 'Added to Cart!';
    btn.style.background = '#4CAF50';
    btn.style.borderColor = '#4CAF50';
    btn.style.color = '#fff';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 1000);
  };
});

// Update checkout form list
function updateCheckoutSummaryFields() {
  const checkoutFoodField = document.getElementById('cust-food');
  if (!checkoutFoodField) return;
  
  if (cart.length === 0) {
    checkoutFoodField.value = '';
  } else {
    checkoutFoodField.value = cart.map(item => `${item.name} (x${item.qty})`).join(', ');
  }
}

// Drawer checkout btn
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.onclick = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Choose some delicious items first!');
      return;
    }
    cartDrawer.classList.remove('active');
    
    const checkoutSection = document.getElementById('order');
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
}

// Initial cart render
renderCart();

/* ==========================================================================
   MENU TAB FILTERING
   ========================================================================== */

const filterTabs = document.querySelectorAll('.menu-tab');
const menuBoxes = document.querySelectorAll('.popular .box-container .box');

filterTabs.forEach(tab => {
  tab.onclick = () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const filter = tab.getAttribute('data-filter');
    
    menuBoxes.forEach(box => {
      const category = box.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        box.classList.remove('hide');
        box.style.display = 'flex';
      } else {
        box.classList.add('hide');
        box.style.display = 'none';
      }
    });
  };
});

/* ==========================================================================
   CHECKOUT & LIVE TRACKING FLOW
   ========================================================================== */

const checkoutForm = document.getElementById('checkout-form');
const trackingModal = document.getElementById('tracking-modal');
const closeTrackingBtn = document.getElementById('close-tracking');

if (checkoutForm) {
  checkoutForm.onsubmit = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty! Please add some delicious meals from the menu first.');
      return;
    }
    
    const name = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const items = document.getElementById('cust-food').value;
    const total = document.getElementById('cart-total').textContent;
    
    // Set details in Tracking Modal
    const orderId = 'TV-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('tracking-order-id').textContent = '#' + orderId;
    document.getElementById('tracking-name').textContent = name;
    document.getElementById('tracking-address').textContent = address;
    document.getElementById('tracking-items').textContent = items;
    document.getElementById('tracking-total').textContent = total;
    
    // Clear cart state
    cart = [];
    localStorage.removeItem('cart');
    renderCart();
    checkoutForm.reset();
    
    // Fire tracking progression
    initTrackingVisuals();
    trackingModal.classList.add('active');
    startTrackingSimulation();
  };
}

if (closeTrackingBtn) {
  closeTrackingBtn.onclick = () => {
    trackingModal.classList.remove('active');
    clearTrackingSimulations();
  };
}

function clearTrackingSimulations() {
  trackingTimeouts.forEach(clearTimeout);
  trackingTimeouts = [];
}

function initTrackingVisuals() {
  clearTrackingSimulations();
  
  const steps = document.querySelectorAll('.tracking-step');
  const lines = document.querySelectorAll('.tracking-line');
  
  steps.forEach(s => s.classList.remove('active', 'completed'));
  lines.forEach(l => l.classList.remove('active', 'completed'));
  
  document.getElementById('step-1').classList.add('active');
  document.getElementById('time-step-1').textContent = 'Just Now';
  document.getElementById('time-step-2').textContent = 'Pending';
  document.getElementById('time-step-3').textContent = 'Pending';
  document.getElementById('time-step-4').textContent = 'Pending';
  document.getElementById('est-delivery-time').textContent = '25-35 minutes';
}

function startTrackingSimulation() {
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const step4 = document.getElementById('step-4');
  
  const line1 = document.querySelectorAll('.tracking-line')[0];
  const line2 = document.querySelectorAll('.tracking-line')[1];
  const line3 = document.querySelectorAll('.tracking-line')[2];
  
  // Transition to step 2: Preparing
  trackingTimeouts.push(setTimeout(() => {
    step1.classList.remove('active');
    step1.classList.add('completed');
    line1.classList.add('completed');
    
    step2.classList.add('active');
    document.getElementById('time-step-2').textContent = '4 mins ago';
    document.getElementById('est-delivery-time').textContent = '20-25 minutes';
  }, 6000));
  
  // Transition to step 3: Shipping
  trackingTimeouts.push(setTimeout(() => {
    step2.classList.remove('active');
    step2.classList.add('completed');
    line2.classList.add('completed');
    
    step3.classList.add('active');
    document.getElementById('time-step-3').textContent = '10 mins ago';
    document.getElementById('est-delivery-time').textContent = '8-12 minutes';
  }, 14000));
  
  // Transition to step 4: Delivered
  trackingTimeouts.push(setTimeout(() => {
    step3.classList.remove('active');
    step3.classList.add('completed');
    line3.classList.add('completed');
    
    step4.classList.add('active');
    step4.classList.add('completed');
    document.getElementById('time-step-4').textContent = 'Arrived!';
    document.getElementById('est-delivery-time').textContent = 'Delivered successfully!';
  }, 22000));
}

/* ==========================================================================
   TABLE RESERVATION SYSTEM
   ========================================================================== */

const bookingForm = document.getElementById('table-booking-form');
const bookingModal = document.getElementById('booking-modal');
const closeBookingBtn = document.getElementById('close-booking');

if (bookingForm) {
  bookingForm.onsubmit = (e) => {
    e.preventDefault();
    
    const name = document.getElementById('book-name').value;
    const email = document.getElementById('book-email').value;
    const phone = document.getElementById('book-phone').value;
    const guests = document.getElementById('book-guests').value;
    const date = document.getElementById('book-date').value;
    const time = document.getElementById('book-time').value;
    const tableType = document.getElementById('book-table-type').value;
    const tableId = document.getElementById('selected-table-id').value;
    
    const bookingRef = 'TV-RES-' + Math.floor(1000 + Math.random() * 9000);
    
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    // Fill Booking Confirmation Ticket
    document.getElementById('t-name').textContent = name;
    document.getElementById('t-ref').textContent = '#' + bookingRef;
    document.getElementById('t-date').textContent = formattedDate;
    document.getElementById('t-time').textContent = time;
    
    const finalTableDisplay = tableId ? `${tableType} (${tableId})` : tableType;
    document.getElementById('t-table').textContent = finalTableDisplay;
    document.getElementById('t-guests').textContent = guests + (guests === '1' ? ' Guest' : ' Guests');
    
    bookingModal.classList.add('active');
    bookingForm.reset();
    
    // Reset seating visual selection
    document.getElementById('selected-table-id').value = '';
    document.getElementById('selected-table-label').textContent = 'No Table Chosen (Auto-assigned)';
    document.querySelectorAll('.table-node').forEach(node => node.classList.remove('selected'));
  };
}

if (closeBookingBtn) {
  closeBookingBtn.onclick = () => {
    bookingModal.classList.remove('active');
  };
}

/* ==========================================================================
   DYNAMIC CUSTOMER REVIEWS
   ========================================================================== */

const ratingStarsInput = document.querySelectorAll('#rating-stars-input i');
const ratingValueInput = document.getElementById('rev-rating');

ratingStarsInput.forEach(star => {
  star.addEventListener('mouseenter', () => {
    const val = parseInt(star.getAttribute('data-value'));
    highlightStarsInput(val, 'hovered');
  });
  
  star.addEventListener('mouseleave', () => {
    clearStarsInputHover();
  });
  
  star.addEventListener('click', () => {
    const val = parseInt(star.getAttribute('data-value'));
    ratingValueInput.value = val;
    highlightStarsInput(val, 'active');
  });
});

function highlightStarsInput(val, className) {
  ratingStarsInput.forEach(star => {
    const starVal = parseInt(star.getAttribute('data-value'));
    if (starVal <= val) {
      star.classList.add(className);
      if (className === 'active') {
        star.classList.replace('far', 'fas');
      }
    } else {
      star.classList.remove(className);
      if (className === 'active') {
        star.classList.replace('fas', 'far');
      }
    }
  });
}

function clearStarsInputHover() {
  ratingStarsInput.forEach(star => star.classList.remove('hovered'));
}

const addReviewForm = document.getElementById('add-review-form');
const reviewsContainer = document.getElementById('reviews-container');

if (addReviewForm) {
  addReviewForm.onsubmit = (e) => {
    e.preventDefault();
    
    const name = document.getElementById('rev-name').value;
    const rating = parseInt(ratingValueInput.value);
    const comment = document.getElementById('rev-text').value;
    
    // Create new element review card
    const reviewBox = document.createElement('div');
    reviewBox.className = 'box scale-in visible';
    
    let starsMarkup = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsMarkup += '<i class="fas fa-star"></i> ';
      } else {
        starsMarkup += '<i class="far fa-star"></i> ';
      }
    }
    
    const avatarPhotos = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
    ];
    const randomAvatar = avatarPhotos[Math.floor(Math.random() * avatarPhotos.length)];
    
    reviewBox.innerHTML = `
      <img src="${randomAvatar}" alt="Customer ${name}">
      <h3>${name}</h3>
      <div class="stars">
        ${starsMarkup}
      </div>
      <p>${comment}</p>
    `;
    
    // Insert new review at the top
    reviewsContainer.prepend(reviewBox);
    
    // Reset review form elements
    addReviewForm.reset();
    ratingValueInput.value = '5';
    highlightStarsInput(5, 'active');
    setupCursorHovers(); // refresh mouse hover animations for new elements
    
    alert('Thank you for sharing your experience! Your review is now published.');
    
    // Scroll to review container top
    reviewsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
}

/* ==========================================================================
   NEW UPGRADED FEATURES INTEGRATION SCRIPTS
   ========================================================================== */

// --- 1. DAILY DEALS COUNTDOWN TIMER ---
function startDailyDealsTimer() {
  const hoursVal = document.getElementById('deal-hours');
  const minutesVal = document.getElementById('deal-minutes');
  const secondsVal = document.getElementById('deal-seconds');
  
  if (!hoursVal || !minutesVal || !secondsVal) return;
  
  function updateClock() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Next midnight
    
    const diff = midnight - now;
    
    if (diff <= 0) {
      hoursVal.textContent = '24';
      minutesVal.textContent = '00';
      secondsVal.textContent = '00';
      return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    hoursVal.textContent = String(hours).padStart(2, '0');
    minutesVal.textContent = String(minutes).padStart(2, '0');
    secondsVal.textContent = String(seconds).padStart(2, '0');
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}

// Deals Claim Button
const claimDealBtn = document.getElementById('claim-deal-btn');
if (claimDealBtn) {
  claimDealBtn.onclick = (e) => {
    const id = claimDealBtn.getAttribute('data-id');
    const name = claimDealBtn.getAttribute('data-name');
    const price = claimDealBtn.getAttribute('data-price');
    const img = claimDealBtn.getAttribute('data-img');
    addToCart(id, name, price, img);
    createConfetti(e.clientX, e.clientY);
    alert('Claimed! Signature Beast Burger Deal Combo added to your cart.');
  };
}

// --- 2. INTERACTIVE SEATING MAP MODAL ---
const openSeatingBtn = document.getElementById('open-seating-map-btn');
const seatingMapModal = document.getElementById('seating-map-modal');
const closeSeatingBtn = document.getElementById('close-seating-map');
const confirmSeatingBtn = document.getElementById('confirm-seating-btn');
const tableNodes = document.querySelectorAll('.table-node');
const mapSelectedLabel = document.getElementById('map-selected-label');

let tempSelectedTable = null;

if (openSeatingBtn) {
  openSeatingBtn.onclick = () => {
    seatingMapModal.classList.add('active');
  };
}

if (closeSeatingBtn) {
  closeSeatingBtn.onclick = () => {
    seatingMapModal.classList.remove('active');
  };
}

tableNodes.forEach(node => {
  node.onclick = () => {
    if (node.classList.contains('reserved')) return;
    
    tableNodes.forEach(n => n.classList.remove('selected'));
    node.classList.add('selected');
    
    const tableId = node.getAttribute('data-table');
    const tableType = node.getAttribute('data-type');
    const capacity = node.getAttribute('data-capacity');
    
    tempSelectedTable = { id: tableId, type: tableType, capacity: capacity };
    mapSelectedLabel.textContent = `${tableId} (${tableType} - Max ${capacity} Guests)`;
  };
});

if (confirmSeatingBtn) {
  confirmSeatingBtn.onclick = () => {
    if (!tempSelectedTable) {
      alert('Please select a table on the map first!');
      return;
    }
    
    // Update booking form fields
    document.getElementById('selected-table-id').value = tempSelectedTable.id;
    document.getElementById('selected-table-label').textContent = `Table chosen: ${tempSelectedTable.id}`;
    
    // Select the dropdown seating category
    const dropdown = document.getElementById('book-table-type');
    if (dropdown) {
      dropdown.value = tempSelectedTable.type;
    }
    
    // Auto-update guests field if guests count exceeds capacity
    const guestsField = document.getElementById('book-guests');
    if (guestsField) {
      guestsField.value = tempSelectedTable.capacity;
      guestsField.max = tempSelectedTable.capacity;
    }
    
    seatingMapModal.classList.remove('active');
    alert(`Table ${tempSelectedTable.id} selected successfully! Seating details locked in.`);
  };
}

// --- 3. FOOD CUSTOMIZER & NUTRITIONAL OVERLAY ---
const customizerModal = document.getElementById('customizer-modal');
const closeCustomizerBtn = document.getElementById('close-customizer');
const customizerAddBtn = document.getElementById('customizer-add-to-cart-btn');

let activeCustomizerDish = null;

// Database of nutritional values/allergens for dishes
const dishDetailsDB = {
  'burger-1': {
    calories: 680, protein: 32, carbs: 54,
    allergens: 'Gluten, Dairy, Sesame',
    desc: 'Double flame-grilled beef patties, triple cheddar cheese, crisp lettuce, tomato, and animal sauce on toasted brioche.'
  },
  'pizza-1': {
    calories: 1120, protein: 44, carbs: 120,
    allergens: 'Gluten, Dairy, Mushrooms',
    desc: 'Artisanal wood-fired thin crust pizza with wild porcini, white truffle oil, fresh buffalo mozzarella, and arugula.'
  },
  'dessert-1': {
    calories: 450, protein: 8, carbs: 62,
    allergens: 'Dairy, Gluten, Eggs',
    desc: 'Layers of moist red velvet cocoa sponge, rich vanilla cream cheese frosting, and sweetened cake crumbles.'
  },
  'dessert-2': {
    calories: 380, protein: 5, carbs: 52,
    allergens: 'Nuts, Dairy',
    desc: 'Golden saffron cardamom cream, chopped pistachios, and almond shavings topped with edible silver foil.'
  },
  'dessert-3': {
    calories: 320, protein: 4, carbs: 44,
    allergens: 'Dairy, Gluten, Eggs',
    desc: 'Fluffy vanilla butter cream frosting atop moist vanilla sponge, topped with pastel rainbow sprinkles.'
  },
  'drink-1': {
    calories: 180, protein: 1, carbs: 38,
    allergens: 'None',
    desc: 'Freshly muddled passion fruit, wild mint sprigs, lime wedge juice, organic brown sugar, and sparkling soda.'
  },
  'dessert-4': {
    calories: 280, protein: 6, carbs: 32,
    allergens: 'Dairy',
    desc: 'Handcrafted Italian style vanilla bean gelato swirl topped with house-made salted butter caramel drizzle.'
  },
  'breakfast-1': {
    calories: 410, protein: 12, carbs: 36,
    allergens: 'Gluten',
    desc: 'Smashed organic Hass avocados, micro greens, heirloom cherry tomatoes, red pepper flakes on toasted sourdough.'
  },
  'pizza-2': {
    calories: 950, protein: 38, carbs: 110,
    allergens: 'Gluten, Dairy',
    desc: 'Classic wood-fired neapolitan pizza base, rich san marzano marinara sauce, fresh mozzarella, extra virgin olive oil, and sweet basil.'
  },
  'burger-2': {
    calories: 780, protein: 36, carbs: 50,
    allergens: 'Gluten, Dairy, Pork',
    desc: 'Double flame-broiled beef patties, crispy hickory-smoked bacon strips, double cheddar cheese, and honey BBQ glaze.'
  },
  'drink-2': {
    calories: 240, protein: 4, carbs: 40,
    allergens: 'Dairy',
    desc: 'Double shot arabica espresso blended with ice cream, crushed ice, milk, and sweet cocoa dust whipped cream.'
  },
  'breakfast-2': {
    calories: 520, protein: 10, carbs: 64,
    allergens: 'Gluten, Dairy, Eggs',
    desc: 'Crispy warm Belgian waffles served with organic maple syrup glaze, sliced strawberries, and fresh whipped cream.'
  }
};

// Wire menu card image and title click to open customizer
function wireCustomizerClicks() {
  document.querySelectorAll('.popular .box').forEach(box => {
    const id = box.getAttribute('data-id');
    const imgElement = box.querySelector('img');
    const titleElement = box.querySelector('h3');
    
    const triggerCustomizer = () => {
      const name = box.getAttribute('data-name');
      const price = parseFloat(box.getAttribute('data-price'));
      const img = box.getAttribute('data-img');
      const category = box.getAttribute('data-category');
      
      openCustomizer(id, name, price, img, category);
    };
    
    if (imgElement) imgElement.onclick = triggerCustomizer;
    if (titleElement) titleElement.onclick = triggerCustomizer;
  });
}

function openCustomizer(id, name, basePrice, img, category) {
  activeCustomizerDish = { id, name, basePrice, img, category, totalPrice: basePrice };
  
  // Set UI elements
  document.getElementById('customizer-dish-name').textContent = name;
  const customImg = document.getElementById('customizer-dish-img');
  if (customImg) customImg.src = img;
  document.getElementById('customizer-total-price').textContent = `Rs. ${basePrice}`;
  
  // Reset checkboxes
  document.querySelectorAll('.addon-checkbox').forEach(cb => cb.checked = false);
  
  // Load data from DB
  const dbData = dishDetailsDB[id] || {
    calories: 400, protein: 10, carbs: 40,
    allergens: 'None',
    desc: 'Fresh, culinary preparation crafted to perfection by our Executive Chef.'
  };
  
  document.getElementById('customizer-dish-desc').textContent = dbData.desc;
  document.getElementById('customizer-allergens').textContent = dbData.allergens;
  
  // Progress bars
  document.getElementById('nut-cal-val').textContent = `${dbData.calories} kcal`;
  document.getElementById('nut-cal-bar').style.width = `${Math.min(100, (dbData.calories / 1200) * 100)}%`;
  
  document.getElementById('nut-prot-val').textContent = `${dbData.protein}g`;
  document.getElementById('nut-prot-bar').style.width = `${Math.min(100, (dbData.protein / 60) * 100)}%`;
  
  document.getElementById('nut-carb-val').textContent = `${dbData.carbs}g`;
  document.getElementById('nut-carb-bar').style.width = `${Math.min(100, (dbData.carbs / 150) * 100)}%`;
  
  customizerModal.classList.add('active');
  setupCursorHovers(); // Refresh cursor hovers on checkboxes
}

// Addon checkbox click updates price
document.querySelectorAll('.addon-checkbox').forEach(cb => {
  cb.onchange = () => {
    if (!activeCustomizerDish) return;
    
    let currentPrice = activeCustomizerDish.basePrice;
    document.querySelectorAll('.addon-checkbox:checked').forEach(checkedCb => {
      currentPrice += parseFloat(checkedCb.getAttribute('data-price'));
    });
    
    activeCustomizerDish.totalPrice = currentPrice;
    document.getElementById('customizer-total-price').textContent = `Rs. ${currentPrice}`;
  };
});

if (closeCustomizerBtn) {
  closeCustomizerBtn.onclick = () => {
    customizerModal.classList.remove('active');
    activeCustomizerDish = null;
  };
}

if (customizerAddBtn) {
  customizerAddBtn.onclick = (e) => {
    if (!activeCustomizerDish) return;
    
    // Build customize name
    const checkedAddons = [];
    document.querySelectorAll('.addon-checkbox:checked').forEach(checkedCb => {
      checkedAddons.push(checkedCb.getAttribute('data-name'));
    });
    
    const finalName = checkedAddons.length > 0 
      ? `${activeCustomizerDish.name} (${checkedAddons.join(', ')})`
      : activeCustomizerDish.name;
      
    // Generate customized ID
    const finalId = checkedAddons.length > 0
      ? `${activeCustomizerDish.id}-${checkedAddons.join('-').replace(/\s+/g, '')}`
      : activeCustomizerDish.id;
      
    addToCart(finalId, finalName, activeCustomizerDish.totalPrice, activeCustomizerDish.img);
    createConfetti(e.clientX, e.clientY);
    
    customizerModal.classList.remove('active');
    activeCustomizerDish = null;
    alert(`Customized ${finalName} added to cart!`);
  };
}

// --- 4. CHEF RECOMMENDATION QUESTIONNAIRE QUIZ ---
const chefQuizBtn = document.getElementById('chef-quiz-btn');
const chefQuizModal = document.getElementById('chef-quiz-modal');
const closeQuizBtn = document.getElementById('close-chef-quiz');
const quizOptionCards = document.querySelectorAll('.quiz-option-card');
const restartQuizBtn = document.getElementById('restart-quiz-btn');
const addRecommendedBtn = document.getElementById('add-recommended-btn');

let quizAnswers = {};
let quizRecommendedItem = null;

if (chefQuizBtn) {
  chefQuizBtn.onclick = () => {
    resetChefQuiz();
    chefQuizModal.classList.add('active');
  };
}

if (closeQuizBtn) {
  closeQuizBtn.onclick = () => {
    chefQuizModal.classList.remove('active');
  };
}

function resetChefQuiz() {
  quizAnswers = {};
  quizRecommendedItem = null;
  
  // Reset Steps view
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
  document.getElementById('quiz-step-1').classList.add('active');
}

quizOptionCards.forEach(card => {
  card.onclick = () => {
    const rawAnswer = card.getAttribute('data-answer');
    const [key, value] = rawAnswer.split(':');
    quizAnswers[key] = value;
    
    // Move to next step
    const currentStep = card.closest('.quiz-step');
    const nextStep = currentStep.nextElementSibling;
    
    if (nextStep && nextStep.classList.contains('quiz-step')) {
      currentStep.classList.remove('active');
      nextStep.classList.add('active');
      
      // If result step, calculate recommendation
      if (nextStep.id === 'quiz-result-step') {
        calculateRecommendation();
      }
    }
  };
});

if (restartQuizBtn) {
  restartQuizBtn.onclick = () => {
    resetChefQuiz();
  };
}

function calculateRecommendation() {
  // Database match algorithm
  const menuDishes = [
    { id: 'burger-1', name: 'Signature Beast Burger', price: 650, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80', desc: 'Flame grilled double beef beast.', tags: { diet: 'all', spice: 'medium', type: 'main' } },
    { id: 'burger-2', name: 'Double Bacon Cheese Burger', price: 720, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', desc: 'Decadent bacon and double cheese.', tags: { diet: 'all', spice: 'mild', type: 'main' } },
    { id: 'pizza-1', name: 'Truffle Mushroom Pizza', price: 1250, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', desc: 'Earthy black truffles on wood fired base.', tags: { diet: 'all', spice: 'mild', type: 'main' } },
    { id: 'pizza-2', name: 'Classic Margherita Pizza', price: 950, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', desc: 'Traditional Italian margherita.', tags: { diet: 'all', spice: 'mild', type: 'main' } },
    { id: 'breakfast-1', name: 'Avocado Toast Supreme', price: 580, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80', desc: 'Smashed organic avocado sourdough toast.', tags: { diet: 'breakfast', spice: 'medium', type: 'main' } },
    { id: 'breakfast-2', name: 'French Waffles Classic', price: 480, img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&q=80', desc: 'Belgian waffles, maple and fruits.', tags: { diet: 'sweet', spice: 'mild', type: 'dessert' } },
    { id: 'dessert-1', name: 'Heavenly Velvet Cake', price: 850, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', desc: 'Moist red velvet sponge layers.', tags: { diet: 'sweet', spice: 'mild', type: 'dessert' } },
    { id: 'dessert-2', name: 'Golden Sweet Fantasy', price: 420, img: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=400&q=80', desc: 'Cardamom pistachio golden cream.', tags: { diet: 'sweet', spice: 'mild', type: 'dessert' } },
    { id: 'dessert-3', name: 'Rainbow Bliss Cupcakes', price: 380, img: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=400&q=80', desc: 'Sprinkled frosting vanilla cupcakes.', tags: { diet: 'sweet', spice: 'mild', type: 'dessert' } },
    { id: 'dessert-4', name: 'Artisan Gelato Supreme', price: 320, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', desc: 'Vanilla bean salted caramel gelato.', tags: { diet: 'sweet', spice: 'mild', type: 'dessert' } },
    { id: 'drink-1', name: 'Tropical Paradise Cooler', price: 280, img: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80', desc: 'Muddled passion fruit and lime soda.', tags: { diet: 'breakfast', spice: 'mild', type: 'drink' } },
    { id: 'drink-2', name: 'Chilled Espresso Frappe', price: 350, img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80', desc: 'Arabic arabica coffee double shot.', tags: { diet: 'all', spice: 'mild', type: 'drink' } }
  ];
  
  let bestScore = -1;
  let matches = [];
  
  menuDishes.forEach(dish => {
    let score = 0;
    if (dish.tags.diet === quizAnswers.diet) score += 3;
    if (dish.tags.spice === quizAnswers.spice) score += 2;
    if (dish.tags.type === quizAnswers.type) score += 4;
    
    if (score > bestScore) {
      bestScore = score;
      matches = [dish];
    } else if (score === bestScore) {
      matches.push(dish);
    }
  });
  
  quizRecommendedItem = matches[Math.floor(Math.random() * matches.length)];
  
  // Render
  const container = document.getElementById('recommended-dish-card');
  if (container && quizRecommendedItem) {
    container.innerHTML = `
      <img src="${quizRecommendedItem.img}" alt="${quizRecommendedItem.name}">
      <div class="recommendation-info">
        <h4>${quizRecommendedItem.name}</h4>
        <div class="rec-price">Rs. ${quizRecommendedItem.price}</div>
        <p>${quizRecommendedItem.desc}</p>
      </div>
    `;
  }
}

if (addRecommendedBtn) {
  addRecommendedBtn.onclick = (e) => {
    if (!quizRecommendedItem) return;
    
    addToCart(quizRecommendedItem.id, quizRecommendedItem.name, quizRecommendedItem.price, quizRecommendedItem.img);
    createConfetti(e.clientX, e.clientY);
    chefQuizModal.classList.remove('active');
    
    alert(`Chef's choice: ${quizRecommendedItem.name} added to cart!`);
  };
}

// Initialise deals countdown & customizer click links immediately
startDailyDealsTimer();
wireCustomizerClicks();

// Window outer modal click dismissal overrides
window.onclick = (e) => {
  if (e.target === trackingModal) {
    trackingModal.classList.remove('active');
    clearTrackingSimulations();
  }
  if (e.target === bookingModal) {
    bookingModal.classList.remove('active');
  }
  if (e.target === seatingMapModal) {
    seatingMapModal.classList.remove('active');
  }
  if (e.target === customizerModal) {
    customizerModal.classList.remove('active');
    activeCustomizerDish = null;
  }
  if (e.target === chefQuizModal) {
    chefQuizModal.classList.remove('active');
  }
  // Click outside to close cart
  if (e.target !== cartDrawer && !cartDrawer.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target) && !e.target.classList.contains('add-to-cart-btn') && !e.target.closest('.cart-item-qty')) {
    cartDrawer.classList.remove('active');
  }
};