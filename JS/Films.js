const genres = ['фантастика', 'боевик', 'приключения', 'фэнтези', 'драма', 'комедия', 'мультфильм']
let film_start = ['10:00', '12:00', '14:00', '16:00']
let film_name = ['Человек-паук', 'Собачья жизнь', 'История игрушек', 'Люди в черном: Интернэшнл']

let films = 
[
    [film_start[0], film_name[0], genres[0] + ', ' + genres[1] + ', ' + genres[2]],
    [film_start[1], film_name[1], genres[3] + ', ' + genres[4] + ', ' + genres[5]],
    [film_start[2], film_name[2], genres[6] + ', ' + genres[3] + ', ' + genres[5]],
    [film_start[3], film_name[3], genres[0] + ', ' + genres[1] + ', ' + genres[5]]
]

for (let i = 0; i <= 3; i++) 
{
    let getElement = document.getElementById('film_time_'+i)
    getElement.innerHTML = films[i][0]
    getElement = document.getElementById('film_name_'+i)
    getElement.innerHTML = films[i][1]
    getElement = document.getElementById('film_gener_'+i)
    getElement.innerHTML = films[i][2]
}