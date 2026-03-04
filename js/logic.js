document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll(".testimonial");
    let index = 0;

    function showSlide(i) {
        testimonials.forEach(t => t.classList.remove("active"));
        testimonials[i].classList.add("active");
    }

    showSlide(index);

    setInterval(() => {
        index = (index + 1) % testimonials.length;
        showSlide(index);
    }, 4000); // alle 4 Sekunden wechseln
});
