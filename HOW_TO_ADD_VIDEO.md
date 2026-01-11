# 📹 How to Add Video to Landing Page - Step by Step

## Quick Guide: Adding Your Video File

### Method 1: Using File Explorer (Windows)

1. **Open File Explorer**
   - Press `Windows + E` or click the folder icon

2. **Navigate to the public folder**
   ```
   C:\Users\Priyadarshan L G\OneDrive\Desktop\Vechicle rental Project\client\public
   ```

3. **Copy your video file**
   - Find your video file (MP4 format)
   - Right-click → Copy (or Ctrl+C)

4. **Paste into public folder**
   - Go to the `public` folder
   - Right-click in empty space → Paste (or Ctrl+V)

5. **Rename the file**
   - Right-click the video file → Rename
   - Change name to: `landing-video.mp4`
   - Press Enter

### Method 2: Using Command Line (PowerShell)

1. **Open PowerShell** in the project folder

2. **Navigate to public folder**
   ```powershell
   cd "C:\Users\Priyadarshan L G\OneDrive\Desktop\Vechicle rental Project\client\public"
   ```

3. **Copy your video file**
   ```powershell
   # Replace SOURCE_PATH with your video file location
   copy "C:\Users\YourName\Videos\my-video.mp4" landing-video.mp4
   ```

   **Example:**
   ```powershell
   copy "C:\Users\Priyadarshan L G\Downloads\promo-video.mp4" landing-video.mp4
   ```

### Method 3: Drag and Drop

1. **Open the public folder** in File Explorer
   ```
   client/public/
   ```

2. **Open another File Explorer window** with your video file

3. **Drag and drop** your video file into the `public` folder

4. **Rename** it to `landing-video.mp4`

---

## File Requirements

### Video Format
- ✅ **MP4** (recommended - best compatibility)
- ✅ **WebM** (alternative)
- ❌ AVI, MOV, MKV (not recommended)

### Video Specifications (Recommended)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio**: 16:9 (widescreen)
- **Duration**: 30-90 seconds
- **File Size**: Under 10MB (compress if larger)
- **Codec**: H.264 (for MP4)

---

## Step-by-Step Instructions

### Step 1: Prepare Your Video
- Make sure your video is in MP4 format
- If not, convert it using online tools or video software

### Step 2: Locate Your Video File
- Find where your video file is saved
- Note the full path (e.g., `C:\Users\YourName\Videos\video.mp4`)

### Step 3: Navigate to Public Folder
**Full Path:**
```
C:\Users\Priyadarshan L G\OneDrive\Desktop\Vechicle rental Project\client\public
```

**Quick Access:**
1. Open File Explorer
2. Go to: `OneDrive\Desktop\Vechicle rental Project\client\public`

### Step 4: Copy Video File
- Copy your video file (Ctrl+C or Right-click → Copy)

### Step 5: Paste in Public Folder
- Go to `client/public` folder
- Paste the file (Ctrl+V or Right-click → Paste)

### Step 6: Rename File
- Right-click the video file
- Select "Rename"
- Change name to: `landing-video.mp4`
- Press Enter

### Step 7: Verify File Location
The file should be at:
```
client/
  └── public/
      ├── index.html
      └── landing-video.mp4  ← Your video here
```

### Step 8: Refresh Browser
- Open your website: `http://localhost:3000`
- Refresh the page (F5 or Ctrl+R)
- The video should appear in the video section

---

## Troubleshooting

### Problem: Can't paste file into public folder

**Solution 1: Check Permissions**
- Right-click `public` folder → Properties → Security
- Make sure you have "Write" permissions

**Solution 2: Run as Administrator**
- Right-click File Explorer → Run as administrator
- Then try pasting again

**Solution 3: Use Command Line**
```powershell
# Open PowerShell as Administrator
cd "C:\Users\Priyadarshan L G\OneDrive\Desktop\Vechicle rental Project\client\public"
copy "YOUR_VIDEO_PATH" landing-video.mp4
```

### Problem: File not showing in public folder

**Solution:**
- Make sure you're in the correct folder: `client/public/`
- Check if file was renamed correctly: `landing-video.mp4`
- Refresh File Explorer (F5)

### Problem: Video not playing on website

**Solution 1: Check file name**
- Must be exactly: `landing-video.mp4` (lowercase)
- No spaces or special characters

**Solution 2: Check file format**
- Must be MP4 format
- Use H.264 codec

**Solution 3: Clear browser cache**
- Press Ctrl+Shift+R (hard refresh)
- Or clear browser cache

**Solution 4: Check browser console**
- Press F12 → Console tab
- Look for error messages

---

## Alternative: Use YouTube/Vimeo

If you can't upload the file, you can use YouTube or Vimeo:

1. Upload your video to YouTube or Vimeo
2. Get the video ID or embed URL
3. I can help you update the code to use YouTube/Vimeo instead

---

## Quick Checklist

- [ ] Video file is in MP4 format
- [ ] File is copied to `client/public/` folder
- [ ] File is renamed to `landing-video.mp4`
- [ ] File exists in: `client/public/landing-video.mp4`
- [ ] Browser is refreshed
- [ ] Video appears on landing page

---

## Need Help?

If you're still having trouble:
1. Check the exact error message
2. Verify file location
3. Try using Command Line method
4. Make sure file format is MP4

**The video will automatically appear once you place `landing-video.mp4` in the `client/public/` folder!**



