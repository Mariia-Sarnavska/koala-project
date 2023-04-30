let mainScreen = document.querySelector("section.main-screen"),
    mainImg = mainScreen.querySelector(".main-screen__image"),
    header = document.querySelector("header");

function mainImgMove(section) {
    section.addEventListener('mousemove', e => {
        mainImg.style.setProperty("--radius", 150 + "px");
        mainImg.style.setProperty("--posY", e.pageY + "px");
        mainImg.style.setProperty("--posX", e.pageX + "px");
    })
}

mainImgMove(mainScreen);
mainImgMove(header);

body.addEventListener('mouseout', e => {
    mainImg.style.setProperty("--radius", 0);
})