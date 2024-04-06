new Swiper('.gpt__slider',{
    navigation: {
        nextEl: '.gpt__rigth',
        prevEl: '.gpt__left',
    },
    //  slidesPerView:5,
    //  loop:true,
    //  spaceBetween:20,
     parallax:true,
     speed:500,
    //  centeredSlides: true,   
     
    scrollbar: {
        el: '.swiper-scrollbar',
     },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        type: 'bullets',
    }, 
    // autoplay: {
    //     delay: 100,

    // }, 

    breakpoints: {
        320: {
            slidesPerView:1,
            
        },
        480: {
            slidesPerView:1,
            
        },
        768: {
            slidesPerView:1,
        },
        992: {
            slidesPerView:1,
            allowTouchMove:true,
        },
        993: {
            slidesPerView:1,
            allowTouchMove:false,
        }
        

        
       

    },

});
new Swiper('.favorite__slider',{
    navigation: {
        nextEl: '.favorite__right',
        prevEl: '.favorite__left',
    },
    //  loop:true,
     spaceBetween:20,
     speed:300,    

    breakpoints: {
        320: {
            slidesPerView:1,
            
        },
        480: {
            slidesPerView:1,
            
        },
        768: {
            slidesPerView:1,
        },
        992: {
            slidesPerView:3,
        }

    },

});

//===slider===

const sliderBtn = document.querySelector('.gpt__rigth');
const sliderBtnLeft = document.querySelector('.gpt__left');
const sliderItem = document.querySelectorAll('.gpt__item');
let currentIndex = 0;
if(sliderBtn) {
    
function hideClass () {
    sliderItem.forEach(item =>{
        item.classList.remove('active');
    })
}
function showNext() {
    // Сначала скрываем все элементы
    hideClass();
    // Увеличиваем индекс на 1 и проверяем, не вышли ли за границы массива
    currentIndex = (currentIndex + 1) % sliderItem.length;
    // Показываем элемент с новым индексом
    sliderItem[currentIndex].classList.add('active');
}
function showPrev() {
    // Сначала скрываем все элементы
    hideClass();
    // Уменьшаем индекс на 1 и проверяем, не вышли ли за границы массива
    currentIndex = (currentIndex - 1 + sliderItem.length) % sliderItem.length;
    // Показываем элемент с новым индексом
    sliderItem[currentIndex].classList.add('active');
}
hideClass ();

sliderItem[currentIndex].classList.add('active');
sliderBtn.addEventListener('click', showNext);
sliderBtnLeft.addEventListener('click', showPrev);
}

// =============================================================================================================//
// Бургер-меню
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.header__menu');
const body = document.querySelector('body');
const listHeader = document.querySelectorAll('.header__item');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        iconMenu.classList.toggle('active');   
        menuBody.classList.toggle('active');
        searchForm.classList.remove('active');
        body.classList.toggle('lock');
    });
}
if(listHeader){
    listHeader.forEach(item =>{
        item.addEventListener('click', (e)=>{
            iconMenu.classList.remove('active');   
            menuBody.classList.remove('active');
            searchForm.classList.remove('active');
            body.classList.remove('lock');
        })
    })
}

// =============================================================================================================//
const btnSearch = document.querySelector('.header__btn');
const searchForm = document.querySelector('.header__form');
btnSearch.addEventListener('click', () =>{
    searchForm.classList.toggle('active');
})


// =============================================================================================================//
const goTopBtn = document.querySelector(".scroll-btn");
if(goTopBtn) {
        // обработчик на скролл окна
window.addEventListener("scroll", trackScroll);
// обработчик на нажатии
goTopBtn.addEventListener("click", goTop);

function trackScroll() {
  // вычисляем положение от верхушки страницы
  const scrolled = window.pageYOffset;
  // считаем высоту окна браузера
  const coords = document.documentElement.clientHeight;
  // если вышли за пределы первого окна
  if (scrolled > coords) {
    // кнопка появляется
    goTopBtn.classList.add("show");
  } else {
    // иначе исчезает
    goTopBtn.classList.remove("show");
  }
  // Проверяем, достиг ли пользователь конца страницы
  if ((scrolled + coords) >= document.documentElement.scrollHeight - 500) {
    // Достигли конца страницы, скрываем кнопку "наверх"
    goTopBtn.classList.remove("show");
  }
}

function goTop() {
  // пока не вернулись в начало страницы
  if (window.pageYOffset > 0) {
    // скроллим наверх
    window.scrollBy(0, -75); 
    setTimeout(goTop, 10); 
  }
}
}


// popUp-cookies=============================================================================================================//

const popUpCookies = document.querySelector('.popUp-cookies');
const btnCookies = document.querySelector('.popUp-cookies__btn');

if (popUpCookies && btnCookies) {
    if(localStorage.getItem('check')){
        popUpCookies.style.display = "none"; 
    }

    btnCookies.addEventListener('click', () =>{
        popUpCookies.style.display = "none"; 
        localStorage.setItem('check',true);
    })
    
}

//=== валидация формы комментариев 
const formComment = document.getElementById('add-form');

if(formComment) {

function validate (form) {

    function removeError(input) {
        const parent = input.parentNode;
        if(parent.classList.contains('error')){
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }

    }

    function createError(input, text){
        const parent = input.parentNode;
        const labelError = document.createElement('label');

        labelError.classList.add('error-label');
        labelError.textContent = text;

        parent.classList.add('error');
        parent.append(labelError);
    }   


    let result = true;
    form.querySelectorAll('[data-in]').forEach(input =>{
        removeError(input);
        if(input.dataset.maxLenght){
            if(input.value.length > input.dataset.maxLenght) {
                removeError(input);
                console.log('Ошибка')
                createError(input,`Максимальное кол-во символов: ${input.dataset.maxLenght}`);
                result = false;
            }
        }

        if(input.value == ''){
            console.log('Ошибка')
            createError(input,'Заполните поля');
            result = false;
        }
    })
    return result
}
formComment.addEventListener('submit', function(e){
    e.preventDefault();
    if(validate(this) == true){
      formComment.reset();
        alert('Комментарий отправлен')
        console.log('Валидация успешна!')
    }
})

}

//==================превью файла загрузки 
const btnPrevie = document.querySelector('[data-clickFile]');
const blockPrevie = document.getElementById('BlockPrevie');

btnPrevie.addEventListener('change', ()=>{
    uploadFile(btnPrevie.files[0]);
})

function uploadFile(file) {
    if(!['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/gif'].includes(file.type)){
        alert('Разрешены только изображения.');
        return
    }
    if(file.size > 2 * 1024 * 1024){
        alert('Изображение должно быть меньше 2 Мб.');
        return
    }

    let reader = new FileReader();
    reader.onload = function(e) {
        blockPrevie.innerHTML = `<img src= "${e.target.result}" alt = "Фото">`;
    };
    reader.onerror = function(e) {
        alert('Ошибка');
    }
    reader.readAsDataURL(file);
}
// console.log(btnPrevie)