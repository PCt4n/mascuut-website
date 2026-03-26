document.addEventListener("DOMContentLoaded", () => {
    
    const setupVideoScroll = (sectionSelector, videoId, textId) => {
        const section = document.querySelector(sectionSelector);
        const video = document.getElementById(videoId);
        const videoText = textId ? document.getElementById(textId) : null;

        if (!section || !video) return;

        window.addEventListener("scroll", () => {
            if (isNaN(video.duration)) return;

            const rect = section.getBoundingClientRect();
            const scrollPosition = -rect.top;
            const scrollableDistance = rect.height - window.innerHeight;

            if (scrollPosition >= 0 && scrollPosition <= scrollableDistance) {
                const scrollFraction = scrollPosition / scrollableDistance;
                
                window.requestAnimationFrame(() => {
                    video.currentTime = video.duration * scrollFraction;
                });

                if (videoText) {
                    scrollFraction > 0.05 ? videoText.classList.add("fade-in") : videoText.classList.remove("fade-in");
                }
            } 
            else if (scrollPosition < 0) {
                video.currentTime = 0;
            } 
            else if (scrollPosition > scrollableDistance) {
                video.currentTime = video.duration;
            }
        });
    };

    // Aktiver for den første videoen
    setupVideoScroll(".video-scroll-section:not(.narrow-video)", "scroll-video", "video-text");

    // Aktiver for den nye, smale videoen
    setupVideoScroll(".narrow-video", "scroll-video-2", null);
});