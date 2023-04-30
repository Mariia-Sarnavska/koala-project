let toTopButton = document.querySelector('.footer__top-arrow a');

toTopButton.addEventListener("click", function(e){
    e.preventDefault();
    scroll({ top: 0, behavior: 'smooth' });
})

