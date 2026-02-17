function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemsPage = document.querySelectorAll('.fullElem')
    var fullElemPagebackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemsPage[elem.id].style.display = 'block'
        })
    })
    fullElemPagebackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemsPage[back.id].style.display = 'none'
        })
    })
}
openFeatures()

function todoList() {
    var currentTask = []
    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('task list is empty');
    }




    function renderTask() {
        localStorage.setItem('currentTask', JSON.stringify(currentTask))
        let allTask = document.querySelector('.allTask')

        let sum = ''

        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="Task">
                    <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                    <button id=${idx}>Mark as Completed</button>
                </div>`
        })
        allTask.innerHTML = sum
        var markCompletedBtn = document.querySelectorAll('.Task button')
        markCompletedBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()


            })
        })
    }
    renderTask()


    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskcheckbox = document.querySelector('.addTask form #check')



    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskcheckbox.checked
        }
        )
        renderTask()
        taskcheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''

    })


}
todoList()

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')
    var dayplandata = JSON.parse(localStorage.getItem('dayplandata')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var saveddata = dayplandata[idx] || ''
        wholeDaySum = wholeDaySum + ` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value=${saveddata}>
                </div>`
    })

    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayplandata[elem.id] = elem.value
            localStorage.setItem('dayplandata', JSON.stringify(dayplandata))
        })
    })
}
dailyPlanner()


function motivationalQuote() {
    var motivationQuote = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response = await fetch('https://api.quotable.io/random')
        let data = await response.json()

        motivationQuote.innerHTML = data.content
        motivationAuthor.innerHTML = data.author
    }
    fetchQuote()
}
//motivationalQuote()


function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')

    let timeInterval = null
    let totalSeconds = 25 * 60

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60
        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    function startTimer() {
        clearInterval(timeInterval)
        timeInterval = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTimer()
            } else {
                clearInterval(timeInterval)
            }


        }, 1000)
    }


    function pauseTimer() {
        clearInterval(timeInterval)
    }

    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timeInterval)
        updateTimer()
    }


    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)

}
pomodoroTimer()

var apikey = 'f12d6114523440b597972759261602'
var city = 'ghaziabad'


var header1Time = document.querySelector('.header1 h1')
var header1Date = document.querySelector('.header1 h2')
var header2Temp = document.querySelector('.header2 h2')
var header2condition = document.querySelector('.header2 h4')
var precipitation = document.querySelector('.header2 .precipitation')
var wind = document.querySelector('.header2 .wind')

var data = null


async function weatherAPICall() {
    var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
    var data = await response.json()
    console.log(data.current.temp_c);
    header2Temp.innerHTML = `${data.current.temp_c}°C`
    header2condition.innerHTML = `${data.current.condition.text}`
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
    precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}%`


}

weatherAPICall()


function timeDate() {
    const totalDaysofWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthsnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var date = new Date()
    var dayofweek = totalDaysofWeek[date.getDay()]
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var tarik = date.getDate()
    var month = monthsnames[date.getMonth()]
    var year = date.getFullYear()
    header1Date.innerHTML = `${tarik} ${month} ${year}`

    if (hours > 12) {
        header1Time.innerHTML = `${dayofweek} ${hours - 12}:${minutes}:${seconds} PM`
    } else {
        header1Time.innerHTML = `${dayofweek} ${hours}:${minutes}:${seconds} AM`
    }

}
setInterval(() => {
    timeDate()
}, 1000)


/* ===== DAILY GOALS FEATURE ===== */

function dailyGoalsFeature() {

    let input = document.querySelector('#goal-input')
    let addBtn = document.querySelector('#add-goal')
    let display = document.querySelector('.goals-display')

    if (!input || !addBtn || !display) return

    let goals = JSON.parse(localStorage.getItem('dailyGoals')) || []

    function renderGoals() {
        localStorage.setItem('dailyGoals', JSON.stringify(goals))

        display.innerHTML = ''

        if (goals.length === 0) {
            display.innerHTML = `<p>No goals added yet.</p>`
            return
        }

        goals.forEach((goal, idx) => {
            display.innerHTML += `
                <div class="goal-card">
                    <p>${goal}</p>
                    <button data-id="${idx}">Done</button>
                </div>
            `
        })

        document.querySelectorAll('.goal-card button').forEach(btn => {
            btn.addEventListener('click', function () {
                goals.splice(this.dataset.id, 1)
                renderGoals()
            })
        })
    }

    addBtn.addEventListener('click', () => {
        if (input.value.trim() === '') return
        goals.push(input.value)
        input.value = ''
        renderGoals()
    })

    renderGoals()
}

dailyGoalsFeature()


/* THEME TOGGLE FEATURE */

function themeToggleFeature() {

    const toggleBtn = document.getElementById('theme-toggle')

    // Load saved theme
    let savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'light') {
        document.body.classList.add('light')
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light')

        let currentTheme = document.body.classList.contains('light') ? 'light' : 'dark'
        localStorage.setItem('theme', currentTheme)
    })
}

themeToggleFeature()

