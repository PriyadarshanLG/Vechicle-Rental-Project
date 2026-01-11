# 📹 Video Upload Guide for Landing Page

## How to Add Your Video to the Landing Page

### Step 1: Prepare Your Video

**Recommended Video Specifications:**
- **Format**: MP4 (preferred) or WebM
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio**: 16:9 (widescreen)
- **Duration**: 30-90 seconds (recommended)
- **File Size**: Keep under 10MB for faster loading (compress if needed)
- **Content**: Showcase your vehicles, booking process, or brand story

### Step 2: Upload Video to Project

**Option A: Using File Explorer**
1. Navigate to: `client/public/` folder
2. Copy your video file
3. Rename it to: `landing-video.mp4`
4. Paste it in the `client/public/` folder

**Option B: Using Command Line**
```powershell
# Navigate to client/public folder
cd "C:\Users\Priyadarshan L G\OneDrive\Desktop\Vechicle rental Project\client\public"

# Copy your video file here and rename it
# Example: copy "C:\Users\YourName\Videos\my-video.mp4" landing-video.mp4
```

### Step 3: Video File Location

Your video should be located at:
```
client/
  └── public/
      └── landing-video.mp4  ← Your video file here
```

### Step 4: Optional - Add Video Poster Image

A poster image shows before the video plays. To add one:

1. Create or find a thumbnail image (1920x1080 recommended)
2. Save it as: `client/public/video-poster.jpg`
3. The video will show this image before playing

### Step 5: Test the Video

1. Make sure your frontend server is running:
   ```powershell
   cd client
   npm start
   ```

2. Open browser: `http://localhost:3000`
3. Scroll to the video section
4. The video should appear and be playable

---

## Video Optimization Tips

### Compress Video (Reduce File Size)

**Using Online Tools:**
- [CloudConvert](https://cloudconvert.com/mp4-compressor)
- [FreeConvert](https://www.freeconvert.com/video-compressor)
- [HandBrake](https://handbrake.fr/) (Desktop app)

**Recommended Settings:**
- Resolution: 1280x720 (HD) or 1920x1080 (Full HD)
- Bitrate: 2-5 Mbps
- Frame Rate: 30 fps
- Codec: H.264

### Video Content Ideas

1. **Showcase Vehicles**: Show different cars and bikes available
2. **Booking Process**: Demonstrate how easy it is to book
3. **Customer Testimonials**: Feature happy customers
4. **Brand Story**: Tell your company's story
5. **Service Highlights**: Show key features and benefits

---

## Alternative: Use YouTube/Vimeo Video

If you prefer to host video externally:

### Update Landing.js

Replace the video section with:

```jsx
{/* Video Section - YouTube/Vimeo */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        See Us in <span className="text-primary-600">Action</span>
      </h2>
    </div>

    <div className="max-w-5xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="VehicleRent Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
</section>
```

Replace `YOUR_VIDEO_ID` with your YouTube video ID.

---

## Troubleshooting

### Video Not Showing?

1. **Check file path**: Make sure video is in `client/public/` folder
2. **Check file name**: Must be exactly `landing-video.mp4`
3. **Check browser console**: Open DevTools (F12) → Console tab for errors
4. **Clear cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Video Not Playing?

1. **Check video format**: Use MP4 (H.264 codec)
2. **Check file size**: Large files may take time to load
3. **Check browser support**: Try different browser
4. **Check video codec**: Use H.264 codec for best compatibility

### Video Loading Slowly?

1. **Compress video**: Reduce file size
2. **Use CDN**: Host video on external service (YouTube, Vimeo, Cloudinary)
3. **Optimize format**: Use WebM for smaller file size (with MP4 fallback)

---

## Current Video Configuration

The video player is configured with:
- ✅ Auto-play (muted)
- ✅ Loop playback
- ✅ Controls enabled
- ✅ Responsive design
- ✅ Fallback for unsupported browsers

---

## Quick Start

1. **Get your video file** (MP4 format)
2. **Rename it** to `landing-video.mp4`
3. **Copy to** `client/public/` folder
4. **Refresh browser** - Video should appear!

---

**Need help? Check the browser console (F12) for any error messages!**



