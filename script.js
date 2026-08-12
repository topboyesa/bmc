// Run the script after the HTML document fully loads
document.addEventListener("DOMContentLoaded", () => {
    // Find all slideshow containers on the page
    const containers = document.querySelectorAll(".slideshow-container");

    // Initialize each slideshow independently
    containers.forEach((container) => {
        let slideIndex = 0;
        const slides = container.querySelectorAll(".mySlides");

        // If a container has no slides, skip it safely
        if (slides.length === 0) return;

        function runSlideshow() {
            // Remove 'active' class only from slides inside THIS container
            slides.forEach(slide => slide.classList.remove("active"));

            // Advance to the next slide
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }

            // Show the current slide inside this container
            slides[slideIndex - 1].classList.add("active");

            // Repeat every 5 seconds for this specific slideshow
            setTimeout(runSlideshow, 5000);
        }

        // Start this specific slideshow
        runSlideshow();
    });
});