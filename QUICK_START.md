# 🚀 Quick Start Guide - How to Run the Application

## Prerequisites
- Node.js installed (v14 or higher)
- MongoDB installed and running (or MongoDB Atlas account)
- npm or yarn package manager

## Step-by-Step Instructions

### Step 1: Install Backend Dependencies

Open terminal/command prompt and navigate to the server folder:

```bash
cd server
npm install
```

This will install all required packages for the backend.

### Step 2: Install Frontend Dependencies

Open a new terminal window and navigate to the client folder:

```bash
cd client
npm install
```

This will install all required packages for the frontend.

### Step 3: Setup Environment Variables

Create a `.env` file in the `server` folder:

**Windows:**
```bash
cd server
type nul > .env
```

**Mac/Linux:**
```bash
cd server
touch .env
```

Then open the `.env` file and add:

```env
MONGODB_URI=mongodb://localhost:27017/vehicle-rent
JWT_SECRET=my-secret-key-change-this-in-production-12345
PORT=5000
NODE_ENV=development
```

**Note:** If using MongoDB Atlas (cloud), replace `MONGODB_URI` with your Atlas connection string.

### Step 4: Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB service is running
- On Windows: Check Services or run `mongod` in terminal
- On Mac/Linux: Run `mongod` or `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- No local setup needed, just use your connection string in `.env`

### Step 5: Create Admin User (Optional)

In the server folder, run:

```bash
npm run create-admin
```

This creates an admin account:
- Email: `admin@vehiclerent.com`
- Password: `admin123`

### Step 6: Start Backend Server

Keep the terminal in the `server` folder and run:

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

✅ Backend is now running on `http://localhost:5000`

### Step 7: Start Frontend Server

Open a **NEW** terminal window, navigate to client folder:

```bash
cd client
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`

✅ Frontend is now running!

## 🎉 You're All Set!

The application should now be running:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000 (opens automatically)

## 📝 Quick Test

1. **Register a new user** at http://localhost:3000/register
2. **Or login as admin** (if you created admin):
   - Email: `admin@vehiclerent.com`
   - Password: `admin123`
3. **Browse vehicles** on the home page
4. **Book a vehicle** by clicking "View Details"

## ⚠️ Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
- Change `PORT=5000` to another port (e.g., `PORT=5001`) in `.env`
- Or stop the process using that port

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### Module Not Found Errors
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Frontend Can't Connect to Backend
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

## 🛑 Stopping the Application

- Press `Ctrl + C` in both terminal windows to stop the servers

## 📚 Need More Help?

Check these files for detailed information:
- `SETUP.md` - Detailed setup instructions
- `README.md` - Complete project documentation
- `PROJECT_OVERVIEW.md` - Feature checklist

---

**Happy Coding! 🎉**

