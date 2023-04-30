let menuBurger = document.querySelector(".navigation__burger-menu a");
let mobileMenu = document.querySelector(".navigation__menu");

menuBurger.addEventListener("click", function() {
    if (this.classList.contains("open")) {
        this.classList.remove("open");
        mobileMenu.classList.remove("open");
        body.style.overflowY = "inherit";
    } else {
        this.classList.add("open");
        mobileMenu.classList.add("open");
        body.style.overflowY = "hidden";
    }
})