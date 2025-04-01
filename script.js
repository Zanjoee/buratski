/* Clean implementation of the prank functionality */

// Toggle video mute state
function toggleMute() { 
    var video = document.getElementById('video'); 
    video.muted = !video.muted;
} 

// Create a delay function for timed events
function delay(time) { 
    return new Promise((resolve) => setTimeout(resolve, time)); 
} 

// Show the jumpscare video and handle fullscreen
function showVideo() { 
    // Get DOM elements
    var videoElement = document.getElementById('video'); 
    var containerElement = document.getElementById('container'); 
    var videoContainerElement = document.getElementById('container-video');
    
    // Show video, hide security check
    videoElement.style.display = 'block'; 
    containerElement.style.display = 'none'; 
    
    // Unmute video after a slight delay to ensure user interaction registered
    delay(100).then(() => {
        toggleMute();
        
        // Try to enable fullscreen for a more immersive experience
        if (videoContainerElement.requestFullscreen) { 
            videoContainerElement.requestFullscreen(); 
        } else if (videoContainerElement.mozRequestFullScreen) { 
            videoContainerElement.mozRequestFullScreen(); 
        } else if (videoContainerElement.webkitRequestFullscreen) {
            videoContainerElement.webkitRequestFullscreen(); 
        } else if (videoContainerElement.msRequestFullscreen) { 
            videoContainerElement.msRequestFullscreen(); 
        }
    });
} 

// Handle fullscreen changes
document.addEventListener('fullscreenchange', () => { 
    // Keep the video visible whether in fullscreen or not
    var videoContainerElement = document.getElementById('container-video');
    videoContainerElement.style.display = 'block'; 
}); 

// Initialize countdown and show reCAPTCHA
document.addEventListener("DOMContentLoaded", function () { 
    const counterElement = document.getElementById("counter"); 
    const recaptchaElement = document.getElementById("recaptcha-container"); 
    const captchaTextElement = document.getElementById("text-captcha"); 
 
    let seconds = 10; 
 
    function updateCounter() { 
        if (seconds > 0) {
            counterElement.textContent = "Please allow up to " + seconds + " seconds..."; 
            seconds--; 
        } else {
            // Time's up, show the reCAPTCHA
            clearInterval(interval); 
            counterElement.style.display = "none"; 
            recaptchaElement.style.display = "flex"; 
            captchaTextElement.style.display = "block";
        }
    } 
 
    // Start the countdown
    updateCounter(); 
    const interval = setInterval(updateCounter, 1000); 
});
