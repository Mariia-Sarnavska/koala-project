const cursor = document.querySelector("#cursor"),
      links = document.querySelectorAll("a"),
      buttons = document.querySelectorAll("input[type='submit']");


body.addEventListener('mousemove', e => {
    cursor.style.display = "block";
    cursor.classList.remove("hidden");
    cursor.style.top = e.pageY + "px";  // текущие координаты курсора
    cursor.style.left = e.pageX + "px";
})

body.addEventListener('mouseout', e => {
    cursor.classList.add("hidden");
})

function mouseHover(elements) {
    for(let i = 0; i < elements.length; i ++) {
        elements[i].addEventListener('mouseover', e => {
            cursor.classList.add("active");

            if(elements[i].classList.contains('services__link')) {
                cursor.classList.add("find-out");
            }
        })
    
        elements[i].addEventListener('mouseout', e => {
            cursor.classList.remove("active");
            cursor.classList.remove("find-out");
        })
    }
}

mouseHover(links);
mouseHover(buttons);


// прибирати курсор, якщо він виходить за межі сторінки (при зменшенні екрану)
function debounce(func, timeout = 0){
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const resizeFunction = debounce(function() {

    let cursorPos = Number(cursor.style.left.replace("px", ""));

    if((cursorPos + 100) > body.clientWidth) {
        cursor.style.display = "none";
        cursor.style.left = "50px";
    }

}, 0);
  
window.addEventListener('resize', resizeFunction);
