# Swadhara — Full-Stack Women's Skill & Livelihood Platform

Swadhara is a visual-first, multilingual (English, Hindi, Gujarati) early-stage startup platform designed for women who want to learn practical skills, practice crafting, showcase their handmade goods, and earn income. The system is designed to be accessible to users with varying digital literacy levels through visual categories, large touch targets, short and simple text, and step-by-step video-based tutorials.

## Brand & Visual System

* **Primary Dark Brown**: `#604734` — Applied to headings, buttons, body copy, and navigation accents.
* **Warm Cream**: `#fcf7d9` — Primary background color for the application.
* **Soft Blush**: `#f6d8d6` — Secondary sections, card surfaces, and subtle breaks.
* **Muted Pink**: `#f0c5d4` — Selected states, focus rings, and accent details.
* **Typography**: Outfit Google Font used as the clean sans-serif typeface throughout.

---

## Seeded Testing Accounts

The database comes pre-populated with realistic seed data containing categories, courses, lessons, and products. Use these accounts to verify functionality:

### 1. Radha Sharma (Maker / Seller)
* **Email**: `radha@swadhara.org`
* **Password**: `password123`
* **Role**: `seller`
* **Features**: Access the Maker Panel to add new products, edit/delete items, view incoming customer orders, and update shipment status.

### 2. Sunita Patel (Learner / Customer)
* **Email**: `sunita@swadhara.org`
* **Password**: `password123`
* **Role**: `user` (default)
* **Features**: Join courses, watch lesson videos, complete lessons to update progress percentages, buy handcrafted creations from the marketplace, input delivery addresses, and view order histories.

---

## Technical Stack

* **Frontend**: HTML5, Vanilla CSS, JavaScript, React (Vite), React Router, Axios
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose schemas)
* **Authentication**: JWT, bcryptjs

---

## Getting Started

### 1. Database Setup
Make sure you have a local MongoDB instance running on your machine:
```bash
mongodb://127.0.0.1:27017/swadhara
```

### 2. Backend Setup
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
3. Run the database seeding script to populate users, courses, and products:
   ```bash
   node src/seed/seed.js
   ```
4. Start the Express backend server (runs on `http://localhost:5000`):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Start the Vite React client application (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser. All API requests on `/api/*` will automatically proxy to the Express server on port 5000.
