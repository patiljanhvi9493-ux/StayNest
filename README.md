# StayNest — Premium Student Accommodation & Mess Finder Portal

StayNest is a modern, premium, and fully responsive web portal designed to help students, working professionals, and migrants discover verified single rooms, shared PGs, hostels, flats, roommate options, and local services (laundromats, xerox vendors, gyms, etc.) with ease. It features direct owner coordinates (zero brokerage), safety ratings, neighborhood analyzers, and an interactive roommate compatibility calculator.

This project is built as a highly interactive, state-driven single-page application using **React, Vite, and Tailwind CSS**. It compiles into standard, optimized static assets suitable for instant hosting on **GitHub Pages** or direct local execution.

---

## 🚀 Live Demo & Simulators
StayNest operates in a fully functional client-side sandbox environment. Reviewers can easily test multiple user roles directly:
- **Student Role**: Save rooms to a Wishlist, add items to a Comparison Drawer, schedule visits (saves to booking records), calculate roommate match scores, and write reviews.
- **Stay Owner Role**: Manage listings, toggle availability, edit room parameters, and view analytics stats.
- **Mess Owner Role**: Update daily menus (breakfast, lunch, dinner), modify monthly sub rates, and manage delivery toggles.
- **System Admin Role**: Moderate listings, check account logs, and toggle the green "Verified" verification badge.

*Tip: Use the profile dropdown in the top-right corner to instantly switch roles!*

---

## 🛠️ Technology Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3 (Utility classes, class-based dark mode, custom glassmorphism)
- **Icons**: Lucide React
- **Routing**: React Router (`HashRouter` to support standard static builds and double-click execution)
- **State Management**: AppContext + React Hooks (with automatic `localStorage` synchronization)

---

## 📂 Project Directory Structure

```
StayNest/
├── public/                   # Static assets (favicons, site logs, search robot instructions)
│   ├── favicon.svg           # Brand logo vector
│   ├── robots.txt            # Search engine crawler indexing parameters
│   └── sitemap.xml           # SEO route indexing maps
├── src/
│   ├── assets/               # Local styles and raw image files
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx        # Sticky header with theme and simulation controls
│   │   ├── Footer.jsx        # Responsive footer with newsletter form
│   │   ├── RoomCard.jsx      # Multi-info property card
│   │   ├── MessCard.jsx      # Mess detail card showing daily menus
│   │   ├── Chatbot.jsx       # Floating AI search assistant widget
│   │   ├── ComparePanel.jsx  # Slide-up comparison controller drawer
│   │   └── SkeletonLoader.jsx # Pulse load cards placeholder
│   ├── context/
│   │   └── AppContext.jsx    # Authentication, bookings, listings, and theme state
│   ├── data/                 # JSON Mock Database Templates
│   │   ├── listings.json     # Accommodations database
│   │   ├── messes.json       # Food services database
│   │   ├── roommates.json    # Seekers profile database
│   │   └── community.json    # Forum bulletin posts database
│   ├── pages/                # Page layouts
│   │   ├── Home.jsx          # Landing page with smart search dashboard
│   │   ├── Rooms.jsx         # Stay catalog with sliders and search query matching
│   │   ├── RoomDetails.jsx   # Details catalog, schedule tools, and reviews engine
│   │   ├── Mess.jsx          # Dining directory
│   │   ├── Nearby.jsx        # Transit, libraries, and ATM locator
│   │   ├── RoommateFinder.jsx # Compatibility percentage matching tool
│   │   ├── Community.jsx     # Bulletin classifieds and upvote forum
│   │   ├── Compare.jsx       # Comparative matrix table
│   │   ├── LoginRegister.jsx # Segmented authentication terminal
│   │   ├── Profile.jsx       # User bookings, saved stays, and account updates
│   │   ├── OwnerDashboard.jsx # Accommodation partner management portal
│   │   ├── MessDashboard.jsx # Food partner management portal
│   │   ├── AdminPanel.jsx    # Verification moderation panel
│   │   ├── About.jsx         # Brand mission and collapsible FAQ accordions
│   │   ├── Contact.jsx       # Support query logger
│   │   └── NotFound.jsx      # Styled 404 page
│   ├── App.jsx               # Main router and context container
│   ├── index.css             # Main stylesheet imports and scrollbar overrides
│   └── main.jsx              # React mounting root
├── package.json              # Package manifest
├── vite.config.js            # Vite build parameters (configured for relative bases)
├── tailwind.config.js        # Tailwind customizations
├── postcss.config.js         # PostCSS configuration
├── LICENSE                   # Open-source license (MIT)
└── README.md                 # Project guide
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
Make sure you have **Node.js** (v16+) and **npm** installed on your system.

### 1. Install Dependencies
Navigate to the project root and run:
```bash
npm install
```

### 2. Launch Local Development Server
Boot the hot-reloading development server:
```bash
npm run dev
```
Open the local URL (usually `http://localhost:5173`) in your browser to inspect the application.

### 3. Build Production Target
Compile the optimized static bundle:
```bash
npm run build
```
Vite will output the compiled files to a `dist/` folder. Because the build has relative pathing (`base: './'`), you can directly double-click `dist/index.html` to run the site offline, or upload the contents of the `dist/` directory directly to GitHub Pages!

---

## 🔮 Future Backend Integrations
StayNest is architected using clean React Context bindings to enable seamless database transitions in the future:
1. **Supabase / Firebase**: Replace the local array manipulation methods in `AppContext.jsx` (such as `addListing`, `addBooking`, or `updateMess`) with direct REST API requests or SDK calls (e.g. `supabase.from('listings').insert()`).
2. **Google Maps API**: Swap the map mock placeholders in `RoomDetails.jsx` and `Nearby.jsx` with active `google-map-react` widgets using lat/lng coordinates present in `listings.json`.
3. **OpenAI API**: Integrate the float chatbot in `Chatbot.jsx` with an Express middleware calling OpenAI's `gpt-4o-mini` API endpoint, feeding the prompt with the live `listings.json` file to offer human-like conversational accommodation recommendations.
