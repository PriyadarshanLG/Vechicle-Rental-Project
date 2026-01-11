# 🚗 Vehicle Rental MERN Stack Application

A complete, production-ready MERN Stack Vehicle Rental Web Application where users can rent cars or bikes online and admins can manage vehicles and bookings.

## 🧩 Tech Stack

- **Frontend**: React.js (with hooks)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT + bcrypt
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## 📁 Project Structure

```
vehicle-rent/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── context/        # React Context (Auth)
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   ├── public/
│   └── package.json
│
├── server/                 # Express Backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth middleware
│   ├── config/             # Database config
│   ├── server.js           # Express server
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vehicle-rent
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Setup Environment Variables**

   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/vehicle-rent
   JWT_SECRET=your-secret-key-change-in-production
   PORT=5000
   NODE_ENV=development
   ```

5. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas connection string in `.env`

6. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

7. **Start Frontend Development Server**
   ```bash
   cd client
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 👤 User Features

- ✅ User Registration & Login
- ✅ Secure authentication using JWT
- ✅ Browse all available vehicles
- ✅ Filter vehicles by type, price, availability
- ✅ View vehicle details
- ✅ Book a vehicle by selecting date range
- ✅ Auto calculate total rent
- ✅ View booking history
- ✅ Cancel booking (if allowed)
- ✅ Fully responsive UI

## 🧑‍💼 Admin Features

- ✅ Admin login
- ✅ Admin dashboard
- ✅ Add new vehicle
- ✅ Update vehicle details
- ✅ Delete vehicle
- ✅ Upload vehicle images (via URL)
- ✅ Set rent price (per day)
- ✅ View all bookings
- ✅ Approve / Reject bookings
- ✅ Manage users

## 🔐 API Routes

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Vehicle Routes
- `GET /api/vehicles` - Get all vehicles (with filters)
- `GET /api/vehicles/:id` - Get single vehicle
- `POST /api/vehicles` - Create vehicle (Admin only)
- `PUT /api/vehicles/:id` - Update vehicle (Admin only)
- `DELETE /api/vehicles/:id` - Delete vehicle (Admin only)

### Booking Routes
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings/user/:id` - Get bookings for specific user
- `GET /api/bookings` - Get all bookings (Admin only)
- `PUT /api/bookings/:id/status` - Update booking status (Admin only)
- `PUT /api/bookings/:id/cancel` - Cancel booking

## 🗂️ Database Schemas

### User Schema
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String: 'user' | 'admin', default: 'user')
- createdAt (Date)

### Vehicle Schema
- vehicleName (String, required)
- vehicleType (String: 'car' | 'bike', required)
- brand (String, required)
- rentPerDay (Number, required)
- image (String, URL)
- isAvailable (Boolean, default: true)
- createdAt (Date)

### Booking Schema
- userId (ObjectId, reference to User)
- vehicleId (ObjectId, reference to Vehicle)
- fromDate (Date, required)
- toDate (Date, required)
- totalAmount (Number, required)
- paymentStatus (String: 'pending' | 'completed' | 'failed')
- bookingStatus (String: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled')
- createdAt (Date)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes (authentication middleware)
- Admin-only routes (role-based access control)
- Input validation
- Error handling

## 📱 Frontend Pages

- **Home** (`/`) - Landing page with vehicle listings
- **Login** (`/login`) - User login page
- **Register** (`/register`) - User registration page
- **Vehicle Listing** (`/vehicles`) - Browse all vehicles with filters
- **Vehicle Details** (`/vehicles/:id`) - View vehicle details and book
- **User Dashboard** (`/dashboard`) - User's booking history
- **Admin Dashboard** (`/admin/dashboard`) - Admin management panel

## 🎨 Styling

The application uses Tailwind CSS for styling, providing:
- Modern, clean UI design
- Fully responsive layout
- Consistent color scheme
- Smooth transitions and hover effects

## 📝 Notes

- Default admin user can be created by registering with `role: 'admin'` in the database
- Image uploads currently use URLs (can be extended to use Cloudinary)
- Payment integration can be added using Razorpay/Stripe
- All dates are handled in UTC format

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy `build` folder to platforms like Vercel, Netlify, or AWS S3

## 📄 License

This project is created for academic/educational purposes.

## 👨‍💻 Development

For development, use:
- Backend: `npm run dev` (uses nodemon for auto-restart)
- Frontend: `npm start` (React development server with hot reload)

---

**Built with ❤️ using MERN Stack**

