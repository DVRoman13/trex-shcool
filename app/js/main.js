class Inputs {
    constructor(el, value, type, error, errorEmpty, errorSelf, isValid) {
        this.el = el;
        this.value = value;
        this.type = type;
        this.errorEl = error;
        this.errorEmpty = errorEmpty;
        this.errorSelf = errorSelf;
        this.isValid = isValid;
        this.errorTextSymbols = el.getAttribute('data-error-symbol')
        this.addListeners();
    }

    updateValue(val) {
        this.value = val
    }

    addListeners() {
        this.el.addEventListener('focusout', function (e) {
            this.classNameCheck(this.errorEl, 'position-relative')
            let val = e.target.value;
            this.updateValue(val);
            this.validet(this.type, val)
        }.bind(this));
    }

    classNameCheck(el, className) {
        if(el.classList.contains(className)) {
            el.classList.remove(className)
        }
    }

    isEmpty(val) {
        if (val.length == 0 || val.length == false) {
            this.errorEl.innerText = this.errorEmpty;
            this.errorEl.classList.add('show');
            this.el.classList.add('error-inputs');
        }
    }

    validet(type, val) {
        switch (type) {
            case 'text':
                const regExText = /^['a-zA-zа-яА-ЯёЁА-Яа-яёЁЇїІіЄєҐґ\s]+$/
                val = val.replace(/^\s*/, '').replace(/\s*$/, '');
                if(regExText.test(val)) {
                    if (val !== false && val.length >= 2) {
                        this.isValid = true
                        if (this.errorEl.classList.contains('show')) {
                            this.errorEl.classList.remove('show');
                            this.errorEl.innerText = this.errorEmpty;
                            this.el.classList.remove('error-inputs');
                        }
                    } else {
                        this.isValid = false
                        this.errorEl.innerText = this.errorSelf;
                        this.errorEl.classList.add('show');
                        this.el.classList.add('error-inputs');
                    }
                } else {
                    this.isValid = false
                    this.errorEl.innerText = this.errorTextSymbols;
                    this.errorEl.classList.add('show');
                    this.el.classList.add('error-inputs');
                }
                this.isEmpty(val)
                break;

            case 'email':
                const regExMail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
                val = val.replace(/^\s*/, '').replace(/\s*$/, '');
                val = val.toLowerCase();
                let validEmail = regExMail.test(val);
                if (validEmail) {
                    this.isValid = true
                    if (this.errorEl.classList.contains('show')) {
                        this.errorEl.classList.remove('show');
                        this.errorEl.innerText = this.errorEmpty;
                        this.el.classList.remove('error-inputs');
                    }
                } else {
                    this.isValid = false
                    this.errorEl.innerText = this.errorSelf;
                    this.errorEl.classList.add('show');
                    this.el.classList.add('error-inputs');
                }
                this.isEmpty(val)
                break;

            case 'phone':
                let newVal = val.replace(/[^+\d]/g, '');
                const regExеPhone = /^((\+?3)?8)?0\d{9}$/;
                let validPhone = regExеPhone.test(newVal)

                if (validPhone) {
                    this.isValid = true
                    if (this.errorEl.classList.contains('show')) {
                        this.errorEl.classList.remove('show');
                        this.errorEl.innerText = this.errorEmpty;
                        this.el.classList.remove('error-inputs');
                    }
                } else {
                    this.isValid = false
                    this.errorEl.innerText = this.errorSelf;
                    this.errorEl.classList.add('show');
                    this.el.classList.add('error-inputs');
                }
                this.isEmpty(val)
                break;

        }
    }
}


function setActiveTabs(elems, eventElem, className) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove(className);
    }
    eventElem.classList.add(className)
}

function setActiveItem(elems, eventElem, className) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.add(className);
    }
    if (eventElem) {
        eventElem.classList.remove(className)
    }
}

let lessonTabs = document.querySelectorAll('.program-lesson-item');
let lessonInfoItemsStart = [...document.querySelector('.program-lessons-descr-wrap_start').children];
let lessonInfoItemsMiddle = [...document.querySelector('.program-lessons-descr-wrap_middle').children];
let lessonInfoItemsPro = [...document.querySelector('.program-lessons-descr-wrap_pro').children];


function setCurrentLesson(tabs, lessonItems) {
    tabs.forEach((el, index) => {
        el.addEventListener('click', function () {
            setActiveTabs(tabs, this, 'active-lesson-item');
            setActiveItem(lessonItems, lessonItems[index], 'hide')
        })

    })
}

setCurrentLesson(lessonTabs, lessonInfoItemsStart);

let InfoWrappContainer = [...document.querySelectorAll('.program-lessons-descr-wrap')]


let tabs = [...document.querySelectorAll('.program-tabs-links-items')];

tabs.forEach((el, index) => {
    el.addEventListener('click', function () {
        setActiveTabs(tabs, this, 'active-tab')
        let currPosition = this.getAttribute('data-cours');
        switch (currPosition) {
            case 'start': {
                lessonTabs[4].classList.remove('hide');
                lessonTabs[5].classList.remove('hide');
                setActiveItem(InfoWrappContainer, InfoWrappContainer[index], 'hide');
                setActiveTabs(lessonTabs, lessonTabs[0], 'active-lesson-item')
                setActiveItem(lessonInfoItemsStart, lessonInfoItemsStart[0], 'hide')
                setCurrentLesson(lessonTabs, lessonInfoItemsStart);
                break
            }

            case 'middle': {
                lessonTabs[5].classList.add('hide');
                lessonTabs[4].classList.remove('hide');
                setActiveItem(InfoWrappContainer, InfoWrappContainer[index], 'hide');
                setActiveTabs(lessonTabs, lessonTabs[0], 'active-lesson-item');
                setActiveItem(lessonInfoItemsMiddle, lessonInfoItemsMiddle[0], 'hide')
                setCurrentLesson(lessonTabs, lessonInfoItemsMiddle);
                break
            }

            case 'pro': {
                lessonTabs[4].classList.add('hide');
                lessonTabs[5].classList.add('hide');
                setActiveItem(InfoWrappContainer, InfoWrappContainer[index], 'hide');
                setActiveTabs(lessonTabs, lessonTabs[0], 'active-lesson-item');
                setActiveItem(lessonInfoItemsPro, lessonInfoItemsPro[0], 'hide')
                setCurrentLesson(lessonTabs, lessonInfoItemsPro);
                break
            }
        }

    })
});


const initSlider = () => {
    let users = [
        'Александра Дущенко',
        'Александра Комиренко',
        'Ольга Хайран',
        'Katerina Kuian',
        'Игорь Кривенко',
        'Алена Медведева',
        'Александр Роженюк',
        'Вика Кухарук',
        'Мария Баз',
        'Елена Прендзевская',
        'Ирина Исаева'
    ];

    const userAvatarRoute = 'images/reviews/rev';
    const userRevRoute = 'images/reviews/rev-user';

    let slider = document.querySelector('.reviews-slider');


    for(let i = 0; i < users.length; i++ ) {
        slider.appendChild(getSlide(userRevRoute, userAvatarRoute, i, users))
    }


    function getSlide(avaRoute, revRoute, count, users) {
        let mainEl = createElem('div');
        let slideWrapp =  createElem('div', ['slide-wrapp', 'flex']);
        let revHolder =  createElem('div', ['rev-img']);
        let revImg = createElem('img', false, 'src',`${revRoute}${count}.png` );
        revHolder.appendChild(revImg);
        let userHolder =  createElem('div', ['user-img-blok', 'flex']);
        let userImg =  createElem('img', false, 'src',`${avaRoute}${count}.png` );
        let userName = createElem('p');
        userName.innerText = users[count];
        userHolder.appendChild(userImg);
        userHolder.appendChild(userName);
        slideWrapp.appendChild(revHolder);
        slideWrapp.appendChild(userHolder);
        mainEl.appendChild(slideWrapp);
        return mainEl
    }

    function createElem(elName, classNameArr = false, attr = false, attrVal= false) {
        let el = document.createElement(elName);
        if(classNameArr) {
            el.classList.add(...classNameArr)
        }

        if(attr) {
            el.setAttribute(attr, attrVal)
        }

        return el
    }

};

initSlider();

$(document).ready(function(){
    $('.reviews-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        adaptiveHeight: true
    });
});

const btns = [...document.querySelectorAll('.form-open')];

let openBtnNumber

btns.forEach((el, index) => [
    el.addEventListener('click', function () {
        openBtnNumber = index + 1
        $.magnificPopup.open({
            items: {
                src: '#form-action'
            },
            callbacks: {
                beforeClose: function () {
                   let inputs = [...document.querySelectorAll('.form-popup input')]
                    for(let i = 0; i < inputs.length; i++) {
                        inputs[i].value = ''
                    }
                    openBtnNumber = null
                }
            }
        });
    })
])

function createObj(inputs) {
    let arr = [];
    for (let i = 0; i < inputs.length; i++) {
        let input = new Inputs(inputs[i], inputs[i].value, inputs[i].getAttribute('data-type'), inputs[i].nextElementSibling, inputs[i].nextElementSibling.innerHTML, inputs[i].getAttribute('data-error'),false);
        arr.push(input)
    }
    return arr
}

let inputObg = createObj(document.querySelectorAll('.inputs-obj'));

$(function () {
    $("#input-phone").inputmask({
        "mask": "+38 (999) 999 99 99",
    });
});

const formBtn = document.querySelector('#form_button')


formBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let valid = inputObg.every((el)=>{
        return el.isValid === true
    });
    if(valid) {
        let  data = {
            project_name: "Курсы Копирайтинг new site",
            admin_email: "ekaterinadunaeva1@gmail.com",
            button: openBtnNumber ? openBtnNumber : 'Неизсвестно',
            name: inputObg[0].value,
            phone: inputObg[1].value,
            email: inputObg[2].value,
        }
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: data,
            success: function (data) {
                let inputs = [...document.querySelectorAll('.form-popup input')]
                for(let i = 0; i < inputs.length; i++) {
                    inputs[i].value = ''
                }
                $('.footer_text_bottom').show()
                setTimeout(function () {
                    $('.footer_text_bottom').hide();
                    $.magnificPopup.close()
                }, 5000)
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    } else {
        for(let i = 0; i < inputObg.length; i++) {
            inputObg[i].isEmpty(inputObg[i].el.value)
        }
    }
});

let body = document.querySelector('body')
if(window.innerWidth <=  body.scrollWidth) {
    console.log(12)
    let br = document.querySelectorAll('.shcool-start-left br');
    br.forEach((el)=> {
        el.classList.add('hide')
    })
}


if(window.innerWidth <=  414) {
    delBr(document.querySelectorAll('.header-block-title br'))
    delBr(document.querySelectorAll('.program-tabs-links-items br'))
}



function delBr(arr) {
    arr.forEach((el)=> {
        el.classList.add('hide')
    })
}
