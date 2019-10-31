films = [
    film1= {
        name: 'Человек-паук',
        start: '',
        ganar: [0, 1],
        hire: false,
        new: false,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film2= {
        name: 'Собачья жизнь 2',
        start: '',
        ganar: [2, 3, 4],
        hire: false,
        new: true,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film3= {
        name: 'История игрушек 4',
        start: '',
        ganar: [2, 4, 5],
        hire: false,
        new: true,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film4= {
        name: 'Люди в чёрном 2',
        start: '',
        ganar: [0, 1, 4],
        hire: false,
        new: true,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film5= {
        name: 'История игрушек 2',
        start: '',
        ganar: [0, 1],
        hire: true,
        new: false,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
    film1= {
        name: 'Люди в чёрном',
        start: '',
        ganar: [0, 1, 4],
        hire: true,
        new: false,
        discription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aperiamaspernatur, cum, cupiditateexcepturi expedita libero mollitia nesciunt nihil nobis obcaecati quasi ratione reprehenderit sequisint, tenetur unde velit veniam!'
    },
]

const ganars = [
    'Фантастика',
    'Боевик',
    'Фентези',
    'Драма',
    'Комедия',
    'Мультфильм',
]

let filmsHire = []
let filmsNew = []

for (let i = 0; i < films.length; i++) {
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
        for (let i = 0; i < ganarsFilm.length; i++) {
            arrGanars.push(ganars[ganarsFilm[i]])
        }
        let strGanars = arrGanars.join(', ')
        return strGanars
    }
}

for (let i = 0; i < filmsHire.length; i++) {
    const filmName = film.getName.bind(filmsHire[i])()
    const filmStart = film.getStart.bind(filmsHire[i])()
    const filmGanar = film.getGanar.bind(filmsHire[i])()
    let filmsHireHTML = document.getElementById('filmsHire')

    console.log('filmsHire', filmsHireHTML)

    let filmHTML = `<tr>
    <td class="checkbox">
        <input type="checkbox">
        <span>
        </span>
    </td>
    <td class="first_column text-center simple-text" id="film_time_${1}"><span>${filmStart}</span></td>
    <td class="simple-text"><a href="" id="film_name_${1}">${filmName}</a></td>
    <td class="simple-text" id="film_gener_${1}">${filmGanar}</td>
</tr>`
    let tr = document.createElement("tr")
    tr.innerHTML = filmHTML
    filmsHireHTML.appendChild(tr)
}