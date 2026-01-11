// Video configuration for landing page
// You can use either a local file or a video URL (YouTube/Vimeo)

export const videoConfig = {
  // Option 1: Use YouTube Video (Recommended - No file upload needed!)
  // Just paste your YouTube video ID here
  youtubeVideoId: '', // Example: 'dQw4w9WgXcQ'
  
  // Option 2: Use Vimeo Video
  // Just paste your Vimeo video ID here
  vimeoVideoId: '', // Example: '123456789'
  
  // Option 3: Use direct video URL (hosted elsewhere)
  videoUrl: '', // Example: 'https://example.com/video.mp4'
  
  // Option 4: Use local file (must be in public folder)
  useLocalFile: true, // Set to true if using local file
  localFileName: '5309353-hd_1920_1080_25fps.mp4', // Name of file in public folder
  
  // Video settings
  autoplay: true,
  loop: true,
  muted: true,
  showControls: true
};

// Instructions:
// 1. For YouTube: Get video ID from URL (youtube.com/watch?v=VIDEO_ID)
//    Paste VIDEO_ID in youtubeVideoId above
// 2. For Vimeo: Get video ID from URL (vimeo.com/VIDEO_ID)
//    Paste VIDEO_ID in vimeoVideoId above
// 3. For direct URL: Paste full video URL in videoUrl above
// 4. For local file: Set useLocalFile to true and place file in public folder

