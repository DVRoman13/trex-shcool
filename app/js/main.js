
let lessonTabs = document.querySelectorAll('.program-lesson-item');
let coursInfo = document.querySelectorAll('.program-tabs-links-items');
let lessonsStart = document.querySelectorAll('.lessons-start');
let currentCours = 'start'
let count = 0
coursInfo.forEach((el, index)=> {
    el.addEventListener('click', function(e){
        setActiveTabs(coursInfo, "active-tab", index, count)
        count = index
        currentCours = this.getAttribute('data-cours');
        startFromZero(lessonTabs,"active-lesson-item" )
        startFromZero(lessonsStart,"hide", true )
    })
})

let countTabs = 0
lessonTabs.forEach((el, index)=> {
    el.addEventListener('click', function(e){
        setActiveTabs(lessonTabs, "active-lesson-item", index, countTabs)
        switch (currentCours) {
            case 'start' : {
                setActiveTabs(lessonsStart, 'hide', index , countTabs, true)
                break
            }
            case 'middle' : {
                console.log(currentCours);
                break
            }
            case 'pro' : {
                console.log(currentCours);
                break
            }
        }
        countTabs = index
    })
})


function setActiveTabs(tabs, className, index , count, isLessons = false) {
    if(isLessons) {
       tabs[count].classList.toggle(className);
       tabs[index].classList.toggle(className);
    } else {
        tabs[count].classList.remove(className);
        tabs[index].classList.add(className);
        count = index
    }
}

function startFromZero(tabs, className, isLessons=false) {
    if(isLessons) {
        for(let i = 0; i < tabs.length; i++) {
            tabs[i].classList.add(className)
        }
        tabs[0].classList.remove(className)
    } else {
        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].classList.contains(className)) {
                tabs[i].classList.remove(className)
            }
        }
        tabs[0].classList.add(className)
        countTabs= 0
    }
}

