const SYPEX_URL = 'https://api.sypexgeo.net/json/'
CITIES_URL = 'https://glavpunkt.ru/api/get_rf_cities'

let cities

function getRequest(api_url, callback) {
    let xhr = new XMLHttpRequest()
    async = true
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) callback.call(xhr.responseText)
    }
    xhr.open('GET', api_url, async)
    xhr.send()
    if (xhr.status != 200) return (xhr.status + ':' + xhr.responseText)
}

jQuery(($) => {
    $('#city_name').on('click', function () {
        event.preventDefault()
        document.getElementById('choose_city').style.display = 'block'
        if (!cities) {
            getRequest(CITIES_URL, function () {
                cities = $.parseJSON(this)
            })
        }
    })

    $('body').on('input keyup', 'input[name=city_choose]', function () {
        let search = $(this).val()
        counter = 0
        let html = '<ul>'
        for (i = 0; i < cities.length; i++) {
            if (cities[i].name.toLowerCase().indexOf(search.toLowerCase()) >= 0 && counter < 5) {
                html += '<li data-city="' + cities[i].name + '">' + cities[i].name + ' (' + cities[i].area + ')</li>'
                counter++
            }
        }
        html += '</ul>'
        $('#search_result').html(html)

        $('body').on('click', '#search_result li', function () {
            $('#city_name').html($(this).data('city'))
            document.getElementById('choose_city').style.display = 'none'
        })
    })
})

jQuery(document).ready(($) => {
    getRequest(SYPEX_URL, function () {
        let answer = $.parseJSON(this)
        let city = answer['city']['name_ru']
        $('#city_name').html(city)
    })
})

$('#closeCityCoosing').on('click', function () {
    document.getElementById('choose_city').style.display = 'none'
}) 