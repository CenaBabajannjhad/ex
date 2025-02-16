
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".logos-swiper", {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
      delay: 0,
      pauseOnMouseEnter: true,
      disableOnInteraction: true,
    },
    speed: 2500,
    breakpoints: {
      768: {
        slidesPerView: 6,
      },
      1280: {
        slidesPerView: 8,
      },
    },
  });
});
