var introductionModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop"),
  {
    keyboard: false,
  }
);
window.addEventListener("load", function () {
  var display = sessionStorage.getItem("display");
  if (display == null) {
    this.document.getElementById("modalContent").style.background =
      linearGradients[0];
    introductionModal.show();
    sessionStorage.setItem("display", "false");
  }
});

var myCarousel = document.querySelector("#introductionCarousel");
var carousel = new bootstrap.Carousel(myCarousel);
var carouselLenth =
  document.getElementsByClassName("introduction-modal").length;
var index = 0;
var linearGradients = [
  "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
];

function nextSlider() {
  if (index < carouselLenth - 1) {
    carousel.next();
    index++;
    document.getElementById("modalContent").style.background =
      linearGradients[index];
  } else {
    introductionModal.hide();
  }
}