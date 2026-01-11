# 🎥 Easy Video Setup - Step by Step

## Method 1: Using VS Code (Your Current IDE)

### Step 1: Right-Click in Public Folder
1. In VS Code, find the `public` folder in the left sidebar
2. **Right-click** on the `public` folder
3. Select **"Reveal in File Explorer"** or **"Open in File Explorer"**

### Step 2: Add Video File
1. File Explorer will open showing the `public` folder
2. **Copy your video file** from wherever it is
3. **Paste it** into this File Explorer window
4. **Rename it** to: `landing-video.mp4`

### Step 3: Configure Video
1. Go back to VS Code
2. Open: `client/src/config/videoConfig.js`
3. Set:
   ```javascript
   useLocalFile: true,
   ```
4. Save the file
5. Refresh your browser

---

## Method 2: Drag and Drop in VS Code

### Step 1: Open Public Folder
1. In VS Code, click on the `public` folder to expand it
2. You should see `index.html` inside

### Step 2: Drag Video File
1. Open File Explorer (Windows + E)
2. Find your video file
3. **Drag and drop** it directly into the `public` folder in VS Code's file explorer
4. VS Code will ask to confirm - click **"Yes"**

### Step 3: Rename File
1. Right-click the video file in VS Code
2. Select **"Rename"**
3. Change name to: `landing-video.mp4`

---

## Method 3: Use YouTube/Vimeo (EASIEST - No File Upload!)

### Why This is Better:
- ✅ No file upload needed
- ✅ No file size limits
- ✅ Faster loading
- ✅ Works immediately

### Step 1: Upload to YouTube
1. Go to [YouTube.com](https://www.youtube.com)
2. Click **"Create"** → **"Upload video"**
3. Upload your video
4. Wait for it to process

### Step 2: Get Video ID
1. Once uploaded, copy the video URL
   - Example: `https://www.youtube.com/watch?v=abc123xyz`
2. The **Video ID** is: `abc123xyz` (the part after `v=`)

### Step 3: Configure in VS Code
1. In VS Code, open: `client/src/config/videoConfig.js`
2. Find this line:
   ```javascript
   youtubeVideoId: '', // Example: 'dQw4w9WgXcQ'
   ```
3. Replace with your video ID:
   ```javascript
   youtubeVideoId: 'abc123xyz', // Your video ID here
   ```
4. **Save the file** (Ctrl+S)
5. **Refresh your browser** - Video will appear!

---

## Method 4: Using Command Line (PowerShell)

### Step 1: Open PowerShell
1. In VS Code, press **Ctrl + `** (backtick) to open terminal
2. Or go to: **Terminal** → **New Terminal**

### Step 2: Navigate to Public Folder
```powershell
cd client/public
```

### Step 3: Copy Your Video
```powershell
# Replace SOURCE with your video file path
copy "C:\Users\YourName\Videos\my-video.mp4" landing-video.mp4
```

**Example:**
```powershell
copy "C:\Users\Priyadarshan L G\Downloads\promo.mp4" landing-video.mp4
```

### Step 4: Verify File
```powershell
dir
```
You should see `landing-video.mp4` in the list

---

## Method 5: Direct File Path

### Step 1: Find Your Video File
- Note the full path to your video file
- Example: `C:\Users\YourName\Videos\video.mp4`

### Step 2: Use Direct URL in Config
1. Upload your video to:
   - Google Drive (make it shareable)
   - Dropbox (get direct link)
   - Your own server
   - Any cloud storage

2. Get the direct download URL

3. In VS Code, open: `client/src/config/videoConfig.js`

4. Set:
   ```javascript
   videoUrl: 'https://your-video-url.com/video.mp4',
   ```

5. Save and refresh

---

## Quick Comparison

| Method | Difficulty | File Upload | Best For |
|--------|-----------|-------------|----------|
| YouTube | ⭐ Easy | ❌ No | Most users |
| Vimeo | ⭐ Easy | ❌ No | Professional videos |
| VS Code Drag & Drop | ⭐⭐ Medium | ✅ Yes | Local files |
| File Explorer | ⭐⭐ Medium | ✅ Yes | Local files |
| Direct URL | ⭐⭐ Medium | ❌ No | Cloud storage |

---

## Recommended: Use YouTube (Easiest!)

1. **Upload to YouTube** (free, unlimited)
2. **Get Video ID** from URL
3. **Edit** `client/src/config/videoConfig.js`
4. **Add Video ID** - Done!

**No file upload needed!** 🎉

---

## Troubleshooting

### Can't drag and drop in VS Code?
- Try Method 1: Right-click → Reveal in File Explorer
- Then paste the file there

### File not showing?
- Make sure you're in the `public` folder
- Check file name is exactly: `landing-video.mp4`
- Refresh VS Code file explorer (click refresh icon)

### Video not playing?
- Check `videoConfig.js` - make sure `useLocalFile: true` is set
- Refresh browser (Ctrl+Shift+R for hard refresh)

---

## Current File Location

Your video should be here:
```
client/
  └── public/
      ├── index.html
      └── landing-video.mp4  ← Your video here
```

---

**Easiest Option: Use YouTube! No file upload needed!** 🚀



