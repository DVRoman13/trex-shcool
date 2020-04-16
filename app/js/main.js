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
        console.log(count)
        let mainEl = createElem('div');
        let slideWrapp =  createElem('div', ['slide-wrapp', 'flex']);
        let revHolder =  createElem('div', ['rev-img']);
        let revImg = createElem('img', false, 'src',`${revRoute}${count}.png` );
        console.log(revImg)
        revHolder.appendChild(revImg);
        let userHolder =  createElem('div', ['user-img-blok', 'flex']);
        let userImg =  createElem('img', false, 'src',`${avaRoute}${count}.png` );
        let userName = createElem('p');
        console.log(users[count])
        userName.innerText = users[count];
        userHolder.appendChild(userImg);
        userHolder.appendChild(userName);
        slideWrapp.appendChild(revHolder);
        slideWrapp.appendChild(userHolder);
        mainEl.appendChild(slideWrapp);
        console.log(mainEl)
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
