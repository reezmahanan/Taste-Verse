# TasteVerse - High-End Restaurant Experience

TasteVerse is a premium, fully responsive, and highly interactive restaurant website designed to offer a state-of-the-art dining and reservation experience. Built with HTML5, CSS3, and modern vanilla ES6+ JavaScript, it showcases rich animations, vibrant dark/light theme switching, and real-time client-side systems.

🔗 **[View Live Website](https://reezmahanan.github.io/Taste-Verse/)**

---

## 📸 Screenshots & Highlights

![TasteVerse Home Mockup](https://github.com/reezmahanan/TasteVerse/blob/main/Screenshots/image%201.png)
![TasteVerse Seating Map Mockup](https://github.com/reezmahanan/TasteVerse/blob/main/Screenshots/image%202.png)
![TasteVerse Cart Drawer Mockup](https://github.com/reezmahanan/TasteVerse/blob/main/Screenshots/image%203.png)

---

## 🌟 Interactive Features

### 1. 🛒 Persistent Shopping Cart Drawer
*   **Slide-Out UX**: A sleek right-side navigation drawer showing staged order items.
*   **Persistent Storage**: Saves the cart state in the browser's `localStorage` (persists on page reloads).
*   **Discount Code System**: Supports promo codes (e.g., enter `TASTE20` for a flat 20% discount on order subtotal).
*   **Responsive Calculations**: Dynamic updates for subtotal, tax rates, shipping/delivery fees, and total price.

### 2. 🕒 Daily Deals Countdown Banner
*   **Limited Offers**: Prominent hero banner ticking down to midnight tonight.
*   **Urgency Animation**: High-end interactive ticking cards display `Hours : Minutes : Seconds`.
*   **Claim System**: Clicking **Claim 50% Off Deal** adds the signature combo meal to the cart with a single click.

### 3. 🍔 Food Customizer & Nutritional Profile
*   **Overlay Modal**: Clicking any dish card's image or title launches an customization panel.
*   **Nutrition Bars**: Displays calibrated progress bars for Calories (kcal), Protein (g), and Carbs (g), alongside allergen warnings.
*   **Topping Add-Ons**: Checkboxes to toggle extra cheddar, bacon, or gluten-free configurations that modify the final checkout name and total price dynamically.

### 4. 🗺️ Interactive Table Seating Map
*   **Visual Restaurant Layout**: Opens a spatial map representational grid of the restaurant floor.
*   **Categorized Zones**: Select from VIP Booths, Scenic Window views, Cozy Corners, or Standard Tables.
*   **Live Selection Sync**: Displays available (white), reserved (red), and selected (green) states, updates guests limits, and automatically prints the table location details on the booking receipt ticket.

### 5. 🤖 Chef AI Recommendation Widget
*   **Floating Chatbot Button**: A pulsing robotic chef icon anchored to the bottom-right.
*   **3-Step Questionnaire**: Collects preferences for Diet category, Heat/Spice levels, and Meal type.
*   **Interactive Matcher**: Score-based recommendation algorithm suggests the ideal menu match and adds it to the cart.

### 6. 🌓 Dual-Theme Toggler
*   **Dark Mode Sync**: Instant, lag-free switcher between premium Dark mode (cool tones, high contrast) and Light mode. Saves preference settings via `localStorage`.

### 7. 🛵 Live Order Tracking Timeline
*   **Status Progress Bar**: Tracks placement status through 4 distinct stages (*Order Received*, *Preparing*, *On Its Way*, *Delivered*).
*   **Simulated Countdown Timers**: Updates relative step completion timestamps dynamically.

### 8. ✍️ Testimonial & Review Feed
*   **Live Submission**: Interactive rating selector and comment field that prepends new reviews to the testimonials feed instantly.

---

## 🛠️ Tech Stack & Assets

*   **Markup**: HTML5 (Semantic Structure)
*   **Styling**: CSS3 (Vanilla Custom properties, Grid/Flexbox layouts, glassmorphism, responsive keyframes)
*   **Behavior**: JavaScript (ES6+ Vanilla DOM operations, LocalStorage API, requestAnimationFrame loops)
*   **Icons**: Font Awesome 5.15.3
*   **Typography**: Headings: *Playfair Display*, UI Elements: *Outfit* (Google Fonts)
*   **Images**: Verified high-resolution food assets from Unsplash

---

## 📋 Folder Structure

```
Taste-Verse/
│
├── index.html           # Main HTML structure and modal wrappers
├── style.css            # Responsive layout structure, variables, dark overrides, animations
├── script.js            # Seating map grid, cart state, customizer, countdown, quiz logic
└── README.md            # Project documentation and details
```

---

## 🚀 Getting Started

### Quick Start
1. Clone this repository locally:
   ```bash
   git clone https://github.com/reezmahanan/Taste-Verse.git
   ```
2. Open `index.html` in any web browser to run the application offline. No servers, node modules, or compile stages are required!

---

## 🎨 Design Systems & Palette

| Token / Variable | Light Mode Value | Dark Mode Value |
| :--- | :--- | :--- |
| `--bg-primary` | `#ffffff` | `#121212` (Pitch) |
| `--bg-secondary` | `#fff5f5` | `#1e1e1e` (Slate) |
| `--text-primary` | `#333333` | `#f5f5f5` (White-gray) |
| `--text-secondary` | `#666666` | `#b0b0b0` (Silver) |
| `--red` | `#ff3838` (Vibrant Coral) | `#ff4d4d` |
| `--border-color` | `rgba(0, 0, 0, 0.1)` | `rgba(255, 255, 255, 0.1)` |

---

## 👥 Credits

*   **Designed & Developed by:** Reezma Hanan
*   **Copyright:** © 2026 TasteVerse. All Rights Reserved.
