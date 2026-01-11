# 🔌 MongoDB Connection Guide

## Step-by-Step Instructions to Connect MongoDB

### Method 1: Connect via MongoDB Compass (GUI - Recommended)

#### Step 1: Open MongoDB Compass
- MongoDB Compass should already be open on your screen

#### Step 2: Connect to Local MongoDB
1. **Click on "localhost:27017"** in the left sidebar under CONNECTIONS
   - OR
2. **Click "Add new connection"** button (green button with + icon)
3. In the connection string field, enter:
   ```
   mongodb://localhost:27017
   ```
4. Click **"Connect"** button

#### Step 3: Verify Connection
- You should see databases listed (if any exist)
- The connection status will show "Connected"

#### Step 4: Create Database (if needed)
- The database `vehicle-rent` will be created automatically when the server runs
- You can also manually create it:
  1. Click "Create Database" button
  2. Database name: `vehicle-rent`
  3. Collection name: `users` (or any name)
  4. Click "Create Database"

---

### Method 2: Verify MongoDB Service is Running

#### Check if MongoDB is Running (Windows)

**Option A: Via Services**
1. Press `Windows + R`
2. Type `services.msc` and press Enter
3. Look for "MongoDB" service
4. Make sure it's "Running"
5. If not running, right-click → Start

**Option B: Via Command Prompt**
```powershell
# Check if MongoDB is running
netstat -ano | findstr :27017
```

If you see output, MongoDB is running!

**Option C: Via MongoDB Compass**
- If Compass can connect, MongoDB is running ✅

---

### Method 3: Start MongoDB Manually (if not running)

#### Windows:
```powershell
# Navigate to MongoDB bin directory (usually)
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB
mongod.exe
```

#### Or use MongoDB as a Service:
```powershell
# Start MongoDB service
net start MongoDB
```

---

### Step 4: Test Connection with Your Server

1. **Make sure MongoDB is connected** in Compass ✅

2. **Start your backend server:**
   ```powershell
   cd "C:\Users\Priyadarshan L G\OneDrive\Desktop\Vechicle rental Project\server"
   npm run dev
   ```

3. **Look for this message in terminal:**
   ```
   MongoDB Connected: localhost:27017
   Server running on port 5000
   ```

4. **If you see connection errors:**
   - Make sure MongoDB service is running
   - Check that port 27017 is not blocked by firewall
   - Verify connection string in `.env` file

---

### Step 5: Verify Database Creation

After starting the server:

1. **In MongoDB Compass:**
   - Refresh the database list (F5)
   - You should see `vehicle-rent` database appear
   - Click on it to see collections

2. **Collections will be created automatically when you:**
   - Register a user → `users` collection
   - Add a vehicle → `vehicles` collection
   - Create a booking → `bookings` collection

---

## 🔍 Troubleshooting

### Problem: "Cannot connect to MongoDB"

**Solution 1:** Check if MongoDB service is running
```powershell
net start MongoDB
```

**Solution 2:** Check if port 27017 is available
```powershell
netstat -ano | findstr :27017
```

**Solution 3:** Restart MongoDB service
```powershell
net stop MongoDB
net start MongoDB
```

### Problem: "Connection refused"

**Solution:** MongoDB might not be installed or service is not running
- Install MongoDB from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud) - see below

---

## ☁️ Alternative: Use MongoDB Atlas (Cloud - No Installation Needed)

If you don't want to install MongoDB locally:

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0) tier
3. Select cloud provider and region
4. Click "Create"

### Step 3: Setup Connection
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. It looks like: `mongodb+srv://username:password@cluster.mongodb.net/`

### Step 4: Update .env File
In `server/.env`, replace:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vehicle-rent
```

### Step 5: Whitelist Your IP
1. In Atlas dashboard → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Or add your specific IP address

---

## ✅ Connection Checklist

- [ ] MongoDB Compass is open
- [ ] Connected to `localhost:27017` in Compass
- [ ] Backend server started (`npm run dev`)
- [ ] See "MongoDB Connected" message in terminal
- [ ] See "Server running on port 5000" message
- [ ] Database `vehicle-rent` appears in Compass (after first API call)

---

## 🎯 Quick Test

Once connected, test the connection:

1. **Start server:**
   ```powershell
   cd server
   npm run dev
   ```

2. **In another terminal, test API:**
   ```powershell
   curl http://localhost:5000/api/health
   ```
   Should return: `{"success":true,"message":"Server is running"}`

3. **Or open in browser:**
   ```
   http://localhost:5000/api/health
   ```

---

**You're all set! 🎉**



