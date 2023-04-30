let prevScrollPosition = window.scrollY;

window.addEventListener('scroll', function(e) {
    let currentScrollPosition = window.scrollY;
    
    let mainScreenDecorLine = document.querySelector('.main-screen__decor-line');

    if(currentScrollPosition > prevScrollPosition) {
        mainScreenDecorLine.style.transform = "translateY(100%)";
    } else {
        mainScreenDecorLine.style.transform = "unset";
    }

    prevScrollPosition = currentScrollPosition;

    let clientsImg = document.querySelector('section.clients img');
    let clientImagePosition = clientsImg.getBoundingClientRect();

    if(clientImagePosition.top <= innerHeight && clientImagePosition.top >= -clientImagePosition.height) {
        let imgOverflow = clientImagePosition.width - innerWidth;  // вызначення ширини прихованої частини картинки
        let totalVisibleHeight = innerHeight + clientImagePosition.height;  // висота вікна + висота картинки = повна видима зона картинки, за яку необхідно прокрутити всю прихованю частину картинки
        let scrollAmount = currentScrollPosition - (clientImagePosition.top + window.pageYOffset - innerHeight);  // величина прокрутки (на скільки пікселів прокручується сторінка при скролі відносно верху видимої зони картинки)

        clientsImg.style.transform = "translateX(-" + (imgOverflow / totalVisibleHeight * scrollAmount) + "px)";
    }
    
});
