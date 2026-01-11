# 🚀 Setup Guide - Vehicle Rental MERN Stack Application

## Quick Start Guide

Follow these steps to get the application running on your local machine.

### Step 1: Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB on your system
2. Start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string

### Step 3: Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb://localhost:27017/vehicle-rent
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vehicle-rent

JWT_SECRET=your-secret-key-change-in-production-use-random-string-here
PORT=5000
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a random secure string in production!

### Step 4: Create Admin User (Optional)

Run the admin creation script:

```bash
cd server
npm run create-admin
```

This will create an admin user with:
- Email: `admin@vehiclerent.com`
- Password: `admin123`

**⚠️ Change the password after first login!**

### Step 5: Start the Application

#### Terminal 1 - Start Backend Server
```bash
cd server
npm run dev
```

The backend will run on `http://localhost:5000`

#### Terminal 2 - Start Frontend Server
```bash
cd client
npm start
```

The frontend will run on `http://localhost:3000`

### Step 6: Access the Application

1. Open your browser and go to `http://localhost:3000`
2. Register a new user account
3. Or login with admin credentials (if you created admin user)

## 🧪 Testing the Application

### User Flow:
1. **Register** → Create a new account
2. **Browse Vehicles** → View available cars and bikes
3. **Filter Vehicles** → Filter by type, price, availability
4. **View Details** → Click on any vehicle to see details
5. **Book Vehicle** → Select dates and create booking
6. **View Bookings** → Check your booking history in Dashboard
7. **Cancel Booking** → Cancel pending/approved bookings

### Admin Flow:
1. **Login as Admin** → Use admin credentials
2. **Access Admin Dashboard** → Click "Admin Dashboard" in header
3. **Manage Vehicles** → Add, edit, or delete vehicles
4. **Manage Bookings** → View all bookings and approve/reject them

## 📝 Default Admin Credentials

If you ran the admin creation script:
- **Email**: `admin@vehiclerent.com`
- **Password**: `admin123`

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env` file
- Verify MongoDB connection string is correct

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using the port

### Frontend Can't Connect to Backend
- Ensure backend server is running on port 5000
- Check `REACT_APP_API_URL` in client (defaults to `http://localhost:5000/api`)
- Verify CORS is enabled in backend

### Module Not Found Errors
- Run `npm install` in both `server` and `client` directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## 🚀 Production Deployment

### Backend Deployment:
1. Set environment variables on hosting platform
2. Ensure MongoDB connection string is configured
3. Deploy to platforms like:
   - Heroku
   - Railway
   - AWS EC2
   - DigitalOcean

### Frontend Deployment:
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy `build` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

### Environment Variables for Production:
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Use production MongoDB URI
- Configure CORS for your frontend domain

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🆘 Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check MongoDB connection

---

**Happy Coding! 🎉**

