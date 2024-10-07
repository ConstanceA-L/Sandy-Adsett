// This file handles the image slider on the index page

const slides = document.querySelectorAll('.slide');
const pagination = document.querySelector('.pagination');
let currentSlide = 0;

// This displys/hides the image slides and updates the markers based on which silde is displayed
function showSlide(index){
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });

    updatePagination(index);
}

// this function updates the markers depending on the index provided
function updatePagination(index){
    pagination.innerHTML = '';

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = i === index ? 'dot active' : 'dot'
        dot.addEventListener('click', () => showSlide(i));
        pagination.appendChild(dot);
    });
}

// this moves the slide to the next image 
function nextSlide(){
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// this sets the images to change automatically after an interval
setInterval(nextSlide, 7000);

// this displays first slide
showSlide(currentSlide);