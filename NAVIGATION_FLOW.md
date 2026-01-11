# 🧭 Navigation Flow Guide

## Website Navigation Structure

The application now follows a clear user flow:

### 1. **Landing Page** (`/`)
- **First page** users see when they open the website
- Shows hero section, features, and "How It Works"
- **Call-to-action buttons**: "Get Started" and "Login"
- **Auto-redirects**: If user is already logged in, automatically redirects to:
  - `/dashboard` (for regular users)
  - `/admin/dashboard` (for admin users)

### 2. **Register Page** (`/register`)
- User registration form
- **After successful registration**: Redirects to `/dashboard`
- **Auto-redirects**: If already logged in, redirects to dashboard

### 3. **Login Page** (`/login`)
- User login form
- **After successful login**: Redirects to:
  - `/dashboard` (for regular users)
  - `/admin/dashboard` (for admin users)
- **Auto-redirects**: If already logged in, redirects to dashboard

### 4. **Dashboard** (`/dashboard`)
- **Protected route** - requires login
- Shows user's booking history
- **Access**: Only for logged-in regular users
- **If not logged in**: Redirects to `/login`
- **Has "Browse Vehicles" button** → Links to `/home`

### 5. **Admin Dashboard** (`/admin/dashboard`)
- **Protected route** - requires admin login
- Manage vehicles and bookings
- **Access**: Only for admin users
- **If not logged in**: Redirects to `/login`
- **If logged in but not admin**: Redirects to `/dashboard`
- **Has "Browse Vehicles" button** → Links to `/home`

### 6. **Home Page** (`/home` or `/vehicles`)
- Browse all available vehicles
- Filter by type, price, availability
- **Access**: Available to all users (logged in or not)
- **Navigation**: Visible in header as "Home" for logged-in users
- **Flow**: Comes after Dashboard in navigation

### 7. **Vehicle Details** (`/vehicles/:id`)
- View vehicle details
- Book a vehicle (requires login)
- **Access**: Available to all users
- **Booking**: Redirects to `/login` if not logged in

---

## User Flow Diagrams

### New User Flow:
```
Landing Page (/)
    ↓
Click "Get Started" or "Register"
    ↓
Register Page (/register)
    ↓
Fill form → Submit
    ↓
Dashboard (/dashboard)
    ↓
Click "Browse Vehicles" or "Home" in header
    ↓
Home Page (/home) - Browse Vehicles
    ↓
Select Vehicle → Book → Back to Dashboard
```

### Existing User Flow:
```
Landing Page (/)
    ↓
Click "Login"
    ↓
Login Page (/login)
    ↓
Enter credentials → Submit
    ↓
Dashboard (/dashboard)
    ↓
Click "Browse Vehicles" or "Home" in header
    ↓
Home Page (/home) - Browse Vehicles
    ↓
Select Vehicle → Book → Back to Dashboard
```

### Admin User Flow:
```
Landing Page (/)
    ↓
Login Page (/login)
    ↓
Admin Login
    ↓
Admin Dashboard (/admin/dashboard)
    ↓
Manage Vehicles & Bookings
```

---

## Navigation Rules

### Header Navigation:
- **Not Logged In**:
  - Home (Landing)
  - Login
  - Register

- **Logged In (Regular User)**:
  - Dashboard
  - Home (Vehicles)
  - User name
  - Logout

- **Logged In (Admin)**:
  - Admin Dashboard
  - Home (Vehicles)
  - User name
  - Logout

### Auto-Redirects:
1. **Landing Page** → If logged in → Dashboard
2. **Login Page** → If logged in → Dashboard
3. **Register Page** → If logged in → Dashboard
4. **Dashboard** → If not logged in → Login Page
5. **Admin Dashboard** → If not logged in → Login Page
6. **Admin Dashboard** → If not admin → Dashboard

---

## Route Protection

### Public Routes (No Login Required):
- `/` - Landing Page
- `/login` - Login Page
- `/register` - Register Page
- `/vehicles` - Vehicle Listing
- `/vehicles/:id` - Vehicle Details (viewing only)

### Protected Routes (Login Required):
- `/dashboard` - User Dashboard
- `/admin/dashboard` - Admin Dashboard

### Protected Actions (Login Required):
- Booking a vehicle (redirects to login if not logged in)
- Viewing booking history
- Cancelling bookings

---

## Key Features

✅ **Smart Redirects**: Users are automatically redirected based on their login status
✅ **Role-Based Access**: Admin and regular users see different dashboards
✅ **Protected Routes**: Unauthorized access is prevented
✅ **Seamless Flow**: Natural progression from landing → auth → dashboard → booking

---

## Testing the Flow

1. **Open website** → Should see Landing Page
2. **Click "Get Started"** → Goes to Register Page
3. **Register** → Auto-redirects to Dashboard
4. **Logout** → Returns to Landing Page
5. **Click "Login"** → Goes to Login Page
6. **Login** → Auto-redirects to Dashboard
7. **Click "Vehicles"** → Browse vehicles
8. **Click vehicle** → View details
9. **Book vehicle** → Creates booking (if logged in)

---

**Navigation flow is now optimized for the best user experience! 🎉**

