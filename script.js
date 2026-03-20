document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("scroll-video");
    const section = document.querySelector(".video-scroll-section");
    const videoText = document.getElementById("video-text");

    // Lytter etter scroll-hendelser
    window.addEventListener("scroll", () => {
        // Sikrer at videoen har lastet inn metadata
        if (isNaN(video.duration)) return;

        const rect = section.getBoundingClientRect();
        const scrollPosition = -rect.top;
        const scrollableDistance = rect.height - window.innerHeight;

        // Sjekk om vi befinner oss inne i seksjonen
        if (scrollPosition >= 0 && scrollPosition <= scrollableDistance) {
            const scrollFraction = scrollPosition / scrollableDistance;
            
            // Oppdater videoens tid
            window.requestAnimationFrame(() => {
                video.currentTime = video.duration * scrollFraction;
            });

            // Teksten fader inn når man har scrollet ned mer enn 5%
            if (scrollFraction > 0.05) {
                videoText.classList.add("fade-in");
            } else {
                videoText.classList.remove("fade-in");
            }

        } 
        // Lås til start hvis vi er ovenfor seksjonen
        else if (scrollPosition < 0) {
            video.currentTime = 0;
            videoText.classList.remove("fade-in");
        } 
        // Lås til slutt hvis vi er forbi seksjonen
        else if (scrollPosition > scrollableDistance) {
            video.currentTime = video.duration;
            videoText.classList.add("fade-in");
        }
    });
});