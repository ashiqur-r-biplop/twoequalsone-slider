const sliderContent = document.querySelector(".slider-content");
const slides = document.querySelectorAll(".slide-card");
const dots = document.querySelectorAll(".slider-dot");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const sliderContainer = document.querySelector(".slider-container");

const totalSlides = slides.length;
let slideWidth = slides[0].offsetWidth;
let currentSlideIndex = 0;
let isAnimating = false; // Flag to prevent rapid multiple clicks
let autoSlideInterval; // Variable to store the auto-slide interval

function updateSlideWidth() {
  slideWidth = slides[0].offsetWidth;
}

function updateActiveDot(index) {
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function updateButtonColors(index) {
  if (index === 0) {
    prevButton.style.backgroundColor = "#222020";
  } else {
    prevButton.style.backgroundColor = "#ffd90095";
  }

  if (index >= totalSlides - 3) {
    nextButton.style.backgroundColor = "#222020";
  } else {
    nextButton.style.backgroundColor = "#ffd90095";
  }
}

function goToSlide(index) {
  if (isAnimating) return;
  isAnimating = true;

  if (index >= totalSlides - 3) {
    currentSlideIndex = totalSlides - 3;
  } else if (index < 0) {
    currentSlideIndex = 0;
  } else {
    currentSlideIndex = index;
  }

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    sliderContent.style.transform = `translateX(-${currentSlideIndex * 375}px)`;
  } else {
    sliderContent.style.transform = `translateX(-${currentSlideIndex * 390}px)`;
  }

  sliderContent.style.transition = "transform 0.5s ease-in-out";
  updateActiveDot(currentSlideIndex);
  updateButtonColors(currentSlideIndex);

  setTimeout(() => {
    isAnimating = false;
  }, 500);
}

function slideLeft() {
  goToSlide(currentSlideIndex - 1);
}

function slideRight() {
  goToSlide(currentSlideIndex + 1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    // Slide right
    slideRight();

    // Check if the current slide is the last one
    if (currentSlideIndex === totalSlides - 3) {
      // Pause the auto-slide for 3 seconds and reset to the first slide
      clearInterval(autoSlideInterval);
      setTimeout(() => {
        goToSlide(0);
        startAutoSlide(); // Restart the auto-slide
      }, 3000); // Wait for 3 seconds before resetting to the first slide
    }
  }, 3000); // Slide every 3 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

document.querySelector(".prev").addEventListener("click", slideLeft);
document.querySelector(".next").addEventListener("click", slideRight);

dots.forEach((dot) => {
  dot.addEventListener("click", function () {
    goToSlide(parseInt(this.getAttribute("data-index")));
  });
});

window.addEventListener("resize", () => {
  updateSlideWidth();
  goToSlide(currentSlideIndex);
});

// Start auto-slide
startAutoSlide();

// Stop auto-slide on hover and restart on mouse leave
sliderContainer.addEventListener("mouseover", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

updateSlideWidth();
updateButtonColors(currentSlideIndex); // Initialize button colors
