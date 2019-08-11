SummerOptions = {
    lang: lx_i18n.config_sn_lang,
    height: 300,
    toolbar: [

        ['fontname', ['fontname']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['type', 'strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['insert', ['link', 'hr']],
        ['misc', ['fullscreen', 'undo', 'redo', 'codeview']],
        ['insert', ['picture', 'link', 'video', 'table', 'hr']]

    ],
    placeholder: lx_i18n.config_sn_placeholder
};

HoldOptions = {
    theme: "sk-circle",
    message: 'Espere... ',
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
}

DT_Lang = lxDatatableLanguaje(lx_i18n.config_datatables_lang);

var initializeSMImage = function () {
    $('.note-image-input').hide();
    $('.note-image-input').parent().append('<input type="file"  class="note-new-upload-lx">');
    $('.note-new-upload-lx').change(function () {
        if ($(this).val() == '') {
            return 0;
        }
        HoldOn.open(HoldOptions);
        var data = new FormData();
        data.append('Summernote', $(this)[0].files[0]);
        $.ajax({
            url: '/upload',
            data: data,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (data) {
                HoldOn.close();
                if (data.success) {
                    $('.note-image-url').val(data.file)
                    $('.note-image-btn').prop('disabled', false)
                    $(this).val('')
                }
            },
            error: function (err) {
                HoldOn.close();
                alertify.error(lx_i18n.txt_txt_an_error_occured);
                console.error(err);
            }
        });

    })
}

setTimeout(function () {

    $('input').attr('autofill', 'off')
    $('[type="search"]').attr('autofill', 'off').attr('autocomplete', 'off').val('')
    console.log('bye bye')


}, 2000);


$(document).ready(function () {

    var client = new ClientJS();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    function showPosition(position) {
        $('#TX_latitude_').val(position.coords.latitude)
        $('#TX_longitude_').val(position.coords.longitude)
    }

    getLocation();

    $.getJSON('http://www.geoplugin.net/json.gp', function (data) {
        var IPDATA_ = JSON.stringify(data);
        $('#TX_IPDATA_').val(IPDATA_)
    });


    setTimeout(function () {
        if (localStorage.getItem('Oteh_HasBeenCount')) {
            $.getJSON(rootPath + '/api/client_data/first', {

                sort: {
                    number: 'desc',
                }

            }, function (data) {

                if (data.success) {
                    var number = data.data.number ? data.data.number : 0;
                    ShowFormatedVisitors(number);
                }

            })

            localStorage.setItem('Oteh_HasBeenCount', true)
        } else {
            $.post(rootPath + '/api/client_data', {
                link_from: document.referrer,
                location: location.href,
                latitude: $('#TX_latitude_').val(),
                longitude: $('#TX_longitude_').val(),
                fingerprint: client.getFingerprint(),
                user_agent: client.getUserAgent(),
                browser: client.getBrowser(),
                engine: client.getEngine(),
                os: client.getOS(),
                device: client.getDevice(),
                cpu: client.getCPU(),
                isMobile: client.isMobile(),
                isAndroid: client.isMobileAndroid(),
                isIos: client.isMobileIOS(),
                ip: $('#TX_IPDATA_').val(),
                timezone: client.getTimeZone(),
                language: client.getLanguage(),


            }, function (data) {
                if (data.success) {
                    var number = data.data.number ? data.data.number : 0;
                    ShowFormatedVisitors(number);
                    localStorage.setItem('Oteh_HasBeenCount', true)
                }
            })


        }

    }, 2000);


    var ShowFormatedVisitors = function (number, length) {
        if (!length) {
            length = 5;
        }

        if (!number) {
            $('#visitors_count').text('#00000')
        } else {
            var my_string = '' + number.toString();
            while (my_string.length < length) {
                my_string = '0' + my_string;
            }

            $('#visitors_count').text('#' + my_string)
        }

    }

})