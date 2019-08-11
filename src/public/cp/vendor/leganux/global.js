


const lxDatatableLanguaje = function (lang) {
    var OBJ = {}
    switch (lang) {
        case 'ES':
            OBJ = {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            }
            break;
        case 'DE':
            OBJ = {
                "sEmptyTable": "Keine Daten in der Tabelle vorhanden",
                "sInfo": "_START_ bis _END_ von _TOTAL_ Einträgen",
                "sInfoEmpty": "Keine Daten vorhanden",
                "sInfoFiltered": "(gefiltert von _MAX_ Einträgen)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ Einträge anzeigen",
                "sLoadingRecords": "Wird geladen ..",
                "sProcessing": "Bitte warten ..",
                "sSearch": "Suchen",
                "sZeroRecords": "Keine Einträge vorhanden",
                "oPaginate": {
                    "sFirst": "Erste",
                    "sPrevious": "Zurück",
                    "sNext": "Nächste",
                    "sLast": "Letzte"
                },
                "oAria": {
                    "sSortAscending": ": aktivieren, um Spalte aufsteigend zu sortieren",
                    "sSortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
                },
                "select": {
                    "rows": {
                        "_": "%d Zeilen ausgewählt",
                        "0": "",
                        "1": "1 Zeile ausgewählt"
                    }
                },
                "buttons": {
                    "print": "Drucken",
                    "colvis": "Spalten",
                    "copy": "Kopieren",
                    "copyTitle": "In Zwischenablage kopieren",
                    "copyKeys": "Taste <i>ctrl</i> oder <i>\u2318</i> + <i>C</i> um Tabelle<br>in Zwischenspeicher zu kopieren.<br><br>Um abzubrechen die Nachricht anklicken oder Escape drücken.",
                    "copySuccess": {
                        "_": "%d Spalten kopiert",
                        "1": "1 Spalte kopiert"
                    }
                }
            }

            break;
        case 'IT':
            OBJ = {
                "sEmptyTable": "Nessun dato presente nella tabella",
                "sInfo": "Vista da _START_ a _END_ di _TOTAL_ elementi",
                "sInfoEmpty": "Vista da 0 a 0 di 0 elementi",
                "sInfoFiltered": "(filtrati da _MAX_ elementi totali)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "Visualizza _MENU_ elementi",
                "sLoadingRecords": "Caricamento...",
                "sProcessing": "Elaborazione...",
                "sSearch": "Cerca:",
                "sZeroRecords": "La ricerca non ha portato alcun risultato.",
                "oPaginate": {
                    "sFirst": "Inizio",
                    "sPrevious": "Precedente",
                    "sNext": "Successivo",
                    "sLast": "Fine"
                },
                "oAria": {
                    "sSortAscending": ": attiva per ordinare la colonna in ordine crescente",
                    "sSortDescending": ": attiva per ordinare la colonna in ordine decrescente"
                }
            }
            break;
        case 'FR':
            OBJ = {
                "sProcessing": "Traitement en cours...",
                "sSearch": "Rechercher&nbsp;:",
                "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
                "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                "sInfoPostFix": "",
                "sLoadingRecords": "Chargement en cours...",
                "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
                "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
                "oPaginate": {
                    "sFirst": "Premier",
                    "sPrevious": "Pr&eacute;c&eacute;dent",
                    "sNext": "Suivant",
                    "sLast": "Dernier"
                },
                "oAria": {
                    "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                    "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
                },
                "select": {
                    "rows": {
                        _: "%d lignes séléctionnées",
                        0: "Aucune ligne séléctionnée",
                        1: "1 ligne séléctionnée"
                    }
                }
            }
            break;
        default:
            OBJ = {
                "sEmptyTable": "No data available in table",
                "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
                "sInfoEmpty": "Showing 0 to 0 of 0 entries",
                "sInfoFiltered": "(filtered from _MAX_ total entries)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sLengthMenu": "Show _MENU_ entries",
                "sLoadingRecords": "Loading...",
                "sProcessing": "Processing...",
                "sSearch": "Search:",
                "sZeroRecords": "No matching records found",
                "oPaginate": {
                    "sFirst": "First",
                    "sLast": "Last",
                    "sNext": "Next",
                    "sPrevious": "Previous"
                },
                "oAria": {
                    "sSortAscending": ": activate to sort column ascending",
                    "sSortDescending": ": activate to sort column descending"
                }
            }
            break;

    }
    return OBJ;
}


const lxDownloadFile = function (text, filename, ext) {
    if (!ext) {
        filename = filename + '.lnx';
    } else {
        filename = filename + ext;
    }
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

const lxCutDecimal = function (number, decimals) {
    if (!decimals) {
        decimals = 2;
    }

    if (number.toString().includes('.')) {

        var cad = number.toString();
        var Arr = cad.split('.');

        if (Arr[1].length > decimals) {
            cad = Arr[1].substr(0, decimals)

            return (Arr[0] + '.' + cad).toString();
        } else {

            cad = Arr[1].toString();
            var F = decimals - Arr[1].length;

            for (var i = 0; i < F; i++) {
                cad = cad + '0';
            }
            return (Arr[0] + '.' + cad).toString();
        }
    } else {
        if (Number(decimals) === 0) {

            var X = Math.trunc(Number(number));
            return X.toString();
        } else {

            var cad = number.toString();
            cad = cad + '.';
            for (var i = 0; i < decimals; i++) {
                cad = cad + '0';
            }
            return (cad).toString();
        }
    }
}

const lxGetUbicationMap = function (lat_deg, lat_min, lat_sec, long_deg, long_min, long_sec, lat_dir, longituddir) {

    if (!lat_dir) {
        lat_dir = 'N';
    }
    if (!longituddir) {
        longituddir = 'W';
    }

    var latitude_sign = -1;
    if (lat_dir === "N") {
        latitude_sign = 1;
    }

    var latitude = (lat_deg + (lat_min / 60.0) + (lat_sec / 60.0 / 60.0)) * latitude_sign;
    var longitude_sign = -1;
    if (longituddir === "E") {
        longitude_sign = 1;
    }
    var longitude = (long_deg + (long_min / 60.0) + (long_sec / 60.0 / 60.0)) * longitude_sign;
    window.open(href = "http://maps.google.com/?q=" + latitude + ',' + longitude);

}

const lxToday = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

const lxArrDiff = function (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

const lxDisableCopyPaste = function (element) {
    $(element).on("cut copy paste", function (e) {
        var message = "No se permite copiar y pegar contenido en este campo";
        alert(message);
        e.preventDefault();
    });
}

const lxLoadExternalScript = function (url) {
    if (!url) {
        return false;
    }
    $.getScript(url, function () {
        return true;
    }).fail(function () {
        return false;
    });
}


const lxValidateMail = function (elem) {
    var p = $(elem).val();
    var errors = [];
    if (!p.includes('.')) {
        errors.push('Menor');
    }
    if (!p.includes('@')) {
        errors.push('Menor');
    }
    if (errors.length > 0) {
        return false;
    }
    return true;
}

const lxScrollTo = function (elem) {
    $('html, body').animate({
        scrollTop: ($(elem).offset().top) - 200
    }, 1000);
}

const lxFindArrElemPos = function (arr, tofind) {
    var pos = -1;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === tofind) {
            pos = i;
        }
    }
    return pos;
}

const lxRoot13 = function (pal) {
    var arr = pal.split('')
    var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    var arrInput = input.split('');
    var arrOutput = output.split('');
    var Result = new Array();
    for (var i = 0; i < arr.length; i++) {
        var actual = busq_(arrInput, arr[i]);
        if (actual == -1) {
            Result.push(arr[i])
        } else {
            Result.push(arrOutput[actual])
        }
    }
    return Result.join('');
}

const lxGetLocalIP = function () {
    return new Promise(function (resolve, reject) {
        // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
        var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

        if (!RTCPeerConnection) {
            reject('Your browser does not support this API');
        }

        var rtc = new RTCPeerConnection({ iceServers: [] });
        var addrs = {};
        addrs["0.0.0.0"] = false;

        function grepSDP(sdp) {
            var hosts = [];
            var finalIP = '';
            sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
                if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                    var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') {
                        finalIP = addr;
                    }
                } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                    var parts = line.split(' '),
                        addr = parts[2];
                    finalIP = addr;
                }
            });
            return finalIP;
        }

        if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
            rtc.createDataChannel('', { reliable: false });
        }
        ;

        rtc.onicecandidate = function (evt) {
            // convert the candidate to SDP so we can run it through our general parser
            // see https://twitter.com/lancestout/status/525796175425720320 for details
            if (evt.candidate) {
                var addr = grepSDP("a=" + evt.candidate.candidate);
                resolve(addr);
            }
        };
        rtc.createOffer(function (offerDesc) {
            rtc.setLocalDescription(offerDesc);
        }, function (e) {
            console.warn("offer failed", e);
        });
    });
}

function getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

    var pc = new myPeerConnection({
        iceServers: []
    }),
        noop = function () {
        },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function (reason) {
        console.warn('reason', reason);
    });

    //listen for candidate events
    pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

function lxGetCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function lxSetCookie(cname, cvalue, exdays) {
    if (!exdays) {
        exdays = 15;
    }
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
let lxLang = 'EN';

if (lxGetCookie('lxLang')) {
    lxLang = lxGetCookie('lxLang');
}
else {
    lxLang = 'EN';
    lxSetCookie('lxLang', 'EN');
}

function formatState(opt) {
    if (!opt.id) {
        return opt.text.toUpperCase();
    }

    var optimage = $(opt.element).attr('data-image');

    if (!optimage) {
        return opt.text;
    } else {
        var $opt = $(
            '<span ><img src="' + optimage + '" width="60px" /> ' + opt.text + '</span>'
        );
        return $opt;
    }
};

var lxSelect2 = function (el, parent) {
    $(el).select2({
        width: '100%',
        templateResult: formatState,
        placeholder: "Select...",
        allowClear: true,
        dropdownParent: $(parent)
    });

}

var extractBodyContent = function (yourStringValue) {
    if (!yourStringValue || yourStringValue == '') {
        return ''
    }
    var strVal = yourStringValue;
    var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im
    var array_matches = pattern.exec(strVal);

    if (array_matches) {
        return array_matches[1] ? array_matches[1] : false
    }
    return '';


}