window.addEventListener('DOMContentLoaded', function(){
    
    'use strict';

   let tab = document.querySelectorAll(".info-header-tab"),
       info = document.querySelector(".info-header"),
       tabContent = document.querySelectorAll(".info-tabcontent");

   function hideTabContent(a){
       for (let i = a; i < tabContent.length; i++){
           tabContent[i].classList.remove('show');
           tabContent[i].classList.add('hide');
       }
   }

   hideTabContent(1);

    function showTabContent(b) {
       if (tabContent[b].classList.contains('hide')) {
           tabContent[b].classList.remove('hide');
           tabContent[b].classList.add('show');
       }
   }

    info.addEventListener('click', function(event){
       let target = event.target;
       if (target && target.classList.contains('info-header-tab')) {
           for(let i = 0; i < tab.length; i++){
               if (target == tab[i]){
                   hideTabContent(0);
                   showTabContent(i);
                   break;
               }
           }
       }
   });   
   
   //timer
    let deadline = '2020-03-14';
    function getTimeRemaining(endtime){
       let t = Date.parse(endtime) - Date.parse(new Date()),
       seconds = Math.floor((t/1000) % 60),
       minutes = Math.floor((t/1000/60) % 60),
       hours = Math.floor((t/(1000*60*60)));
       //hours = Math.floor((t/ 1000 / 60 /60)%24)
        //об'єкт що має різні данні
       return {
           'total' : t,
           'hours' : hours,
           'minutes' : minutes,
           'seconds' : seconds
       };
   }   
   //створює змінні які бере з сторінки
    function setClock(id, endtime){
        let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);
    //отримує різницю в часі і виставляє часи в вьорстку
    function updateClock(){
        let t = getTimeRemaining(endtime);

        function addZero(num){
            if(num <= 9) {return '0' + num;
            } else {return num;}
        }
        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);
            
        //умова для закінчення нашого таймеру
        if (t.total <= 0){
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
        }
    }
   }
   setClock('timer', deadline);


// modal

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

more.addEventListener('click', function(){
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
});

close.addEventListener('click', function(){
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
});
// form

let message = {
    loading: " Загрузка... ",
    success: " Дякую! Скоро ми з вами зв'яжемось ",
    failure: " Щось пішло не так... "
};
let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');
//задаємо стиль
    statusMessage.classList.add('status');
//навішуємо обробник подій    
form.addEventListener('submit', function(event){
    event.preventDefault();
    form.appendChild(statusMessage);
// форма відправки
    let request = new XMLHttpRequest();
    request.open('POST','server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//отримуємо дані які ввів користувач і відправляємо на сервер
    let formData = new FormData(form);
    let obj = {};
    formData.forEach(function(value,key){
        obj[key] = value;
    });
    let json = JSON.stringify(obj);
    request.send(json);
//створюємо повідомлення щоб користувач бачив що заявка відправлена
    request.addEventListener('readystatechange', function(){
        if (request.readyState < 4){
            statusMessage.innerHTML = message.loading;
        } else if (request.readyState === 4 && request.status == 200){
            statusMessage.innerHTML = message.success;
        } else { statusMessage.innerHTML = message.failure;}
    });
//очистили поле інпут
    for (let i = 0; i < input.length; i++){
            input[i].value = '';
    }    
}); 
});   