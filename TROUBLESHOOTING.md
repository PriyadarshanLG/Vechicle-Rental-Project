# 🔧 Troubleshooting Guide - "Error fetching bookings"

## Common Issues and Solutions

### Issue: "Error fetching bookings" in Dashboard

This error occurs when the frontend cannot fetch bookings from the backend API.

---

## ✅ Step-by-Step Fix

### Step 1: Check if Backend Server is Running

**Check Terminal:**
- Look for: `Server running on port 5000`
- Look for: `MongoDB Connected: ...`

**If not running:**
```powershell
cd server
npm run dev
```

**Expected output:**
```
[nodemon] starting `node server.js`
Server running on port 5000
MongoDB Connected: localhost:27017
```

---

### Step 2: Check Browser Console

1. Open browser Developer Tools (F12)
2. Go to **Console** tab
3. Look for error messages

**Common errors:**

#### Error: "Network Error" or "Failed to fetch"
- **Cause**: Backend server not running
- **Fix**: Start backend server (Step 1)

#### Error: "401 Unauthorized"
- **Cause**: Authentication token missing or invalid
- **Fix**: 
  1. Logout and login again
  2. Check if token exists: Open DevTools → Application → Local Storage → Check for `token`

#### Error: "CORS policy"
- **Cause**: CORS not configured properly
- **Fix**: Check `server/server.js` has `app.use(cors());`

---

### Step 3: Test API Endpoint Directly

**Open browser and go to:**
```
http://localhost:5000/api/health
```

**Expected response:**
```json
{"success":true,"message":"Server is running"}
```

**If you get an error:**
- Backend server is not running → Start it (Step 1)

---

### Step 4: Check Authentication Token

**In Browser DevTools:**
1. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
2. Click **Local Storage** → `http://localhost:3000`
3. Check for:
   - `token` - Should exist and have a value
   - `user` - Should exist and have user data

**If token is missing:**
- Logout and login again
- Make sure login was successful

---

### Step 5: Test API with Token

**Using Browser Console:**

```javascript
// Get token from localStorage
const token = localStorage.getItem('token');
console.log('Token:', token);

// Test API call
fetch('http://localhost:5000/api/bookings/my-bookings', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

**Expected response:**
```json
{
  "success": true,
  "count": 0,
  "data": {
    "bookings": []
  }
}
```

**If you get 401 error:**
- Token is invalid → Logout and login again
- Token expired → Login again

---

### Step 6: Check MongoDB Connection

**In Terminal (where backend is running):**
- Should see: `MongoDB Connected: localhost:27017`

**If you see MongoDB error:**
1. Make sure MongoDB is running
2. Check MongoDB Compass is connected
3. Verify `.env` file has correct `MONGODB_URI`

---

### Step 7: Check Network Tab

**In Browser DevTools:**
1. Go to **Network** tab
2. Refresh the Dashboard page
3. Look for request to `/api/bookings/my-bookings`
4. Click on it to see:
   - **Status**: Should be 200 (success) or 401 (unauthorized)
   - **Headers**: Check if `Authorization: Bearer ...` is present
   - **Response**: See the actual error message

---

## 🔍 Quick Diagnostic Checklist

- [ ] Backend server is running (`npm run dev` in server folder)
- [ ] MongoDB is connected (check terminal for "MongoDB Connected")
- [ ] Frontend server is running (`npm start` in client folder)
- [ ] User is logged in (check localStorage for `token`)
- [ ] API endpoint `/api/health` returns success
- [ ] No CORS errors in browser console
- [ ] Network request shows 200 status (not 401 or 500)

---

## 🚀 Quick Fixes

### Fix 1: Restart Everything
```powershell
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm start
```

### Fix 2: Clear Browser Data
1. Open DevTools (F12)
2. Right-click refresh button → "Empty Cache and Hard Reload"
3. Or: Application → Clear Storage → Clear site data

### Fix 3: Re-login
1. Logout from the app
2. Clear localStorage (DevTools → Application → Local Storage → Clear)
3. Login again

### Fix 4: Check Backend Logs
Look at the terminal where backend is running for any error messages.

---

## 📝 Common Error Messages

| Error Message | Cause | Solution |
|-------------|-------|----------|
| "Network Error" | Backend not running | Start backend server |
| "401 Unauthorized" | Invalid/missing token | Logout and login again |
| "500 Internal Server Error" | Backend error | Check backend terminal logs |
| "CORS policy" | CORS not configured | Check `server/server.js` |
| "Cannot connect to MongoDB" | MongoDB not running | Start MongoDB service |

---

## 🆘 Still Not Working?

1. **Check backend terminal** for detailed error messages
2. **Check browser console** for frontend errors
3. **Check Network tab** to see the actual API request/response
4. **Verify all services are running:**
   - MongoDB ✓
   - Backend server ✓
   - Frontend server ✓

---

**Need more help? Check the error message in browser console for specific details!**



