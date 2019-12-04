films = [
    film1 = {
        name: 'Человек-паук',
        start: '10:00',
        ganar: [0, 1, 6],
        hire: true,
        new: false,
        price: 320,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film2 = {
        name: 'Собачья жизнь 2',
        start: '12:00',
        ganar: [2, 3, 4],
        hire: true,
        new: true,
        price: 370,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film3 = {
        name: 'История игрушек 4',
        start: '14:00',
        ganar: [2, 4, 5],
        hire: true,
        new: true,
        price: 520,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film4 = {
        name: 'Люди в чёрном: Интернешнл',
        start: '16:00',
        ganar: [0, 1, 4],
        hire: true,
        new: false,
        price: 210,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
]

const hall = 8
let places = []

for (i = 0; i < hall; i++) {
    places[i] = {}
    places[i]['number'] = i
    places[i]['price'] = 100
    let randomBrone = Math.floor(Math.random() * Math.floor(2))
    if (randomBrone == 0) places[i]['brone'] = true
    else places[i]['brone'] = false
}

const placesHTML = document.querySelector('.places')

for (place of places) {
    const placeDiv = document.createElement('button')
    placeDiv.innerHTML = place.number
    $(placeDiv).attr("id", "placeButton" + place.number) //даёт ID кнопкам
    placeDiv.classList.add('placeDiv')
    if (place.brone) placeDiv.classList.add('placeFree')
    else placeDiv.classList.add('placeBrone')
    placesHTML.append(placeDiv)
}

$('.placeBrone').on('click', function () {
    alert('Место забронированно')
})


//Функция для определения нажатой кнопки
function buttonDefinition(bool) {
    let elem = window.event.srcElement
    while (!(elem.id || (elem == document.body))) elem = elem.parentNode;
    if (elem.id) {
        if (elem.classList.contains('placeDiv')) {
            if (bool == true) {
                id = Number(elem.id.replace(/\D+/g, ""))
                return id //возвращает цифру в ID
            } else return id = elem.id //возвращает сам ID
        }
    }
}

document.body.oncontextmenu = function () {
    const id = buttonDefinition(true)
    for (place of places) if (place.number == id) alert('Стоимость белета: ' + place.price)
}

document.body.onclick = function () {
    const id = buttonDefinition(true)
    document.getElementById('PlaceChoice').value = id
}

$('.placeDiv').mouseover(function () {
    const id = buttonDefinition(false)
    document.getElementById(id).style.backgroundColor = "lightgrey"
})

$('.placeDiv').mouseout(function () {
    const id = buttonDefinition(false)
    const element = document.getElementById(id)
    if (element.classList.contains('placeFree')) document.getElementById(id).style.backgroundColor = "greenyellow"
    else document.getElementById(id).style.backgroundColor = "orange"
})

const ganars = [
    'Фантастика',
    'Боевик',
    'Фентези',
    'Драма',
    'Комедия',
    'Мультфильм',
    'Приключение',
]

let filmsHire = []
let filmsNew = []

for (i = 0; i < films.length; i++) {
    if (films[i].hire == true) {
        filmsHire.push(films[i])
    }

    if (films[i].hire == false && films[i].new == true) {
        filmsNew.push(films[i])
    }
}

const film = {
    getName: function () {
        return this.name
    },
    getStart: function () {
        return this.start
    },
    getGanar: function () {
        const ganarsFilm = this.ganar
        let arrGanars = []
        for (i = 0; i < ganarsFilm.length; i++) {
            arrGanars.push(ganars[ganarsFilm[i]])
        }
        let strGanars = arrGanars.join(', ')
        return strGanars
    },
    getPrice: function () {
        return this.price
    }
}

const orderForm = document.getElementById('orderForm')
const closeOrderForm = document.getElementById('closeOrderForm')
closeOrderForm.onclick = function () {
    orderForm.style.display = 'none'
}

for (let i = 0; i < filmsHire.length; i++) {
    const filmName = film.getName.bind(filmsHire[i])()
    const filmStart = film.getStart.bind(filmsHire[i])()
    const filmGanar = film.getGanar.bind(filmsHire[i])()
    const filmPrice = film.getPrice.bind(filmsHire[i])()
    const filmsHireHTML = document.getElementById('filmsHire')


    let filmHTML = `<tr>
    <td class="checkbox table-1">
        <input type="checkbox">
        <span >
        </span>
    </td>
    <td class="first_column text-center simple-text table-1" id="film_time_${1}"><span>${filmStart}</span></td>
    <td class="simple-text table-1" id="film_name_${1}">${filmName}</td>
    <td class="simple-text table-1" id="film_gener_${1}">${filmGanar}</td>
    <td class="simple-text table-1">${filmPrice}</td>
</tr>`
    const tr = document.createElement("tr")
    tr.className = "strFilmHire"
    tr.innerHTML = filmHTML

    tr.onclick = function () {
        orderForm.style.display = 'block'

        const orderFilmName = document.getElementById('orderFilmName')
        const orderFilmStart = document.getElementById('orderFilmStart')
        const orderFilmGanar = document.getElementById('orderFilmGanar')
        const orderFilmPrice = document.getElementById('orderFilmPrice')

        orderFilmName.innerHTML = filmName
        orderFilmStart.innerHTML = filmStart
        orderFilmGanar.innerHTML = filmGanar
        orderFilmPrice.innerHTML = filmPrice

        const orderFilmCountTicket = document.getElementById('orderFilmCountTicket')
        const orderFilmTotalPrice = document.getElementById('orderFilmTotalPrice')

        orderFilmTotalPrice.innerHTML = filmPrice * orderFilmCountTicket.value;

        orderFilmCountTicket.onchange = function () {
            orderFilmTotalPrice.innerHTML = filmPrice * orderFilmCountTicket.value;
        }
    }

    filmsHireHTML.appendChild(tr)
}

const sendOrder = document.getElementById('sendOrder')
sendOrder.onclick = function () {
    let orderClientName = document.getElementById('orderClientName')
    if (orderClientName.value) orderClientName.style.border = '1px solid #bebebe'
    else orderClientName.style.border = '2px solid red'
}