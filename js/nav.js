// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
var webcover = document.querySelector(".website-cover");
// On click
hamburger.addEventListener("click", function() {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  // Do something else, like open/close menu
  $(".burger-menu").toggleClass("visible");
  $(".website-container", ).toggleClass("transitioned");
  $(".website-cover").toggle();
});


webcover.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
  $(".burger-menu").toggleClass("visible");
  $(".website-container").toggleClass("transitioned");
  $(".website-cover").toggle();
})