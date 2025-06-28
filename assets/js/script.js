const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indicator");

const updateIndicator = (tab, index) => {
    sliderIndicator.style.transform = `translateX(${tab.offsetLeft - 20}px)`;
    sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;
}

const swiper = new Swiper(".slider-container", {
    effect:"fade",
    speed: 1300,
    // autoplay: { delay: 4000}
    on: {
        sideChange: () => {
            const currentTabIndex = [...sliderTabs].indexOf(sliderTabs[swiper.activeIndex]);
            updateIndicator(sliderTabs[swiper.activeIndex], currentTabIndex);
        }
    }
});

sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      swiper.slideTo(index);
        updateIndicator(tab, index);
    });
});

updateIndicator(sliderTabs[0], 0);
window.addEventListener("resize", () => updateIndicator (sliderTabs[swiper.activeIndex], 0));

document.addEventListener("DOMContentLoaded", () => {
    const lenis = new Lenis({
        duration: 1.2, // duration of the scroll animation
        smoothWheel: true, // smooth scrolling for the wheel
        smoothTouch: true, // smooth scrolling for touch
        direction: 'vertical', // scrolling direction (vertical or horizontal)
    });

    // Loop to update the Lenis scroll
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
});

function openGoogleMaps() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Ganti koordinat tujuan dengan lokasi restoranmu
            const destinationLat = -6.9174639;
            const destinationLng = 107.6191228;

            const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
            window.open(mapsUrl, '_blank');
        }, function (error) {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}


