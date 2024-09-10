let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    // Update slide
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
    // Update buttons
    let prev = document.getElementsByClassName("prev")[0]
    let next = document.getElementsByClassName("next")[0]
    prev.style.display = "block";
    next.style.display = "block";
    if (slideIndex === 1) {
        prev.style.display = "none";
    }
    if (slideIndex === slides.length) {
        next.style.display = "none";
    }
}