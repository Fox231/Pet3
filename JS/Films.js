const ganer_1 = 'фантастика'
const ganer_2 = 'боевик'
const ganer_3 = 'приключения'
const ganer_4 = 'фэнтези'
const ganer_5 = 'драма'
const ganer_6 = 'комедия'
const ganer_7 = 'мультфильм'

let film_start_1 = '10:00'
let film_start_2 = '12:00'
let film_start_3 = '14:00'
let film_start_4 = '16:00'

let film_name_1 = 'Человек-паук'
let film_name_2 = 'Собачья жизнь'
let film_name_3 = 'История игрушек'
let film_name_4 = 'Люди в черном: Интернэшнл'

let film_ganer_1 = ganer_1 + ', ' + ganer_2 + ', ' + ganer_3
let film_ganer_2 = ganer_4 + ', ' + ganer_5 + ', ' + ganer_6
let film_ganer_3 = ganer_7 + ', ' + ganer_4 + ', ' + ganer_6
let film_ganer_4 = ganer_1 + ', ' + ganer_2 + ', ' + ganer_6

let element_film_time_1 = document.getElementById('film_time_1')
let element_film_name_1 = document.getElementById('film_name_1')
let element_film_ganer_1 = document.getElementById('film_ganer_1')

let element_film_time_2 = document.getElementById('film_time_2')
let element_film_name_2 = document.getElementById('film_name_2')
let element_film_ganer_2 = document.getElementById('film_ganer_2')

let element_film_time_3 = document.getElementById('film_time_3')
let element_film_name_3 = document.getElementById('film_name_3')
let element_film_ganer_3 = document.getElementById('film_ganer_3')

let element_film_time_4 = document.getElementById('film_time_4')
let element_film_name_4 = document.getElementById('film_name_4')
let element_film_ganer_4 = document.getElementById('film_ganer_4')

element_film_time_1.innerHTML = film_start_1
element_film_name_1.innerHTML = film_name_1
element_film_ganer_1.innerHTML = film_ganer_1

element_film_time_2.innerHTML = film_start_2
element_film_name_2.innerHTML = film_name_2
element_film_ganer_2.innerHTML = film_ganer_2

element_film_time_3.innerHTML = film_start_3
element_film_name_3.innerHTML = film_name_3
element_film_ganer_3.innerHTML = film_ganer_3

element_film_time_4.innerHTML = film_start_4
element_film_name_4.innerHTML = film_name_4
element_film_ganer_4.innerHTML = film_ganer_4