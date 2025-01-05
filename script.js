
//  Initialize Swiper

  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      autoplayTimeLeft(s, time, progress) {
        progressCircle.style.setProperty("--progress", 1 - progress);
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      }
    }
  });





// js for about 
// Set the target values for each counter
const targetValues = {
    rooms: 2234,
    clients: 2234,
    staffs: 2234
  };

  // Set the animation duration (in milliseconds)
  const animationDuration = 2000;

  // Get the counter elements
  const counters = document.querySelectorAll('[id$="-counter"]');

  // Animate the counters
  counters.forEach((counter, index) => {
    const targetValue = targetValues[Object.keys(targetValues)[index]];
    let currentValue = 0;
    let increment = Math.ceil(targetValue / animationDuration * 10);

    const animateCounter = () => {
      currentValue += increment;
      counter.textContent = currentValue.toLocaleString();

      if (currentValue < targetValue) {
        setTimeout(animateCounter, 10);
      } else {
        counter.textContent = targetValue.toLocaleString();
      }
    };

    animateCounter();
  });


// js for counter
document.addEventListener("DOMContentLoaded", ()=>{
function counter(id,start,end,duration){
  let obj=document.getElementById(id),
  current= start,
  range=end-start,
  increment=end>start?1: -1,
  step= Math.abs(Math.floor(duration/range)),
  timer=setInterval(()=>{
    current+=increment;
    obj.textContent=current;
    if(current==end){
      clearInterval(timer);
    }
  },step);
}
counter("count1", 0, 2287, 3000);
counter("count2", 100, 5786, 2500);
counter("count3", 0, 4456, 3000);
counter("count4", 0, 7873, 3000);

})



