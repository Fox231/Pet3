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
    $('.input-required').on('focus', function () {
        $(this).next('.input-error').remove()
    })

    // let file_api = (window.File && window.FileReader && window.FileList && window.Bloob) ? true : false
    // inp = $('#file1'),
    //     lbl = $('#file-label')
    // inp.on('cange', function () {
    //     let filename
    //     if (file_api) {
    //         filename = inp[0].files[0].name
    //     } else { filename = inp.val().replace("C:\\fakepath\\", '') }
    //     if (!filename.length) return
    //     lbl.html(filename)
    // })

    $('.ajax-form').on('submit', function (e) {
        e.preventDefault()
        let form = $(this)
        // let data = form.serialize()
        filled = true
        form.find('.input-required').each(function () {
            if ($(this).val()) {
                $(this).after('<p class="input-error">Поле обязательно для заполнения</p>')
                filled = false
            }
        })
        if (filled) {
            let data = new FormData()
            data.append('file', $('#file1').prop('files')[0])
            data.append('name', $('#guest-name').val())
            data.append('phone', $('#guest-phone').val())
            $.ajax({
                url: 'serv.php',
                data: data,
                method: 'post',
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (msg) {
                    alert('Спасибо, ' + msg.name + '! Заявка успешно отправлена. Ваш номер заявки: ' + msg.id)
                },
                error: function (msg) {
                    alert('Отправка не удалась. Ошибка:<br>' + msg)
                }
            })
        }
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