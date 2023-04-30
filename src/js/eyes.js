let eyes = document.querySelectorAll(".services__eye");

body.addEventListener('mousemove', e => {
    
    eyes.forEach(function(eye){
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;  //  getBoundingClientRect() - позиція відносно (0; 0)
        let y = eye.getBoundingClientRect().top + window.pageYOffset  + eye.clientHeight / 2;  // .clientWidth равно 0 для инлайн элементов и элементов без CSS
        let radian = Math.atan2(e.pageX - x, e.pageY - y);  // повертає кут в радіанах від осі X (від верхньої лінії сторінки) до точки з координатами (x, y). Точки ніби "переносяться" так, щоб Око -> (0; 0) - лівий верхній кут всієї сторінки (а не тільки видимої частини екрану), а Курсор -> (x, y) - результат віднімання позиції Ока від позиції курсора
        // radian to deg: 1 рад × 180/π = 57,296°
        let deg = (radian * (180 / Math.PI) * -1) -90;  // * -1 - щоб крутилось в правильний бік; -90 щоб вирівняти кут, бо відстає на 90 градусів
        eye.style.transform = "rotate(" + deg + "deg)";
    })

})