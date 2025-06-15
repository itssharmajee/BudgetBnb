# BudgetBnb

BudgetBnb is a full-stack web application inspired by Airbnb, designed to help users discover, list, and review affordable homestays across India. The project is built using Node.js, Express, MongoDB, and EJS, with user authentication and a modern, responsive UI.

---

## Features

- **User Authentication:** Register, login, and logout securely using Passport.js.
- **Listings Management:** Create, view, update, and delete property listings.
- **Review System:** Leave ratings and comments on listings, and manage your reviews.
- **Flash Messages:** Get instant feedback on your actions (success, error, etc.).
- **Responsive Design:** Clean, mobile-friendly interface using Bootstrap and custom CSS.
- **Session Management:** Persistent login sessions and route protection for authenticated actions.

---

## Project Structure

```
.
├── index.js                  # Main server entry point
├── package.json              # Project metadata and dependencies
├── db/
│   └── mongodb.conn.js       # MongoDB connection logic
├── models/                   # Mongoose schemas for Listing, Review, User
├── routes/                   # Express route handlers for listings, reviews, users
├── helper/                   # Utility functions and error classes
├── middlewares/              # Custom Express middlewares (auth, etc.)
├── public/                   # Static assets (CSS, JS, images)
├── views/                    # EJS templates for UI
│   ├── includes/             # Navbar, footer, flash messages
│   ├── layouts/              # Boilerplate layout
│   └── user/                 # Signup and signin pages
├── init/
│   └── sample.data.js        # Sample data for seeding the database
└── README.md                 # Project documentation
```

---

## Database Information

- **Database:** MongoDB
- **Connection:** Configured in `db/mongodb.conn.js`
- **Collections:**
  - `users`: Stores user credentials and profile info
  - `listings`: Stores property listings (title, description, price, location, images, owner, etc.)
  - `reviews`: Stores reviews for listings (rating, comment, author, listing reference)

**Sample Listing Document:**
```json
{
  "_id": "ObjectId",
  "title": "Cozy Homestay in Goa",
  "description": "A beautiful and affordable homestay near the beach.",
  "price": 1200,
  "location": "Goa, India",
  "images": ["url1", "url2"],
  "owner": "UserId",
  "reviews": ["ReviewId1", "ReviewId2"]
}
```

**Sample User Document:**
```json
{
  "_id": "ObjectId",
  "username": "gautam123",
  "email": "gautam@example.com",
  "password": "hashed_password"
}
```

**Sample Review Document:**
```json
{
  "_id": "ObjectId",
  "rating": 4,
  "comment": "Great place, very clean!",
  "author": "UserId",
  "listing": "ListingId"
}
```

---

## Routes Information

### Authentication Routes

| Method | Route           | Description                | Access      |
|--------|-----------------|----------------------------|-------------|
| GET    | `/register`     | Show registration form     | Public      |
| POST   | `/register`     | Register a new user        | Public      |
| GET    | `/login`        | Show login form            | Public      |
| POST   | `/login`        | Login user                 | Public      |
| GET    | `/logout`       | Logout user                | Authenticated |

---

### Listing Routes

| Method | Route                | Description                        | Access      |
|--------|----------------------|------------------------------------|-------------|
| GET    | `/listings`          | Show all listings                  | Public      |
| GET    | `/listings/new`      | Show form to create new listing    | Authenticated |
| POST   | `/listings`          | Create new listing                 | Authenticated |
| GET    | `/listings/:id`      | Show single listing details        | Public      |
| GET    | `/listings/:id/edit` | Show form to edit listing          | Owner only  |
| PUT    | `/listings/:id`      | Update listing                     | Owner only  |
| DELETE | `/listings/:id`      | Delete listing                     | Owner only  |

---

### Review Routes

| Method | Route                              | Description                        | Access      |
|--------|------------------------------------|------------------------------------|-------------|
| POST   | `/listings/:id/reviews`            | Add review to listing              | Authenticated |
| DELETE | `/listings/:id/reviews/:reviewId`  | Delete review from listing         | Author only |

---

### Other Routes

| Method | Route           | Description                | Access      |
|--------|-----------------|----------------------------|-------------|
| GET    | `/`             | Home page                  | Public      |
| GET    | `*`             | 404 Not Found              | Public      |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or remote)

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/budgetbnb.git
    cd budgetbnb
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start MongoDB locally (if not already running):**
    ```sh
    mongod
    ```

4. **(Optional) Seed the database with sample listings:**
    ```sh
    node helper/seedDatabase.js
    ```

5. **Start the server:**
    ```sh
    node index.js
    ```

6. **Open your browser and visit:**  
    [http://localhost:3000](http://localhost:3000)

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js (local strategy)
- **Templating:** EJS & ejs-mate
- **Frontend:** Bootstrap 5, custom CSS
- **Session & Flash:** express-session, express-flash

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

ISC

---

Developed by Gautam Kumar Sharma.


  <script>
      document.addEventListener('DOMContentLoaded', function () {
        // Handle dropdown item clicks
        document.querySelectorAll('.dropdown-item').forEach(item => {
          item.addEventListener('click', function () {
            const dropdown = this.closest('.dropdown-menu');
            const hiddenInput = dropdown.querySelector('input[type="hidden"]');
            const displayElement = dropdown.closest('.nav-item').querySelector('span:last-child');

            // Update hidden input and display text
            hiddenInput.value = this.dataset.value;
            displayElement.textContent = this.textContent;

            // Close the dropdown
            const dropdownToggle = dropdown.previousElementSibling;
            bootstrap.Dropdown.getOrCreateInstance(dropdownToggle).hide();
          });
        });
      });
    </script>
