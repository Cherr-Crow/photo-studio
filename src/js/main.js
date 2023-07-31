

let formBtn = document.querySelector('.header__search');
let form = document.querySelector('.header__form');
let formClose = document.querySelector('.header__formBtn');

formBtn.addEventListener('click', () => {
  form.classList.toggle('active')
});

formClose.addEventListener('click', () => {
  form.classList.remove('active')
});




// Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.76963601332982,37.636710499999985],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 16,

    });

    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.behaviors.disable(['scrollZoom']);
    myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)'



  var myPlacemark = new ymaps.Placemark([55.76963601332982,37.636710499999985], {}, {
    iconLayout: 'dafault#image',
    iconImageHref: 'images/map.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [-3, -32]
  });

  myMap.geoObjects.add(myPlacemark);
}



let btnCloseBlock = document.querySelector('.contacts__first-close');
let block = document.querySelector('.contacts__first-block')
btnCloseBlock.addEventListener('click', () => {
    block.classList.add('remove')
})

const btnOff = document.querySelector('.scroll-off');
const btnOn = document.querySelector('.scroll-on');
const body = document.body;

function disabledScroll() {
let pagePosition = window.scrollY;
body.classList.add('disabled-scroll');
body.dataset.position = pagePosition;
body.style.top = -pagePosition + 'px';
};

function enableScroll() {
  body.classList.remove('disabled-scroll')
};

let btnMenu = document.querySelector('.header__bottom-burger');
let menu = document.querySelector('.menu');
let menuClose = document.querySelector('.menu__btn');

btnMenu.addEventListener('click', () => {
  menu.classList.toggle('menu__active');
});

menuClose.addEventListener('click', () => {
  menu.classList.remove('menu__active')
});


btnOff.addEventListener('click', (e) => {
  disabledScroll();
  e.currentTarget.style.pointerEvents = 'none';
  btnOn.style.pointerEvents = 'auto';
});

btnOn.addEventListener('click', (e) => {
  enableScroll();
  e.currentTarget.style.pointerEvents = 'none';
  btnOff.style.pointerEvents = 'auto';
})

let menu__link = document.querySelectorAll('.menu__link');

menu__link.forEach( (item) => {
 item.addEventListener('click', () => {
  form.classList.remove('active');
  console.log('plgdf')
 })
})


let anchors = document.querySelectorAll('header a[href*="#"]');

for (anchor of anchors) {
  if (anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
    let anchorID = this.getAttribute('href');
    document.querySelector(anchorID).scrollIntoView({
      behavior: 'smooth', block: 'start'
    })
    })
  }
};
