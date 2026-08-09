            let slideIndex = 0;
            showSlides()
            function showSlides(){
                let slides = document.getElementsByClassName("mySlides");
                //safety check
                if(slides.length === 0) return;
                for (let i=0; i<slides.length; i++) {
                    slides[i].classList.remove("active");                
                }
                slideIndex++;
                // Reset to first slide if at the end
                if (slideIndex> slides.length) {slideIndex = 1; }
                //Add the active class to the current slide to fade it in
                slides[slideIndex -1].classList.add("active");
                // Change Image every 400 milliseconds
                setTimeout(showSlides, 5000)
                }