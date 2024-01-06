let images = [...document.querySelectorAll(".img")];

let slider = document.querySelector(".slider");
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = 0.05;

images.forEach((img, idx) => {
  img.style.backgroundImage = `url(./${idx + 1}.jpg)`;
});

function lerp(s, e, t) {
  return s * (1 - t) + e * t;
}

function setTransform(elem, transform) {
  elem.style.transform = transform;
}

function init() {
  sliderWidth = slider.getBoundingClientRect().width;
  imageWidth = sliderWidth / images.length;

  document.body.style.height = `${sliderWidth - window.innerWidth / 2}px`;
}

function annimate() {
  current = parseFloat(lerp(current, target, ease)).toFixed(2);
  target = window.scrollY;
  setTransform(slider, `translateX(-${current}px)`);
  annimateImages();
  requestAnimationFrame(annimate);
}

function annimateImages() {
  let ratio = current / imageWidth;
  let intersectionRatio;

  images.forEach((image, idx) => {
    intersectionRatio = ratio - idx * 0.7;
    setTransform(image, `translateX(${intersectionRatio * 70}px)`);
  });
}
init();
annimate();
